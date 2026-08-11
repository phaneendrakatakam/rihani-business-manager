// ==========================================
// Rihani Creations
// Financial Calculations
// ==========================================


// ---------- Get Purchases ----------

export const getPurchases = () => {
  const savedPurchases =
    localStorage.getItem("rihaniPurchases");

  return savedPurchases
    ? JSON.parse(savedPurchases)
    : [];
};


// ---------- Get Orders ----------

export const getOrders = () => {
  const savedOrders =
    localStorage.getItem("rihaniOrders");

  return savedOrders
    ? JSON.parse(savedOrders)
    : [];
};


// ---------- Total Investment ----------

export const calculateInvestment = (
  purchases = getPurchases()
) => {
  return purchases.reduce(
    (total, purchase) =>
      total + Number(purchase.cost || 0),
    0
  );
};


// ---------- Total Revenue ----------

export const calculateRevenue = (
  orders = getOrders()
) => {
  return orders.reduce(
    (total, order) =>
      total + Number(order.orderAmount || 0),
    0
  );
};


// ---------- Net Profit ----------

export const calculateProfit = (
  revenue,
  investment
) => {
  return Number(revenue || 0) - Number(investment || 0);
};


// ---------- Investment Recovery % ----------

export const calculateRecoveryPercentage = (
  revenue,
  investment
) => {
  const totalInvestment = Number(investment || 0);
  const totalRevenue = Number(revenue || 0);

  if (totalInvestment <= 0) {
    return 0;
  }

  return (
    (totalRevenue / totalInvestment) * 100
  );
};


// ---------- Investment Recovered ----------

export const calculateInvestmentRecovered = (
  revenue,
  investment
) => {
  const totalRevenue = Number(revenue || 0);
  const totalInvestment = Number(investment || 0);

  if (totalInvestment <= 0) {
    return 0;
  }

  return Math.min(
    totalRevenue,
    totalInvestment
  );
};


// ---------- Investment Remaining ----------

export const calculateInvestmentRemaining = (
  revenue,
  investment
) => {
  const totalRevenue = Number(revenue || 0);
  const totalInvestment = Number(investment || 0);

  return Math.max(
    totalInvestment - totalRevenue,
    0
  );
};


// ---------- Profit Percentage ----------

export const calculateProfitPercentage = (
  profit,
  investment
) => {
  const totalProfit = Number(profit || 0);
  const totalInvestment = Number(investment || 0);

  if (totalInvestment <= 0) {
    return 0;
  }

  return (
    (totalProfit / totalInvestment) * 100
  );
};


// ---------- Revenue Percentage ----------

export const calculateRevenuePercentage = (
  revenue,
  investment
) => {
  const totalRevenue = Number(revenue || 0);
  const totalInvestment = Number(investment || 0);

  if (totalInvestment <= 0) {
    return 0;
  }

  return (
    (totalRevenue / totalInvestment) * 100
  );
};


// ---------- Pending Payments ----------

export const calculatePendingPayments = (
  orders = getOrders()
) => {
  return orders
    .filter(
      (order) =>
        order.paymentStatus === "Pending"
    )
    .reduce(
      (total, order) =>
        total +
        Number(order.orderAmount || 0),
      0
    );
};


// ---------- Paid Revenue ----------

export const calculatePaidRevenue = (
  orders = getOrders()
) => {
  return orders
    .filter(
      (order) =>
        order.paymentStatus === "Paid"
    )
    .reduce(
      (total, order) =>
        total +
        Number(order.orderAmount || 0),
      0
    );
};


// ---------- Complete Financial Summary ----------

export const getFinancialSummary = () => {
  const purchases = getPurchases();
  const orders = getOrders();

  const investment =
    calculateInvestment(purchases);

  const revenue =
    calculateRevenue(orders);

  const profit =
    calculateProfit(
      revenue,
      investment
    );

  const recoveryPercentage =
    calculateRecoveryPercentage(
      revenue,
      investment
    );

  const investmentRecovered =
    calculateInvestmentRecovered(
      revenue,
      investment
    );

  const investmentRemaining =
    calculateInvestmentRemaining(
      revenue,
      investment
    );

  const profitPercentage =
    calculateProfitPercentage(
      profit,
      investment
    );

  const revenuePercentage =
    calculateRevenuePercentage(
      revenue,
      investment
    );

  const pendingPayments =
    calculatePendingPayments(orders);

  const paidRevenue =
    calculatePaidRevenue(orders);

  return {
    investment,
    revenue,
    profit,
    recoveryPercentage,
    investmentRecovered,
    investmentRemaining,
    profitPercentage,
    revenuePercentage,
    pendingPayments,
    paidRevenue,
  };
};