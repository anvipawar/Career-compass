# CareerCompass AI - Career Guidance Platform

A modern, AI-powered platform designed to provide personalized career recommendations based on skill analysis and market trends.

## Features
- **Smart Assessment**: Multi-step form for technical skills, soft skills, and interests.
- **AI Recommendations**: Simulated AI engine suggesting top 3 career paths with match scores.
- **Personalized Roadmaps**: Comprehensive 6-month learning paths for each career.
- **Modern Dashboard**: Visual skill gap analysis using Recharts and Framer Motion.
- **Dark Theme UI**: Premium, glassmorphism-inspired design.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React, Recharts.
- **Backend**: Node.js, Express, JWT, Mongoose (Optional).

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- NPM or Yarn.

### Installation

1. **Clone the repository** (or copy the files provided).

2. **Setup Backend**:
   ```bash
   cd server
   npm install
   # Create a .env file based on the provided .env template
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Folder Structure
- `client/`: React frontend source code.
- `server/`: Express backend API and AI simulation logic.

## AI Prompt Engineering Logic
The platform uses a structured prompt approach:
- **Input**: User skills array, Interest tags, and Skill levels.
- **Context**: Real-time job market trends (simulated).
- **Generation**: AI returns JSON-formatted career paths with detailed logic for match percentage and skill gap analysis.

---
Developed with ❤️ by Antigravity.
