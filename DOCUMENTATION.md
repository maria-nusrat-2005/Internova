# Smart Internship Matching System - Project Documentation

**Author:** Maria Nusrat
**ID:** 241061004
**Group:** A
**Project Title:** Smart Internship Matching System

This document outlines the foundation and features that have been implemented for the Smart Internship Matching System using the MERN stack.

---

## 1. Project Architecture & Setup

The project is structured as a monorepo containing both the frontend and backend applications, allowing for streamlined development.

- **Root Setup:** A master `package.json` is configured using `concurrently`. This allows developers to install all dependencies and start both the React frontend and Node.js backend simultaneously with a single command (`npm run dev`).
- **Tech Stack:**
  - **Frontend:** React, Vite, Tailwind CSS v4, React Router, Lucide React (Icons).
  - **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcrypt.

---

## 2. Backend Implementation (Node.js & Express)

A robust backend architecture was established to handle user registration, authentication, and role management.

### Features Developed:
- **Server Initialization:** Configured Express with CORS, JSON body parsing, and environment variables (`.env`). Established a connection to a local MongoDB instance.
- **User Model (`models/User.js`):** Created a Mongoose schema to store user data (Name, Email, Password). Included pre-save hooks to automatically hash passwords using `bcrypt`.
- **Role-Based System:** Integrated an Enum `role` field into the User model supporting three distinct account types: `student`, `company`, and `admin`.
- **Authentication Controller (`controllers/authController.js`):**
  - `register`: Validates input, hashes passwords, saves new users, and issues a JWT.
  - `login`: Verifies credentials against the database and issues a secure JWT.
  - `getMe`: Returns the currently logged-in user's profile.
- **Security Middleware (`middleware/authMiddleware.js`):** 
  - `protect`: Extracts and verifies JWTs from incoming requests to secure API endpoints.
  - `authorize`: Restricts endpoint access based on the user's role (e.g., ensuring only companies can post internships).

---

## 3. Frontend Implementation (React & Tailwind CSS)

The frontend was completely overhauled from the default React boilerplate to feature a premium, dark-themed user interface focused on high usability and aesthetics.

### Authentication UI
- **Design System:** Implemented a sleek dark theme (`#0B0F19` background, `#131B2B` containers, `#8B7CFF` primary accent) using Tailwind CSS v4.
- **AuthLayout (`components/AuthLayout.jsx`):** A split-screen layout featuring dynamic typography and value propositions on the left, and a centralized form container on the right.
- **Login (`pages/Login.jsx`):** A polished sign-in form with email/password validation, simulated loading states, and social login placeholders.
- **Registration (`pages/Register.jsx`):** A comprehensive sign-up form allowing users to input their details and select their specific **Account Type** (Student or Company) using custom toggle buttons.

### Dashboard System
- **Role-Based Routing (`pages/Dashboard.jsx`):** Automatically reads the user's role from local state upon login and routes them to their specific, tailored dashboard view.
- **Dashboard Layout (`components/DashboardLayout.jsx`):** A persistent, responsive layout wrapping all internal pages. Features a left-side navigation sidebar and a top-bar displaying the active user profile.
- **Student Dashboard (`pages/StudentDashboard.jsx`):** 
  - Displays high-level metrics like "Average Match Score" and "Saved Opportunities".
  - Features a **Top Recommended Matches** widget displaying internships relevant to the student.
  - Includes a **Skill Insights** component that identifies missing skills (e.g., TypeScript) and suggests learning paths to increase employability.
- **Company Dashboard (`pages/CompanyDashboard.jsx`):**
  - Displays metrics for "Active Postings" and "Total Applicants".
  - Features an **Active Postings** widget to track applicant volume per role.
  - Includes a **Top Candidate Matches** pipeline, listing recommended students, their core skills, and their algorithmic match percentage.

---

## 4. How to Run the Project

1. Open a terminal in the root directory (`c:\SMUCT_Project\Internova`).
2. Run `npm run install-all` to install all dependencies across the root, frontend, and backend.
3. Run `npm run dev` to start the entire application.
4. Navigate to `http://localhost:5173` in your browser to view the application.
