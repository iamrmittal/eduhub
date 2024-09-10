# EduHub

EduHub is a MERN stack-based online educational platform that allows students to explore various courses and subscribe to access high-quality content. Teachers can create and upload their own courses, monetize them, and engage with students through this platform.

## Features

### For Students:

- Access a variety of courses across different subjects.
- Subscribe to courses with a flexible payment model.
- Track learning progress and earn certificates upon completion.
- Personalized course recommendations based on learning history.
- Interactive user interface with smooth animations and real-time notifications.

### For Educators:

- Upload courses with videos, PDFs, quizzes, and other learning materials.
- Monetize courses via a subscription-based model using Razorpay.
- Manage course content and interact with students.
- Secure login and authentication system for content protection.

### General Features:

- Real-time notifications using React Hot Toast.
- Data analytics for student progress and course insights using Chart.js.
- Secure authentication with JWT.
- Media file storage with Cloudinary and Multer.
- Task scheduling for automated tasks like subscription reminders via Node-Cron.
- Email services with Nodemailer.

## Tech Stack

### Frontend:

- **React**: For building the user interface.
- **Chakra UI**: For component-based styling.
- **Redux Toolkit**: For managing global state.
- **React Router Dom**: For client-side routing.
- **Framer Motion**: For animations and transitions.
- **React Chart.js**: For displaying data-driven charts and insights.
- **Axios**: For handling HTTP requests.

### Backend:

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and course data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Razorpay**: For handling subscription payments.
- **Cloudinary**: For media storage (course materials).
- **Multer**: For handling multipart/form-data (file uploads).
- **Nodemailer**: For sending automated emails.
- **Node-Cron**: For scheduling tasks.

## Project Setup

### Prerequisites:

- **Node.js** (v14.x or higher)
- **MongoDB** (local or cloud instance)
- **Razorpay API Key** (for handling payments)
- **Cloudinary Account** (for file storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamrmittal/eduhub.git
   cd eduhub
   ```
