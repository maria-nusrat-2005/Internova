# Smart Internship Matching System

A MERN stack web application designed to connect students with companies for internship opportunities, featuring role-based dashboards and intelligent matching.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS v4, React Router
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication


## How Authentication Pages are Built in this Project

Creating an authentication page (like Login or Register) involves building parts on both the Backend (server) and the Frontend (UI). Here is how it is structured in this application:

### 1. Backend (Node.js & Express)
* **User Model (`backend/models/User.js`):** Defines the database structure for a user, including fields like `name`, `email`, `password`, and `role`. It includes a pre-save hook to hash the password securely using `bcrypt` before storing it in MongoDB.
* **Controllers (`backend/controllers/authController.js`):** Contains the business logic. 
  * The `register` function creates a new user and generates a JSON Web Token (JWT).
  * The `login` function verifies the email and password, and returns a JWT if successful.
* **Routes (`backend/routes/authRoutes.js`):** Exposes the endpoints like `POST /api/auth/register` and `POST /api/auth/login` so the frontend can communicate with the backend.
* **Middleware (`backend/middleware/authMiddleware.js`):** Intercepts requests to protected routes to verify the JWT token and ensure the user has the correct role (e.g., Student or Company).

### 2. Frontend (React & Tailwind)
* **Auth Layout (`frontend/src/components/AuthLayout.jsx`):** A wrapper component that provides a consistent, split-screen UI design for all authentication-related pages.
* **Page Components (`frontend/src/pages/Login.jsx` & `Register.jsx`):** 
  * These components contain the HTML forms for users to input their credentials.
  * They use React `useState` to manage the form data as the user types.
  * On submission, they send an HTTP request (using `fetch` or `axios`) to the backend API endpoints.
  * Upon a successful response, the frontend stores the received JWT (usually in `localStorage`) and uses React Router to redirect the user to their appropriate dashboard based on their selected role.




### 1. Internship Posting (Create & Read)
- **Backend**: Added an `Internship` model (`backend/models/Internship.js`) to store internship details (title, company, description, location, type, status). Created corresponding API routes and controller logic (`POST /api/internships` and `GET /api/internships`).
- **Frontend**: Updated the `CompanyDashboard.jsx` to dynamically fetch and display active internships from the database. Implemented a "Create New Posting" modal form allowing companies to post new opportunities.
- *(Note: Update and Delete functionality for internships has been deferred to other team members.)*

### 2. Profile Settings Streamlining
- **UI Adjustments**: Removed the "Danger Zone" account deletion functionality from `ProfileSettings.jsx`.
- **Project Portfolio**: Removed the ability to edit or delete projects within the portfolio section to align with the "post and view only" scope assignment.
