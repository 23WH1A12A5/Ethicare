# 🛡️ Ethicare 

Ethicare Guard ID is an AI-powered image protection and misuse detection platform designed to help users secure their personal images, detect unauthorized usage, and maintain digital privacy. The platform provides image locking, AI-based analysis, complaint management, misuse detection, and real-time security notifications through a modern web interface.

---

## 🚀 Features

### 🔐 User Authentication
- Secure user registration and login
- Supabase-based authentication
- User profile management

### 🖼️ Image Protection
- Secure image upload
- PIN-based image locking
- Face recognition lock (simulation)
- Eye recognition lock (simulation)

### 🤖 AI-Based Image Analysis
- Image classification
- Risk-level assessment
- Explicit content detection
- Face detection simulation

### 🔍 Misuse Detection
- Reverse image search simulation
- Unauthorized image usage detection
- Risk identification and monitoring

### 📋 Complaint Management
- File complaints for image misuse
- Track complaint status
- Complaint history management

### 🔔 Notifications
- Security alerts
- Risk notifications
- Real-time updates

### 👨‍💼 Admin Dashboard
- User monitoring
- Complaint review system
- Uploaded image management
- Risk analytics

### 🎨 Modern User Interface
- Responsive design
- Dark and Light mode
- Interactive animations
- User-friendly dashboard

---

## 🏗️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- Framer Motion

### Backend & Database
- Supabase
- PostgreSQL

### State Management
- React Query

### Authentication
- Supabase Auth

### Icons
- Lucide React

---

## 📂 Project Structure

```text
ethicare-guard-id/
│
├── public/
├── screenshots/
│   ├── home-page.png
│   ├── complaint-management.png
│   ├── complaint-tracking.png
│   ├── image-upload.png
│   └── user-account.png
│
├── src/
│   ├── components/
│   ├── contexts/
│   ├── integrations/
│   ├── lib/
│   ├── pages/
│   │   ├── HomePage
│   │   ├── AboutPage
│   │   ├── ExplorePage
│   │   ├── LoginPage
│   │   ├── SignupPage
│   │   ├── DashboardPage
│   │   └── AdminPage
│   │
│   └── App.tsx
│
├── supabase/
├── package.json
└── README.md
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](./screenshots/home-page.png)

### 📋 Complaint Management

![Complaint Management](./screenshots/complaint-management.png)

### 📊 Complaint Tracking

![Complaint Tracking](./screenshots/complaint-tracking.png)

### 🖼️ Image Upload

![Image Upload](./screenshots/image-upload.png)

### 👤 User Account

![User Account](./screenshots/user-account.png)

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ethicare-guard-id.git
```

### Navigate to the Project Folder

```bash
cd ethicare-guard-id
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔄 Workflow

1. User registers and logs into the platform.
2. Personal images are uploaded securely.
3. AI analyzes uploaded images.
4. Risk level is generated.
5. User applies image protection methods.
6. Reverse image search checks for misuse.
7. Alerts are generated for suspicious activity.
8. Complaints can be filed and tracked.
9. Admin reviews and updates complaint status.

---

## 🎯 Future Enhancements

- Real AI-powered image classification
- Facial recognition integration
- OCR-based image analysis
- Automated takedown requests
- Blockchain-based image ownership verification
- Mobile application support
- Real reverse image search integration

---

## 🌟 Project Objective

The goal of Ethicare Guard ID is to provide a secure platform that helps individuals protect their personal images, detect misuse, and maintain privacy in the digital world using AI-driven technologies.

---

## 👨‍💻 Contributors

- Sai Sahithi
- Team Members

---

## 📄 License

This project is developed for educational and research purposes.