Alright — now you need the FINAL, CLEAN, COMPLETE BACKEND API ENDPOINT LIST
👉 This is what your whole team will follow. No confusion. No conflicts.
Think of this as your API contract.

🚀 BASE
http://localhost:5000/api


🔐 AUTH MODULE
/api/auth
Method
Endpoint
Description
Auth
POST
/register
Register new user
❌
POST
/login
Login user
❌
GET
/me
Get current user
✅
POST
/logout
Logout (optional)
✅


🔹 REQUEST / RESPONSE
POST /api/auth/register
{
  "name": "Maria Nusrat",
  "email": "maria@gmail.com",
  "password": "123456",
  "role": "student"
}


POST /api/auth/login
{
  "email": "maria@gmail.com",
  "password": "123456"
}


GET /api/auth/me
Header:
Authorization: Bearer TOKEN


👤 PROFILE MODULE
/api/profile
Method
Endpoint
Description
Auth
GET
/
Get my profile
✅
PUT
/
Create/Update profile
✅
GET
/:userId
Get profile by ID
❌


🔹 BODY (PUT /api/profile)
{
  "bio": "Frontend dev",
  "skills": ["React", "Tailwind"],
  "interests": ["AI", "Web"],
  "education": {
    "university": "SMUCT",
    "degree": "BSc CSIT",
    "year": 2026
  }
}


💼 INTERNSHIP MODULE
/api/internships
Method
Endpoint
Description
Auth
POST
/
Create internship (company)
✅
GET
/
Get all internships
❌
GET
/:id
Get single internship
❌
DELETE
/:id
Delete internship
✅
GET
/my
Get my internships
✅


🔹 QUERY SUPPORT (IMPORTANT)
/api/internships?location=Dhaka&type=remote


🔹 BODY (POST)
{
  "title": "Frontend Intern",
  "description": "Work with React",
  "location": "Dhaka",
  "type": "onsite",
  "requiredSkills": ["React", "JS"],
  "stipend": 5000
}


📄 APPLICATION MODULE (HIGH IMPACT)
/api/applications
Method
Endpoint
Description
Auth
POST
/
Apply to internship
✅ (student)
GET
/my
My applications
✅
GET
/internship/:id
Applicants of internship
✅ (company)
PUT
/:id
Update status
✅


🔹 BODY (POST APPLY)
{
  "internshipId": "123"
}


🔹 BODY (UPDATE STATUS)
{
  "status": "interview"
}


🔐 AUTH HEADER FORMAT
ALL protected routes:
Authorization: Bearer YOUR_TOKEN


🧠 ROLE-BASED RULES (VERY IMPORTANT)
Action
Role
Create Internship
company
Apply Internship
student
View own profile
both
Update application status
company


⚙️ ERROR RESPONSE FORMAT
Use consistent errors:
{
  "success": false,
  "message": "Not authorized"
}


📦 FINAL ROUTE STRUCTURE (FILES)
routes/
├── auth.routes.js
├── profile.routes.js
├── internship.routes.js
└── application.routes.js


🔗 COMPLETE ROUTE MOUNTING
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);



