# 🏨 Hotel Management System (Fullstack MERN Project)

## 📋 Project Description:

A full-stack hotel management system that allows admins to:

- 🛏️ Manage hotel rooms
- 👥 Handle user accounts
- 💳 Process payments
- 📊 View analytics

The system includes secure authentication, email verification, and a full-featured dashboard for hotel operations.

---

## 🚀 Technologies Used:

### 🔧 Backend:

- ⚙️ Express.js with TypeScript
- 🛢️ Prisma ORM with MySQL
- 🏪 redis for caching
- 🔐 JWT for authentication
- 🔑 bcrypt for password hashing if user login recruiter, clerk or author auth system own hashing
- ☁️ Cloudinary for image upload/management
- ✅ express-validator for input validation
- 🌐 CORS for cross-origin requests
- 📧 Nodemailer for email messages
- 💰 Stripe for payment integration
- 🧪 Jest for backend testing

---

### 🎨 Frontend:

- ⚛️ Next.js with TypeScript
- 🧰 Redux Toolkit & RTK Query for state management & API
- 🔗 Axios for API calls
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui for reusable components
- 🔔 react-hot-toast for notifications
- 🔐 Next Auth for login/authentication
- 🧪 Jest for frontend testing

---

## 🛠️ Getting Started

### 📂 Clone the repository:

```bash
git clone https://github.com/abdelrhman-arfat/Hotel-project.git
```

# Frontend :

```bash
  cd frontend
  npm install
  npm run dev
```

## .env.local frontend :

```bash

NEXT_PUBLIC_BACKEND_URL=http://localhost:3004/api
AUTH_SECRET= ..
AUTH_GOOGLE_ID = ..
AUTH_GOOGLE_SECRET = ...
BACKEND_TOKEN= ...

```

---

# Backend :

```bash
  cd backend
  npm install
  npm run dev
```

## .env backend :

```bash
DATABASE_URL=

STRIPE_SECRET_KEY=

CLIENT_URL=

JWT_SECRET=
JWT_EXPIRATION_TIME=
REFRESH_EXPIRATION_TIME=
REFRESH_SECRET=

CLIENT_SCREE_JWT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=

PORT =

NODE_ENV =
```

## What i will learn in this project :

- [x] Unit Testing
- [x] Automation Operations
- [x] mySQl & redis
- [x] Prisma

[ Client (Next.js + NextAuth) ]
↓
[ Redux Toolkit + RTK Query ]
↓
[ API Layer - Express.js + TypeScript ]
↓
[ Prisma ORM ↔ MySQL DB ]
↘
[ Redis for caching ]
↘
[ Cloudinary for images ]
↘
[ Stripe for payment ]

## 📄 users

| Field     | Type         | Notes                   |
| --------- | ------------ | ----------------------- |
| id        | INT (PK)     | Auto-increment          |
| name      | VARCHAR(255) |                         |
| email     | VARCHAR(255) | Unique                  |
| password  | TEXT         | Hashed                  |
| role      | ENUM         | 'Manager' or 'customer' |
| createdAt | TIMESTAMP    |                         |

## 🏨 rooms

| Field             | Type          | Notes                        |
| ----------------- | ------------- | ---------------------------- |
| id                | INT (PK)      |                              |
| title             | VARCHAR(255)  | Room title                   |
| family_count      | INT           | Room size for family count   |
| description       | TEXT          | Room description             |
| created_at        | TIMESTAMP     | Default: CURRENT_TIMESTAMP   |
| updated_at        | TIMESTAMP     | Auto-updated on change       |
| price_per_day     | DECIMAL(10,2) | price of the room in one day |
| room_count        | INT           | Available units              |
| reservation_count | INT           | How many times reserved      |
| main_image        | TEXT          | Main image URL               |

## 🖼️ room_images

| Field     | Type     | Notes                |
| --------- | -------- | -------------------- |
| id        | INT (PK) |                      |
| room_id   | INT (FK) | Related to `rooms`   |
| image_url | TEXT     | Cloudinary image URL |

## 📅 reservations - After payment successful :

| Field       | Type          | Notes                 |
| ----------- | ------------- | --------------------- |
| id          | INT (PK)      |                       |
| room_id     | INT (FK)      | Room being booked     |
| user_id     | INT (FK)      | Who booked            |
| start_date  | DATE          |                       |
| end_date    | DATE          |                       |
| total_price | DECIMAL(10,2) | Calculated by backend |
