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


### Dashboard

<img width="1907" height="878" alt="Dashboard" src="https://github.com/user-attachments/assets/a40be6b2-fa9e-4f51-a37d-33d09dbbf6d9" />


### Orders
<img width="1907" height="876" alt="Orders" src="https://github.com/user-attachments/assets/c7f5642e-9f33-4c21-bd0c-b854d11a4256" />


### Purchases

<img width="1885" height="872" alt="Purchases" src="https://github.com/user-attachments/assets/7e089036-4b23-43ad-bd2c-7c1c580856d6" />


### Reports

<img width="1912" height="878" alt="Reports" src="https://github.com/user-attachments/assets/40d0f687-7010-46a7-b653-7800cb0a4169" />


### Settings

<img width="1907" height="872" alt="Settings" src="https://github.com/user-attachments/assets/e5458481-4b02-4b28-9013-c26b50cd9842" />


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
