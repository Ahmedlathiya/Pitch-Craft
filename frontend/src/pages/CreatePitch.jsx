import React, { useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom"; // Use useHistory for v5

export default function CreatePitch() {
  const [idea, setIdea] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("Formal");
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // Use useHistory in v5

  const handleGenerate = async () => {
    if (!idea.trim()) return alert("Please write your idea.");
    setLoading(true);
    try {
      // Replace YOUR_REGION/YOUR_PROJECT if needed
      const cloudFnUrl =
        "https://console.firebase.google.com/project/pitchcraft-d99a0/usage/details";
      const resp = await axios.post(cloudFnUrl, { idea, industry, tone });
      const data = resp.data?.data || { raw: resp.data?.raw || "No data" };

      // Save to Firestore
      const user = auth.currentUser;
      await addDoc(collection(db, "pitches"), {
        uid: user.uid,
        idea,
        industry,
        tone,
        generated: data,
        createdAt: serverTimestamp(),
      });

      // Navigate to generated page with state
      history.push("/generated", { state: { generated: data } }); // Use history.push() in v5
    } catch (err) {
      console.error(err);
      alert(
        "Generation failed. Check Functions deployment and logs. " +
          (err?.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Create Pitch</h3>
      <p className="small-muted">
        Describe your startup idea (one paragraph is enough).
      </p>
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your idea..."
        rows={6}
      />
      <input
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        placeholder="Industry (optional)"
      />
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Formal</option>
        <option>Casual</option>
        <option>Funny</option>
        <option>Roman Urdu</option>
      </select>
      <div className="button-row">
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Pitch"}
        </button>
        <button
          onClick={() => {
            setIdea("");
            setIndustry("");
            setTone("Formal");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
