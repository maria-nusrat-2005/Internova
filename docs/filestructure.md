internova/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Profile.js
│   │   │   ├── Internship.js
│   │   │   └── Application.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── profile.controller.js
│   │   │   ├── internship.controller.js
│   │   │   └── application.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── profile.routes.js
│   │   │   ├── internship.routes.js
│   │   │   └── application.routes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── validators.js
│   │   │
│   │   ├── constants/
│   │   │   └── roles.js
│   │   │
│   │   ├── services/            # (optional but pro-level)
│   │   │   ├── auth.service.js
│   │   │   ├── profile.service.js
│   │   │   └── internship.service.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.js
│   │   │   └── hooks.js
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── authAPI.js
│   │   │   │   └── authService.js
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── profileSlice.js
│   │   │   │   └── profileAPI.js
│   │   │   │
│   │   │   ├── internships/
│   │   │   │   ├── internshipSlice.js
│   │   │   │   └── internshipAPI.js
│   │   │   │
│   │   │   └── applications/
│   │   │       ├── applicationSlice.js
│   │   │       └── applicationAPI.js
│   │   │
│   │   ├── components/
│   │   │   ├── ui/              # Tailwind / component lib
│   │   │   ├── common/
│   │   │   └── layout/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   └── CompanyDashboard.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   └── internships/
│   │   │       ├── InternshipList.jsx
│   │   │       └── InternshipDetails.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js           # axios config
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/
│   ├── dbschema.md
│   ├── apidesign.md
│   └── architecture.md
│
├── .gitignore
├── README.md
└── package.json (optional root workspace)


