# 🎓 InternVerse — Intern Management Platform

A full-stack **Intern Management System** built with **Spring Boot** and **React**, designed to manage intern tasks, submissions, evaluations, and certificate issuance.

---

## 🚀 Live Demo
- **Frontend:** https://internverse-frontend-ten.vercel.app
- **Backend API:** https://internverse-backend-prag.onrender.com
```

---

## 📋 Features

### 👨‍💼 Admin
- Login with a single admin account
- Create and manage tasks for interns
- View all intern submissions
- Evaluate submissions with rating (1–5) and feedback
- Issue completion certificates to interns by email
- View all issued certificates

### 👨‍💻 Intern
- Register and login
- View assigned tasks
- Submit tasks with GitHub link and comments
- Track submission status (Pending / Approved)
- View evaluation feedback and rating after admin review
- Download personalized PDF completion certificates

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Java 17 | Core language |
| Spring Boot 3 | REST API framework |
| Spring Security | JWT-based authentication |
| Spring Data JPA | Database ORM |
| PostgreSQL | Relational database |
| JWT (jjwt) | Token generation & validation |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Styling |

---

## 🏗️ Architecture

```
internverse/
├── backend/                        # Spring Boot application
│   └── src/main/java/com/internverse/
│       ├── config/                 # Security, JWT, CORS
│       ├── controller/             # REST endpoints
│       ├── model/                  # JPA entities
│       ├── repository/             # Spring Data repositories
│       └── service/                # Business logic
│
└── frontend/                       # React application
    └── src/
        ├── components/             # Navbar, Sidebar
        ├── pages/                  # All page components
        └── services/               # Axios API config
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register as intern |
| POST | `/auth/login` | Public | Login and get JWT token |

### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/tasks` | Admin + Intern | Get all tasks |
| POST | `/tasks` | Admin only | Create new task |

### Submissions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/submissions` | Intern only | Submit a task |
| GET | `/submissions/my` | Intern only | Get own submissions |
| GET | `/submissions` | Admin only | Get all submissions |

### Evaluation
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/evaluation` | Admin only | Evaluate a submission |

### Certificates
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/certificates` | Admin only | Issue certificate |
| GET | `/certificates` | Admin only | Get all certificates |
| GET | `/certificates/intern/{email}` | Intern only | Get own certificates |

---

## ⚙️ Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 14+
- Node.js 18+

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Varun0126/internverse-backend.git
cd internverse-backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/internverse
spring.datasource.username=your_username
spring.datasource.password=your_password

# Run the application
mvn clean spring-boot:run
```

### Frontend Setup

```bash
# Clone the frontend repository
git clone https://github.com/Varun0126/internverse-frontend.git
cd internverse-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Create Admin Account

After starting the backend, run this SQL in your PostgreSQL database:

```sql
INSERT INTO users (name, email, password, role)
VALUES (
  'Admin',
  'admin@internverse.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVdU4r.IG6',
  'ROLE_ADMIN'
);
-- Default password: admin123
```

---

## 🔒 Security

- **Stateless JWT authentication** — no sessions stored on server
- **Role-based access control** — endpoints protected by `ROLE_ADMIN` / `ROLE_INTERN`
- **BCrypt password hashing** — passwords never stored in plain text
- **CORS configured** — only allows requests from the frontend origin
- **Admin registration disabled** — admin account created directly in DB

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

---

## 🚀 Deployment

- **Backend** deployed on [Render](https://render.com)
- **Frontend** deployed on [Vercel](https://vercel.com)
- **Database** hosted on Render PostgreSQL

---

## 👨‍💻 Author

**Varun** — Java Backend Developer

[![GitHub](https://img.shields.io/badge/GitHub-Varun0126-black?logo=github)](https://github.com/Varun0126)

---

## 📄 License

This project is licensed under the MIT License.
