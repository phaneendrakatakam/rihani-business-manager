# Rihani Business Manager

A professional business management application built for **Rihani Creations** to manage customers, purchases, orders, financial information, reports, and business settings from one place.

Built with **React + Vite**, the application focuses on a clean interface, simple data entry, automatic calculations, local data persistence, and business data backup and restore.

---

## ✨ Features

### 📊 Dashboard

* Business activity overview
* Total purchases
* Total orders
* Order value
* Pending payments
* Completed orders
* Financial summaries

### 🛒 Purchase Management

* Record business purchases
* Track purchase amounts
* Maintain purchase history
* Edit purchase records
* Delete purchases with confirmation

### 📦 Order Management

* Create customer orders
* Select existing customers
* Add new customers directly from the order form
* Store customer phone / WhatsApp details
* Record order dates
* Add item and order descriptions
* Track order amounts
* Track payment status
* Track order completion status
* Edit orders
* Delete orders with confirmation

### 👥 Customer Management

* Store customer information
* Customer name and phone / WhatsApp details
* Reuse customer information when creating orders
* Local customer data storage

### 📈 Reports

* Business performance information
* Financial summaries
* Order and purchase information
* Business calculations

### ⚙️ Settings

* Business name
* Business phone
* Instagram information
* Currency selection
* Application data management

### 💾 Backup & Restore

Business data can be exported as a JSON backup file containing:

* Business settings
* Purchases
* Orders
* Customers

The backup can later be restored to recover the application data.

---

## 🛠️ Technologies

* **React**
* **Vite**
* **JavaScript**
* **React Router**
* **CSS**
* **LocalStorage**
* **Git**
* **GitHub**

---

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
```

---

## 📸 Screenshots

Screenshots of the application will be added here.

### Dashboard

Coming soon.

### Orders

Coming soon.

### Purchases

Coming soon.

### Reports

Coming soon.

### Settings

Coming soon.

---

## 🚀 Run Locally

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/phaneendrakatakam/rihani-business-manager.git
```

### 2. Enter the project directory

```bash
cd rihani-business-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## 🏗️ Production Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

---

## 💾 Data Storage

The current version stores application data locally in the browser using **LocalStorage**.

This means:

* No external database is required.
* Business data remains on the user's device/browser.
* Different browsers and devices have separate data.
* The built-in Backup & Restore feature can be used to move or recover data.

---

## 🔐 Privacy

The current version is designed as a local business management application.

Business information is stored locally in the browser and is not automatically uploaded to an external server.

---

## 🎯 Project Purpose

Rihani Business Manager was developed as a practical business management solution for **Rihani Creations**.

The project demonstrates the development of a real-world business application using:

* Component-based React architecture
* Client-side routing
* CRUD operations
* Local data persistence
* Financial calculations
* Form handling
* Application state management
* Backup and restore functionality
* Responsive UI design

---

## 🔮 Future Improvements

Potential future versions may include:

* Cloud database
* User authentication
* Multi-device synchronization
* Online deployment
* Advanced financial reports
* PDF invoices
* Excel exports
* Improved inventory management
* Automated cloud backups
* Role-based access

---

## 👨‍💻 Project

**Rihani Business Manager**

Built for **Rihani Creations**.
