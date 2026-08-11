Rihani Business Manager

A professional business management application built for **Rihani Creations** to manage customers, purchases, orders, financial records, reports, and business settings from one place.

Built with React and Vite, the application provides a clean dashboard-style interface with local data storage, automatic calculations, backup and restore functionality, and an easy-to-use workflow for day-to-day business management.

## ✨ Features

### 📊 Dashboard
- Overview of business activity
- Total purchases
- Total orders
- Revenue and financial summaries
- Quick access to important business information

### 🛒 Purchase Management
- Record business purchases
- Track purchase amounts
- Maintain purchase history
- Edit existing purchase records
- Delete purchases with confirmation

### 📦 Order Management
- Create and manage customer orders
- Customer selection
- Add new customers directly from the order form
- Customer phone / WhatsApp details
- Order date and description
- Order amount
- Payment status tracking
- Order completion status
- Edit existing orders
- Delete orders with confirmation

### 👥 Customer Management
- Store customer information
- Customer name and phone / WhatsApp details
- Reuse customer information when creating orders
- Local customer data storage

### 📈 Reports
- Business performance information
- Financial calculations
- Order and purchase summaries

### ⚙️ Settings
- Business information
- Business phone number
- Instagram information
- Currency selection
- Local data backup
- Restore from backup
- Clear application data

### 💾 Backup & Restore
The application can export business data into a JSON backup file containing:

- Business settings
- Purchases
- Orders
- Customers

The backup can later be restored to recover the application data.

## 🛠️ Technologies

- **React**
- **Vite**
- **JavaScript**
- **React Router**
- **CSS**
- **LocalStorage**
- **Git & GitHub**

## 📂 Project Structure

```text
rihani-business-manager/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MainContent.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Purchases.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   │
│   ├── utils/
│   │   ├── currency.js
│   │   └── financialCalculations.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
🚀 Run the Project Locally
Prerequisites

Make sure you have installed:

Node.js
npm
Git
1. Clone the repository
git clone https://github.com/phaneendrakatakam/rihani-business-manager.git
2. Open the project
cd rihani-business-manager
3. Install dependencies
npm install
4. Start the development server
npm run dev

Vite will provide a local development URL, usually:

http://localhost:5173

Open that URL in your browser.

🏗️ Production Build

To create a production build:

npm run build

To preview the production build locally:

npm run preview
💡 Data Storage

This version of Rihani Business Manager stores application data locally in the browser using LocalStorage.

This means:

No external database is required.
Data is stored on the user's device/browser.
Different browsers/devices have separate data.
The built-in Backup & Restore feature can be used to move or recover data.
🔐 Data & Privacy

The current version is designed as a local business management application.

Business data is stored locally in the browser and is not automatically uploaded to an external server.

📸 Screenshots

Screenshots of the application will be added here to demonstrate the main interface and features.

🎯 Project Purpose

Rihani Business Manager was created as a practical business management solution for Rihani Creations.

The project demonstrates the development of a real-world business application with:

Component-based React architecture
Client-side routing
Local data persistence
CRUD operations
Financial calculations
Backup and restore functionality
Responsive UI design
Form handling
Application state management
🔮 Future Improvements

Possible future versions may include:

Cloud database
User authentication
Multi-device synchronization
Online deployment
Advanced financial reports
PDF invoices
Excel exports
Inventory management improvements
Automated cloud backups
Role-based access
👨‍💻 Project

Rihani Business Manager

Built with ❤️ for Rihani Creations.
