# 🎓 Optimake

## 📊 University Course Scheduling Optimization System

![Version](https://img.shields.io/badge/status-active-success.svg)

> **Optimake** is a powerful web-based platform that leverages **Constraint Programming** to solve complex university course scheduling challenges efficiently.

![image](https://github.com/user-attachments/assets/00977a89-3a06-4737-b728-d70dccb11209)

---

## ✨ Features

- 🧩 **Constraint-Based Scheduling** - Advanced algorithms for conflict-free schedules
- 🌐 **Web-Based Interface** - Accessible from anywhere, on any device
- ⚡ **High-Performance Backend** - C++ optimization engine for lightning-fast results
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔒 **Secure Authentication** - Protected access to scheduling resources

---

## 🛠️ Installation & Setup

### Prerequisites

- Ubuntu 24.04 or WSL2
- Node.js v23+
- pnpm package manager

### Web Application Setup

```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install
```

### Optimization Engine Setup

```bash
# Install required system packages
sudo apt update
sudo apt install -y build-essential cmake lsb-release

# Set up and build the engine
pnpm run engine-setup-ubuntu24.04
pnpm run engine-build
pnpm run engine-compile
```

> ⚠️ **Note**: The optimization engine is linked to a seperate repository.

---

## 🚀 Running the Application

```bash
# Development mode
pnpm run dev

# Production build
pnpm run build
pnpm run start
```

---

## 🏗️ Architecture

- **Frontend**: Next.js React framework
- **Backend**: Node.js with Express
- **Scheduling Engine**: C++ with Google OR-Tools CP-SAT solver
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Deployment**: Cloud Run with Docker containerization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit:

- 🐛 Bug reports
- ✅ Feature requests
- 📝 Documentation improvements

Submit issues through our issue tracker or contact the development team.

---

## 🔧 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: Firestore
- **Authentication**: Firebase Authentication
- **Optimization**: Google OR-Tools CP-SAT
- **Deployment**: Docker, Cloud Run
- **Build Tools**: CMake, pnpm

---

## 📞 Support

For support or inquiries, please open an issue or contact the development team.

---

_Made with ❤️ for educational institutions worldwide_
