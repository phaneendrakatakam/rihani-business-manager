function MainContent() {
  return (
    <main className="main">
      <h1>Dashboard</h1>

      <p>Welcome back to Rihani Business Manager.</p>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Investment</h3>
          <h2>₹0.00</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹0.00</h2>
        </div>

        <div className="card">
          <h3>Net Profit</h3>
          <h2>₹0.00</h2>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <h2>0</h2>
        </div>

      </div>

      <h2>Recent Activity</h2>

      <p>No business activity yet.</p>

    </main>
  );
}

export default MainContent;