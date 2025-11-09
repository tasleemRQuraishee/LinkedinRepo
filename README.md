# LinkedinRepo (backend)

This repository contains the Express backend for a LinkedIn-clone project.

Quick steps to get the backend working on Vercel

1. Environment variables (required)
   - `MONGO_URI` — MongoDB connection string (Atlas or other). Example:
     `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority`
   - `JWT_SECRET` — A long random secret for signing JWT tokens.

2. In Vercel dashboard for this project:
   - Set the Production branch to `vercel-serverless-fix` (or deploy this branch manually).
   - Add the environment variables above under Settings → Environment Variables.
   - Redeploy the project.

3. Test endpoints after deploy
   - Backend base: `https://<your-vercel-domain>.vercel.app`
   - Example: `GET /api/posts` → `https://<your-vercel-domain>.vercel.app/api/posts`

Notes
  - The repo includes a catch-all serverless handler at `api/[...slug].js` which forwards requests to the Express app.
  - `node_modules/` is ignored; Vercel will install dependencies during build from `package.json` and `package-lock.json`.
  - If you use MongoDB Atlas, ensure your cluster's Network Access allows connections from Vercel (for quick testing, allow 0.0.0.0/0).

If you prefer I can also:
- Remove `node_modules` from the remote history (advanced),
- Add any missing environment variables, or
- Fetch and diagnose Vercel deployment logs if you share them.
