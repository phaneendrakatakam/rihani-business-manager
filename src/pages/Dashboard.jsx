import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/currency";

function Dashboard() {
  const [investment, setInvestment] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [recovery, setRecovery] = useState(0);

  const loadDashboardData = () => {
    // ---------- Purchases ----------

    const savedPurchases =
      localStorage.getItem("rihaniPurchases");

    const purchases = savedPurchases
      ? JSON.parse(savedPurchases)
      : [];

    // ---------- Orders ----------

    const savedOrders =
      localStorage.getItem("rihaniOrders");

    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    // ---------- Investment ----------

    const totalInvestment = purchases.reduce(
      (total, purchase) =>
        total + Number(purchase.cost || 0),
      0
    );

    // ---------- Revenue ----------

    const totalRevenue = orders.reduce(
      (total, order) =>
        total + Number(order.orderAmount || 0),
      0
    );

    // ---------- Profit ----------

    const totalProfit =
      totalRevenue - totalInvestment;

    // ---------- Investment Recovery ----------

    let investmentRecovery = 0;

    if (totalInvestment > 0) {
      investmentRecovery =
        (totalRevenue / totalInvestment) * 100;
    }

    setInvestment(totalInvestment);
    setRevenue(totalRevenue);
    setProfit(totalProfit);
    setRecovery(investmentRecovery);
  };

  // ---------- Load Data ----------

  useEffect(() => {
    loadDashboardData();

    window.addEventListener(
      "focus",
      loadDashboardData
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadDashboardData
      );
    };
  }, []);

  return (
    <main className="dashboard-page">

      {/* ---------- Header ---------- */}

      <div className="page-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back to Rihani Business Manager.
          </p>
        </div>

      </div>

      {/* ---------- Financial Summary ---------- */}

      <div className="dashboard-cards">

        {/* Investment */}

        <div className="card">

          <h3>
            Overall Investment
          </h3>

          <h2>
            {formatCurrency(investment)}
          </h2>

        </div>

        {/* Revenue */}

        <div className="card">

          <h3>
            Overall Revenue
          </h3>

          <h2>
            {formatCurrency(revenue)}
          </h2>

        </div>

        {/* Profit */}

        <div className="card">

          <h3>
            Overall Profit
          </h3>

          <h2>
            {formatCurrency(profit)}
          </h2>

        </div>

        {/* Recovery */}

        <div className="card">

          <h3>
            Investment Recovery
          </h3>

          <h2>
            {recovery.toFixed(2)}%
          </h2>

        </div>

      </div>

      {/* ---------- Today's Tasks ---------- */}

      <section className="dashboard-section">

        <h2>
          Today's Tasks
        </h2>

        <p>
          No pending tasks.
        </p>

      </section>

    </main>
  );
}

export default Dashboard;