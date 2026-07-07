# Smart Bharat: AI Powered Civic Companion

**Smart Bharat** is a next-generation civic platform that empowers Indian citizens by seamlessly integrating artificial intelligence into their interactions with the government. 

Designed for students, farmers, women, and senior citizens alike, this platform makes discovering schemes, finding services, and reporting public issues effortless and intuitive.

## 🌟 Key Features

- **AI Civic Assistant**: Chat with an intelligent Gemini-powered bot that understands multiple languages and context.
- **Smart Scheme Finder**: An AI-driven engine that recommends personalized government schemes based on user demographics.
- **Public Issue Reporting**: Upload photos of civic issues (like potholes or garbage) and let AI automatically categorize and summarize the complaint.
- **Document Assistant**: Instantly extract details from uploaded government documents and get advice on necessary next steps.
- **Citizen & Admin Dashboards**: Track application statuses, manage complaints, and view detailed civic analytics.
- **Premium Glassmorphic UI**: Breathtaking, modern interface built with Tailwind CSS, Shadcn, and Framer Motion.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes (Server Actions).
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`).
- **Database & Auth**: Firebase Auth, Firestore, Firebase Storage.
- **State Management**: Zustand.

## 🚀 Setup Instructions

1. **Clone the repository** (if applicable) and navigate to the project root.
2. **Install dependencies**:
   Because of potential peer-dependency issues with modern React packages, please install using legacy-peer-deps:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Environment Variables**:
   Copy the example environment file and fill in your actual credentials.
   ```bash
   cp .env.example .env.local
   ```
   *Note: You will need a Google Gemini API Key and Firebase Project Config.*

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository.
4. Expand the **Environment Variables** section and paste the contents of your `.env.local` file.
5. Click **Deploy**. Vercel will automatically detect the Next.js framework and build the project.

## 📁 Project Architecture

- `src/app`: Contains Next.js App Router pages (Home, Dashboard, Admin, Complaints, Assistant, Services).
- `src/components`: UI primitives and layout components (Navbar, Glassmorphic Cards).
- `src/lib`: Integrations (Firebase initialization, Gemini API wrappers).
- `src/styles` / `globals.css`: Premium Tailwind setup with custom CSS variables.

---
*Built for the future of digital governance.*
