# Assignment Submission Portal - Frontend

## Technical Instructor Trainee - Skill Assessment Task

---

## 🔎 Task Overview

This is a **Next.js 13 (App Router)** frontend application implementing an **Assignment Submission Portal** with two user roles:

- **Instructor**  
- **Student**

---

### User Roles & Capabilities

#### Instructor

- Create assignments with title, description, and deadline.
- View all student submissions for their assignments.
- Provide feedback on submissions and update submission statuses: **Accepted**, **Rejected**, or **Pending**.
- View a dynamic pie chart summarizing submissions by status.

#### Student

- View all available assignments.
- Submit assignment work by providing a submission URL and optional note.
- Track submission statuses and view instructor feedback.

---

## ⚙️ Core Features

- **User Authentication** via NextAuth with email & password login.
- **Role-based Access Control** & route protection for secure pages.
- **Assignment Creation Form** for instructors.
- **Assignment List** accessible by all users.
- **Submission Form** for students to submit their work.
- **Review Panel** for instructors to update submission status and feedback.
- **Dynamic Pie Chart** visualizing submission status distribution (Pending, Accepted, Rejected).

---

## 🛠️ Tech Stack

| Technology     | Purpose                                    |
| -------------- | ------------------------------------------|
| Next.js 13     | React framework & App Router               |
| NextAuth       | Authentication & session management        |
| TailwindCSS    | Styling and responsive UI                   |
| Recharts       | Pie chart visualization                      |
| TypeScript    | Type-safe JavaScript                         |

---

## 📁 Project Structure Overview




## 🚀 Getting Started - Step by Step

### 1. Clone the Repository

bash

```
git clone https://github.com/yourusername/assignment-portal-frontend.git
cd assignment-portal-frontend



npm install
# or
yarn install

```

## 🔐 Test Credentials

Use these credentials to log in and test the app functionality:

| Role       | Email                | Password     |
|------------|----------------------|--------------|
| Instructor | abdullah@ins.com | instructor1234  |
| Student    | mahfuz@std1.com    | student1234  |




## 🔗 Live Demo & Repository

- **Live Demo Frontend:** [https://assignment-portal-frontend.vercel.app](https://assignment-portal-frontend.vercel.app)  
- **Live Demo Backend:** [https://assignment-portal-backend-rho.vercel.app](https://assignment-portal-backend-rho.vercel.app)  
- **GitHub Repo Frontend:** [https://github.com/mahfuzctg/assignment-portal-frontend.git](https://github.com/mahfuzctg/assignment-portal-frontend.git)
- **GitHub Repo Backend:** [https://github.com/mahfuzctg/assignment-portal-backend.git](https://github.com/mahfuzctg/assignment-portal-backend.git)
