const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Provider fixed to GEMINI
const PROVIDER = "GEMINI";
const GEMINI_KEY = functions.config().ai?.gemini_key || "AIzaSyCXSqNWrquwHFCQaiihA6L2ZMbZ0aAis5w";

app.post("/generatePitch", async (req, res) => {
	try {
		const { idea, industry, tone } = req.body;
		if (!idea) return res.status(400).json({ error: "No idea provided" });

		// Prompt for Gemini
		const prompt = `You are PitchCraft, an assistant that creates startup pitches.

Input Idea: ${idea}
Industry: ${industry || "general"}
Tone: ${tone || "professional"}

Return a valid JSON object ONLY with these keys:
{
  "name": "...",
  "tagline": "...",
  "elevator_pitch": "...",
  "problem_statement": "...",
  "solution_statement": "...",
  "target_audience": "...",
  "landing_page_copy": "..."
}`;

		let aiResponseText = "";

		if (PROVIDER === "GEMINI") {
			const resp = await axios.post(
				"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
				{
					contents: [{ parts: [{ text: prompt }] }],
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-goog-api-key": GEMINI_KEY,
					},
					timeout: 30000,
				}
			);

			aiResponseText =
				resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
		} else {
			return res.status(500).json({ error: "Provider not supported" });
		}

		// Try parsing JSON safely
		let parsed;
		try {
			const firstBrace = aiResponseText.indexOf("{");
			const jsonText =
				firstBrace >= 0 ? aiResponseText.slice(firstBrace) : aiResponseText;
			parsed = JSON.parse(jsonText);
		} catch (err) {
			parsed = { raw: aiResponseText };
		}

		return res.json({ success: true, data: parsed });
	} catch (err) {
		console.error("Gemini error:", err?.response?.data || err.message);
		res.status(500).json({
			error: "Gemini generation failed",
			details: err?.response?.data || err.message,
		});
	}
});

exports.api = functions.https.onRequest(app);
