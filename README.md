# JobTracker

A MERN stack job application platform connecting job seekers with companies.

## Features

- **Job Seekers:** Browse and filter jobs, apply with a cover note, track application status, get skill-based recommendations
- **Companies:** Post, edit, and delete jobs, review applicants, update hiring status
- **Shared:** Profile management, JWT authentication, role-based access

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Axios
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt

## Prerequisites

- Node.js (v18+)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd job-application-tracker
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your values:

```
MONGO_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=your_secure_random_string
PORT=5000
```

Start the server:

```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Client runs at `http://localhost:5173`

## Usage

1. Open `http://localhost:5173`
2. Register as a **Job Seeker** or **Company**
3. Log in and use the role-specific dashboard

### Job Seeker

- Browse jobs with search, category, location, and job type filters
- Apply to jobs with an optional cover note
- Track applications on **My Applications**
- Add skills in **Profile** to get **Recommended** jobs

### Company

- Post jobs from **Post Job**
- Manage posted jobs from **My Jobs**
- View applicants and update status (Applied → Interview → Offer / Rejected)

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/jobs` | List jobs (public) |
| POST | `/api/jobs` | Post job (company) |
| GET | `/api/jobs/my` | Company's jobs |
| PUT | `/api/jobs/:id` | Edit job (company) |
| DELETE | `/api/jobs/:id` | Delete job (company) |
| GET | `/api/jobs/recommended` | Recommended jobs (jobseeker) |
| POST | `/api/applications` | Apply to job |
| GET | `/api/applications/my` | My applications |
| GET | `/api/applications/job/:jobId` | Applicants for a job |
| PUT | `/api/applications/:id/status` | Update application status |
| GET | `/api/users/me` | Get profile |
| PUT | `/api/users/me` | Update profile |
| DELETE | `/api/users/me` | Delete account |

## Project Structure

```
job-application-tracker/
├── client/          # React frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       └── services/api.js
└── server/          # Express backend
    ├── models/
    ├── controllers/
    ├── routes/
    └── middleware/
```
