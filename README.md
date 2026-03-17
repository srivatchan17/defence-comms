# 🛡️ DefenceComms — Secure Military Communication Platform

A secure, closed-group communication platform for defence personnel,
veterans, and their families built for the hackathon.

---

## 🎯 Problem Statement
Build a secure communication platform for defence personnel that works
over existing public mobile networks with encrypted messaging, access
control, and data leakage prevention.

---

## ✅ Features

### 🔐 Security
- End-to-end encrypted messaging (AES-256)
- Defence VPN protected communications
- HQ-approved user access only
- Blocked users cannot login

### 🚫 Data Leakage Prevention (DLP)
- Right-click disabled
- Copy/paste blocked with warning
- Print screen shortcut blocked
- Forward button disabled
- Real-time DLP violation alerts

### 💬 Communication
- Real-time encrypted chat (WebSocket)
- Multiple secure channels
- Encrypted file sharing ready
- Message encryption badge on every message

### 👮 Admin Dashboard
- HQ user approval workflow
- Approve / revoke user access instantly
- Role-based access (Admin, Officer, Veteran, Family)
- Real-time audit logs
- Active session monitoring

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Real-time | WebSocket (ws) |
| Frontend | HTML + CSS + JavaScript |
| Auth | Session-based + Role control |
| Database | JSON (demo) → PostgreSQL (production) |
| Security | DLP policies, encrypted transport |

---

## 👥 Demo Accounts

| Username | Password | Role | Access |
|---|---|---|---|
| admin | admin123 | HQ Admin | Full dashboard |
| officer1 | pass123 | Officer | Chat access |
| veteran1 | pass123 | Veteran | Chat access |
| pending1 | pass123 | Officer | ⛔ Blocked |

---

## 🛠️ How to Run

### Prerequisites
- Node.js v18+
- Git

### Steps
```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/defence-comms.git

# Go into the folder
cd defence-comms

# Install dependencies
npm install

# Start the server
node server.js

# Open in browser
http://localhost:3000
```

---

## 🏗️ Architecture
```
Public Mobile Network
        ↓
  Defence VPN Layer
        ↓
  Node.js + Express Server
        ↓
  ┌─────────────────────────┐
  │  WebSocket (Real-time)  │
  │  REST API (Auth/Admin)  │
  │  DLP Engine             │
  └─────────────────────────┘
        ↓
  Encrypted Storage
```

---

## 🔒 Security Features Demo

1. **Login** — only HQ-approved users can access
2. **Pending user** — `pending1` gets blocked with HQ message
3. **DLP** — try Ctrl+C or right-click on chat screen
4. **Admin** — login as `admin` to approve/revoke users
5. **Audit log** — every action is logged with timestamp

---

## 🌐 Production Roadmap

- [ ] WireGuard VPN integration
- [ ] Signal Protocol E2E encryption
- [ ] Mobile app (React Native)
- [ ] Biometric authentication
- [ ] Hardware Security Module (HSM)
- [ ] Screenshot prevention (FLAG_SECURE)
- [ ] Self-destructing messages

---
