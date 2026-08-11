// ---------- Get Saved Currency ----------

export const getCurrency = () => {
  const savedSettings =
    localStorage.getItem("rihaniSettings");

  if (!savedSettings) {
    return "₹";
  }

  try {
    const settings = JSON.parse(savedSettings);

    return settings.currency || "₹";
  } catch (error) {
    return "₹";
  }
};


// ---------- Format Currency ----------

export const formatCurrency = (amount) => {
  const currency = getCurrency();

  return `${currency}${Number(amount || 0).toFixed(2)}`;
};


// ---------- Currency Hook ----------

export const useCurrency = () => {
  const currency = getCurrency();

  return {
    currency,
    formatCurrency,
  };
};