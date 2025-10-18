# PitchCraft (React + Firebase + OpenAI)

## What

Simple PitchCraft app (React Vite) + Firebase Auth & Firestore + Firebase Functions calling OpenAI to generate startup pitches.

## Setup

1. Clone repo and open terminal.

### Frontend

2. cd frontend
3. copy .env.example to .env and fill in Firebase config values (apiKey, authDomain, projectId, ...)
4. npm install
5. npm run dev
6. App will run at http://localhost:5173

### Firebase Functions (server-side AI call)

7. Install Firebase CLI and login:
   - `npm install -g firebase-tools`
   - `firebase login`
8. cd functions
9. npm install
10. Set OpenAI key in functions config:
    - `firebase functions:config:set ai.openai_key="sk_XXXXX" ai.provider="OPENAI"`
11. Deploy functions:
    - `firebase deploy --only functions`
12. After deploy, note the functions URL printed in CLI.
13. Update `src/pages/CreatePitch.jsx` cloudFnUrl to the deployed function:
    - Example: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/api/generatePitch`

## Notes

- For security, API key is stored in Firebase functions config — not in frontend.
- If you want Gemini instead of OpenAI, you must configure Google Cloud Vertex AI and modify functions/index.js accordingly (service account credentials etc).
- Generated pitches are stored in Firestore collection `pitches`.

## Troubleshooting

- If function returns 401/403: check functions config key and redeploy.
- Examine logs: `firebase functions:log` or check Firebase Console -> Functions -> Logs.
