# Deployment & DevOps Essentials - MERN

## Project Structure
- frontend/ - React (Vite)
- backend/ - Express API
- backend/src/middleware/errorHandler.js - central error handling
- backend/src/routes/health.js - health check endpoint

## Environment Variables

| Variable | Description | Location |
|----------|-------------|----------|
| VITE_API_URL | Backend API URL | Frontend .env.production |
| MONGO_URI | MongoDB Atlas connection string | Backend .env |
| NODE_ENV | Environment (development/production) | Backend .env |

## CI/CD
- GitHub Actions:
  - Lint + test + build
  - Staging & production branches
- Deployment:
  - Backend: Render
  - Frontend: Vercel
- Rollback: redeploy previous successful commit/tag

## Monitoring
- Health endpoint: `/health`
- Sentry integration for errors
- Uptime monitoring via UptimeRobot

## Deployment Steps

### Backend (Render)
1. Create new Web Service on Render.
2. Connect GitHub repo → `backend` directory.
3. Set Environment Variables (MONGO_URI, NODE_ENV, etc.)
4. Auto-deploy on push to main/staging.
5. Test `https://<your-backend>.onrender.com/health`

### Frontend (Vercel)
1. Import `frontend` folder on Vercel.
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variable: `VITE_API_URL`
5. Deploy and verify frontend calls backend correctly.

## Local Setup
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Copy code
