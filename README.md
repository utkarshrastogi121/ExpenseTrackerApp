# 💰 Expense Tracker App

A simple and user-friendly **Expense & Income Tracking Application** built with **React Native (Mobile)** and **Node.js/Express (Backend)**.  
This app helps you manage your personal finances by tracking income and expenses with categories, maintaining transaction history, and calculating total balance.

---

## 🚀 Features

- 🔐 **Authentication with Clerk** – Secure user login/signup and session management.  
- ➕ **Add Transactions** – Record both **income** and **expenses**.  
- 🏷️ **Categories** – Organize transactions (Food, Shopping, Transport, Bills, Entertainment, etc.).  
- 📊 **Dashboard Overview** – View total balance, total income, and total expenses.  
- 📝 **Recent Transactions** – See detailed transaction history with category, amount, and date.  
- 🗑️ **Delete Transactions** – Remove unwanted entries.  
- ⚡ **Redis Caching** – Improves performance by caching frequently used data.  
- ⏳ **Cron Jobs** – Automates periodic tasks (like reminders, reports, data cleanup, etc.).  
- 🗄️ **Neon PostgreSQL** – Cloud-based Postgres database for storing transactions and user data.  
- 📱 **Mobile-First** – Built with React Native + Expo for cross-platform support.  

---

## 🛠️ Tech Stack

### Frontend (Mobile)
- React Native  
- Expo  
- React Navigation  

### Backend
- Node.js  
- Express.js  
- Clerk (Authentication)  
- Neon PostgreSQL (Database)  
- Prisma ORM (or pg client, depending on your setup)  
- Redis (Caching)  
- Node-Cron (Background tasks)  

---

## 📷 Screenshots
<img src="https://github.com/utkarshrastogi121/ExpenseTrackerApp/blob/main/screenshots/login.jpg" alt="Login Screen" width="300"/>

![Login Screen]<img src="https://github.com/utkarshrastogi121/ExpenseTrackerApp/blob/main/mobile/assets/images/first.jpg" alt="Login Screen" width="300"/>
![Add Transaction]<img src="https://github.com/utkarshrastogi121/ExpenseTrackerApp/blob/main/mobile/assets/images/second.jpg" alt="Login Screen" width="300"/>
![Dashboard]<img src="https://github.com/utkarshrastogi121/ExpenseTrackerApp/blob/main/mobile/assets/images/third.jpg" alt="Login Screen" width="300"/>

---

## ⚙️ Installation & Setup

### Clone the repository
```bash
git clone https://github.com/utkarshrastogi121/ExpenseTrackerApp.git
cd ExpenseTrackerApp
```
## Backend Setup
```bash
cd backend
npm install
npm run dev
```
### Make sure you have:

✅ Neon PostgreSQL connection URL in .env
✅ Redis running
✅ Clerk API keys configured in .env

## Mobile App Setup
```bash
cd mobile
npm install
npx expo start
```
### Scan the QR code with the Expo Go app on your phone or you can use emulator.
