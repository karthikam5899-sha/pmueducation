# PMU Education — Multi-Page Education Website

A responsive education website built with React, Vite, Tailwind CSS and React Router DOM.

## 1. Requirements
- Node.js 18+ (recommended)
- npm

## 2. Install and run
Open a terminal inside this project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## 3. Production build
```bash
npm run build
npm run preview
```

The production files are generated in the `dist/` folder.

## 4. Project structure
```text
pmu-education-website/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── AuthLayout.jsx
    │   ├── CourseCard.jsx
    │   ├── Footer.jsx
    │   ├── Navbar.jsx
    │   ├── PasswordField.jsx
    │   └── SectionTitle.jsx
    ├── data/
    │   └── courses.js
    └── pages/
        ├── About.jsx
        ├── Contact.jsx
        ├── CourseDetails.jsx
        ├── Courses.jsx
        ├── Home.jsx
        ├── Login.jsx
        └── Signup.jsx
```

## 5. Pages and routes
- `/` — Home
- `/about` — About Us
- `/courses` — Searchable and filterable course catalogue
- `/courses/:id` — Course details and syllabus
- `/contact` — Contact form and embedded map
- `/login` — Login UI
- `/signup` — Registration UI

## 6. Customize
- Edit course content, pricing, ratings and images in `src/data/courses.js`.
- Update brand colors and fonts in `tailwind.config.js` and `src/index.css`.
- Replace the demo contact details and map location in `src/pages/Contact.jsx`.
- Replace remote Unsplash and avatar images with your own assets if desired.

## 7. Important demo notes
This is a frontend project. Login and registration validate the form and show demo feedback, but do not create real accounts or authenticate users. The contact form also demonstrates client-side validation and success feedback without sending messages. Connect a backend/API (for example Django REST Framework, FastAPI, Firebase or Supabase) for production authentication, enrollments and message delivery.

Images and Google Fonts are loaded from external services, so an internet connection is needed for those assets.
