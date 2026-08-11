import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="app">

      <Header />

      <Sidebar />

      <main className="main">
        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/purchases"
            element={<Purchases />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;