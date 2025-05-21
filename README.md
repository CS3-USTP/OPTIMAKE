# 🎓 Optimake

## 📊 University Course Scheduling Optimization System

![Version](https://img.shields.io/badge/status-active-success.svg)

> **Optimake** is a powerful web-based platform that leverages **Constraint Programming** to solve complex university course scheduling challenges efficiently.

![image](https://github.com/user-attachments/assets/a444040d-74ac-4aac-bf19-535bae4dad24)

---

## ✨ Features

- 🧩 **Constraint-Based Scheduling** - Advanced algorithms for conflict-free schedules
- 🌐 **Web-Based Interface** - Accessible from anywhere, on any device
- ⚡ **High-Performance Backend** - C++ optimization engine for lightning-fast results
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔒 **Secure Authentication** - Protected access to scheduling resources

## 🛠️ Setup

### Prerequisites

- Ubuntu 24.04 or WSL2
- Node.js v23+
- pnpm package manager

### Installation

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Setup optimization engine
sudo apt update
sudo apt install -y build-essential cmake lsb-release
pnpm run engine-setup-ubuntu24.04
pnpm run engine-build
pnpm run engine-compile
```

## 🚀 Usage

```bash
# Development
pnpm run dev

# Production
pnpm run build
pnpm run start
```

## 🔌 Architecture

- **Frontend**: Sveltekit with TailwindCSS - Provides responsive UI and component-based development
- **Backend**: Node.js - Handles API requests and business logic
- **Database**: Firestore - Stores scheduling data, constraints, and user preferences
- **Authentication**: Firebase - Manages user accounts and access control
- **Optimization**: Google OR-Tools CP-SAT - Powers the constraint programming solver
- **Deployment**: Docker & Cloud Run - Enables containerization and scalable cloud hosting

## 🤝 Contributing

Bug reports, feature requests, and documentation improvements are welcome via our issue tracker.

### 📦 Conventional Commit Types

| Type       | Meaning                                                                 | Example Commit Message                            |
|------------|-------------------------------------------------------------------------|---------------------------------------------------|
| `feat`     | Adds a new feature                                                      | `feat(scheduler): add constraint for max hours`   |
| `fix`      | Fixes a bug                                                             | `fix(auth): correct token expiration handling`    |
| `docs`     | Documentation only changes                                              | `docs: update README with install instructions`   |
| `style`    | Code style changes (formatting, no code logic change)                  | `style: format with Prettier`                     |
| `refactor` | Code changes that neither fix a bug nor add a feature                  | `refactor: simplify loop logic`                   |
| `perf`     | Performance improvements                                                | `perf(solver): optimize backtracking algorithm`   |
| `test`     | Adds or modifies tests                                                  | `test: add tests for room conflict checker`       |
| `chore`    | Routine tasks or maintenance (no production code change)               | `chore: update dependencies`                      |
| `build`    | Changes that affect the build system or external dependencies          | `build: configure Docker for deployment`          |
| `ci`       | CI/CD pipeline changes                                                  | `ci: add GitHub Actions for test workflow`        |
| `revert`   | Reverts a previous commit                                               | `revert: feat(auth): add login with Google`       |


## 📞 Support

For support, open an issue or contact the development team.

---

_Made with ❤️ for educational institutions worldwide_
