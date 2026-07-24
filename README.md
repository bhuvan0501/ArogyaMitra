# ArogyaMitra

Full-stack AI fitness platform scaffold.

This repository contains project structure, routing, reusable components, dependency manifests, and configuration for a React + FastAPI application. Business logic is intentionally left as placeholders.

## Structure

- `frontend/` - React.js Vite application
- `backend/` - FastAPI application
- `.env.example` - Shared environment variable reference

## Quick Start

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
