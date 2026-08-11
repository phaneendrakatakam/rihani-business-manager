import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/currency";

function Reports() {
  const [investment, setInvestment] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [recovery, setRecovery] = useState(0);

  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [paidOrders, setPaidOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [inProgressOrders, setInProgressOrders] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  // ---------- Load Report Data ----------

  const loadReportData = () => {
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

    // ---------- Order Statistics ----------

    const paid = orders.filter(
      (order) =>
        order.paymentStatus === "Paid"
    );

    const pending = orders.filter(
      (order) =>
        order.paymentStatus === "Pending"
    );

    const completed = orders.filter(
      (order) =>
        order.orderStatus === "Completed"
    );

    const inProgress = orders.filter(
      (order) =>
        order.orderStatus === "In Progress"
    );

    const pendingPaymentAmount =
      pending.reduce(
        (total, order) =>
          total +
          Number(order.orderAmount || 0),
        0
      );

    // ---------- Set State ----------

    setInvestment(totalInvestment);
    setRevenue(totalRevenue);
    setProfit(totalProfit);
    setRecovery(investmentRecovery);

    setTotalPurchases(purchases.length);
    setTotalOrders(orders.length);

    setPaidOrders(paid.length);
    setPendingOrders(pending.length);

    setCompletedOrders(completed.length);
    setInProgressOrders(inProgress.length);

    setPendingPayments(
      pendingPaymentAmount
    );
  };

  // ---------- Load On Page Open ----------

  useEffect(() => {
    loadReportData();

    window.addEventListener(
      "focus",
      loadReportData
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadReportData
      );
    };
  }, []);

  return (
    <main className="reports-page">

      {/* ---------- Header ---------- */}

      <div className="page-header">

        <div>
          <h1>
            Reports
          </h1>

          <p>
            View your business financial
            and order performance.
          </p>
        </div>

      </div>

      {/* ---------- Financial Summary ---------- */}

      <h2>
        Financial Summary
      </h2>

      <div className="dashboard-cards">

        <div className="card">

          <h3>
            Total Investment
          </h3>

          <h2>
            {formatCurrency(investment)}
          </h2>

        </div>

        <div className="card">

          <h3>
            Total Revenue
          </h3>

          <h2>
            {formatCurrency(revenue)}
          </h2>

        </div>

        <div className="card">

          <h3>
            Net Profit
          </h3>

          <h2>
            {formatCurrency(profit)}
          </h2>

        </div>

        <div className="card">

          <h3>
            Investment Recovery
          </h3>

          <h2>
            {recovery.toFixed(2)}%
          </h2>

        </div>

      </div>

      {/* ---------- Purchase Summary ---------- */}

      <h2>
        Purchase Summary
      </h2>

      <div className="dashboard-cards">

        <div className="card">

          <h3>
            Total Purchases
          </h3>

          <h2>
            {totalPurchases}
          </h2>

        </div>

        <div className="card">

          <h3>
            Purchase Investment
          </h3>

          <h2>
            {formatCurrency(investment)}
          </h2>

        </div>

      </div>

      {/* ---------- Order Summary ---------- */}

      <h2>
        Order Summary
      </h2>

      <div className="dashboard-cards">

        <div className="card">

          <h3>
            Total Orders
          </h3>

          <h2>
            {totalOrders}
          </h2>

        </div>

        <div className="card">

          <h3>
            Paid Orders
          </h3>

          <h2>
            {paidOrders}
          </h2>

        </div>

        <div className="card">

          <h3>
            Pending Orders
          </h3>

          <h2>
            {pendingOrders}
          </h2>

        </div>

        <div className="card">

          <h3>
            Pending Payments
          </h3>

          <h2>
            {formatCurrency(pendingPayments)}
          </h2>

        </div>

      </div>

      {/* ---------- Order Status ---------- */}

      <h2>
        Order Status
      </h2>

      <div className="dashboard-cards">

        <div className="card">

          <h3>
            Completed Orders
          </h3>

          <h2>
            {completedOrders}
          </h2>

        </div>

        <div className="card">

          <h3>
            In Progress
          </h3>

          <h2>
            {inProgressOrders}
          </h2>

        </div>

      </div>

    </main>
  );
}

export default Reports;