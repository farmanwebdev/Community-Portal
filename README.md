# 🌱 Community Development Portal

A full-stack web application for managing community development workflows — tracking projects, contributions, visitor payments, and providing an admin dashboard with role-based access.

---

## 📂 Project Structure

```
community-portal/
├── backend/
│   ├── app.js                        # Express entry-point
│   ├── package.json
│   ├── .env                          # Environment variables
│   └── src/
│       ├── models/
│       │   ├── User.js
│       │   ├── Project.js
│       │   ├── Contribution.js
│       │   └── Message.js
│       ├── middleware/
│       │   └── auth.js               # JWT verify + role guards
│       └── routes/
│           ├── auth.js               # Register / Login / Me
│           ├── users.js              # User CRUD
│           ├── projects.js           # Project CRUD
│           ├── contributions.js      # Contribution CRUD
│           └── messages.js           # Contact messages
│
└── frontend/
    ├── package.json
    ├── next.config.js
    └── src/
        ├── app/
        │   ├── layout.js             # Root layout + AuthProvider
        │   ├── globals.css           # Design tokens & global styles
        │   ├── page.js               # Home page
        │   ├── about/page.js         # About page
        │   ├── projects/page.js      # Public projects listing
        │   ├── contact/page.js       # Contact form page
        │   ├── login/page.js         # Login page
        │   └── dashboard/
        │       ├── layout.js         # Sidebar + auth guard
        │       ├── page.js           # Dashboard overview
        │       ├── projects/page.js  # Project management
        │       ├── contributions/page.js
        │       ├── messages/page.js
        │       └── users/page.js     # User management (super-admin)
        ├── components/
        │   ├── Navbar.js             # Responsive navigation
        │   ├── Footer.js
        │   └── Hero.js               # Animated carousel hero
        └── utils/
            ├── api.js                # Axios instance + JWT interceptor
            └── AuthContext.js        # React auth context + provider
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** running locally (or a cloud URI like MongoDB Atlas)
- **npm** or **yarn**

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Open `.env` and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/community_portal
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```

Start the server:

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

The API will be live at `http://localhost:5000/api`.

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file (optional — defaults to localhost):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app will be live at `http://localhost:3000`.

---

### 3. Seed a Super-Admin (first user)

Use **curl** or **Postman** to create the first super-admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin Name","email":"admin@example.com","password":"yourpassword","role":"super-admin"}'
```

> ⚠️ After seeding, consider adding middleware to disable open registration in production.

---

## 🔐 Authentication & Roles

| Role         | Permissions                                              |
|--------------|----------------------------------------------------------|
| **Super Admin** | Full CRUD on all resources; manage users & roles      |
| **Sub Admin**   | Create/edit projects & contributions; read messages   |
| **Member**      | View-only (public pages)                              |

- JWT tokens are stored in `localStorage` and attached automatically via an Axios interceptor.
- Protected dashboard routes redirect to `/login` when no valid token is present.

---

## 📡 API Reference

| Method | Endpoint                   | Auth?   | Description                        |
|--------|----------------------------|---------|------------------------------------|
| POST   | `/auth/register`           | No      | Register a new user                |
| POST   | `/auth/login`              | No      | Login → returns JWT                |
| GET    | `/auth/me`                 | Yes     | Get current user profile           |
| GET    | `/users`                   | Yes     | List all users                     |
| PUT    | `/users/:id`               | Super   | Update user role                   |
| DELETE | `/users/:id`               | Super   | Delete a user                      |
| GET    | `/projects`                | No      | List all projects                  |
| POST   | `/projects`                | Admin   | Create a project                   |
| PUT    | `/projects/:id`            | Admin   | Update a project                   |
| DELETE | `/projects/:id`            | Super   | Delete a project                   |
| GET    | `/contributions`           | No      | List all contributions             |
| POST   | `/contributions`           | Admin   | Add a contribution                 |
| PUT    | `/contributions/:id`       | Admin   | Edit a contribution                |
| DELETE | `/contributions/:id`       | Super   | Delete a contribution              |
| POST   | `/messages`                | No      | Submit a contact message           |
| GET    | `/messages`                | Admin   | List all messages                  |
| PUT    | `/messages/:id`            | Admin   | Mark message as read               |
| DELETE | `/messages/:id`            | Super   | Delete a message                   |

---

## 🚢 Deployment

| Layer    | Recommended Service          |
|----------|------------------------------|
| Frontend | **Vercel** (`next deploy`)   |
| Backend  | **Render** or **Railway**    |
| Database | **MongoDB Atlas** (free tier)|

1. Push `frontend/` to a Git repo → connect to Vercel.
2. Push `backend/` to a Git repo → connect to Render. Set env vars in the Render dashboard.
3. Update `NEXT_PUBLIC_API_URL` in Vercel env to point to your Render backend URL.
4. Update `CLIENT_ORIGIN` in the backend `.env` to match the Vercel URL.

---

## ✨ Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Frontend   | Next.js 14 · React 18 |
| Backend    | Node.js · Express.js  |
| Database   | MongoDB · Mongoose    |
| Auth       | JWT (jsonwebtoken)    |
| HTTP client| Axios                 |

---

## 📝 License

This project is provided as-is for educational and development purposes.
