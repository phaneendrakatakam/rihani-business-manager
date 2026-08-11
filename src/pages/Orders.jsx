import { useEffect, useState } from "react";
import { useCurrency } from "../utils/currency";

function Orders() {
  const { currency } = useCurrency();

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showNewCustomer, setShowNewCustomer] = useState(false);

  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // ---------- Order Form ----------

  const [customer, setCustomer] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [items, setItems] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  // ---------- New Customer ----------

  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");

  // ---------- Orders ----------

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("rihaniOrders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // ---------- Customers ----------

  const [customers, setCustomers] = useState(() => {
    const savedCustomers =
      localStorage.getItem("rihaniCustomers");

    return savedCustomers
      ? JSON.parse(savedCustomers)
      : [];
  });

  // ---------- Save Orders ----------

  useEffect(() => {
    localStorage.setItem(
      "rihaniOrders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // ---------- Load Customers ----------

  useEffect(() => {
    const loadCustomers = () => {
      const savedCustomers =
        localStorage.getItem("rihaniCustomers");

      setCustomers(
        savedCustomers
          ? JSON.parse(savedCustomers)
          : []
      );
    };

    loadCustomers();

    window.addEventListener("focus", loadCustomers);

    return () => {
      window.removeEventListener("focus", loadCustomers);
    };
  }, []);

  // ---------- Open Add Form ----------

  const openAddForm = () => {
    setOrderToEdit(null);

    setCustomer("");
    setCustomerPhone("");
    setOrderDate("");
    setItems("");
    setOrderAmount("");
    setPaymentStatus("");
    setOrderStatus("");

    setShowNewCustomer(false);
    setNewCustomerName("");
    setNewCustomerPhone("");

    setShowForm(true);
  };

  // ---------- Open Edit Form ----------

  const handleEditClick = (order) => {
    setOrderToEdit(order);

    setCustomer(order.customer || "");
    setCustomerPhone(order.customerPhone || "");
    setOrderDate(order.orderDate || "");
    setItems(order.items || "");
    setOrderAmount(
      order.orderAmount === "" ||
      order.orderAmount === null ||
      order.orderAmount === undefined
        ? ""
        : order.orderAmount
    );
    setPaymentStatus(order.paymentStatus || "");
    setOrderStatus(order.orderStatus || "");

    setShowNewCustomer(false);

    setShowForm(true);
  };

  // ---------- Customer Selection ----------

  const handleCustomerChange = (e) => {
    const selectedCustomerName = e.target.value;

    setCustomer(selectedCustomerName);

    const selectedCustomer = customers.find(
      (item) => item.name === selectedCustomerName
    );

    if (selectedCustomer) {
      setCustomerPhone(selectedCustomer.phone || "");
    } else {
      setCustomerPhone("");
    }
  };

  // ---------- Add New Customer ----------

  const handleAddNewCustomer = () => {
    const name = newCustomerName.trim();
    const phone = newCustomerPhone.trim();

    if (!name) {
      alert("Please enter customer name.");
      return;
    }

    const duplicateCustomer = customers.find(
      (item) =>
        item.name.trim().toLowerCase() ===
        name.toLowerCase()
    );

    if (duplicateCustomer) {
      alert("This customer already exists.");

      setCustomer(duplicateCustomer.name);
      setCustomerPhone(
        duplicateCustomer.phone || ""
      );

      setShowNewCustomer(false);

      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      createdAt: new Date().toISOString(),
      edited: false,
    };

    const updatedCustomers = [
      ...customers,
      newCustomer,
    ];

    localStorage.setItem(
      "rihaniCustomers",
      JSON.stringify(updatedCustomers)
    );

    setCustomers(updatedCustomers);

    setCustomer(name);
    setCustomerPhone(phone);

    setNewCustomerName("");
    setNewCustomerPhone("");

    setShowNewCustomer(false);

    alert("Customer added successfully.");
  };

  // ---------- Close Form ----------

  const closeForm = () => {
    setShowForm(false);
    setOrderToEdit(null);

    setCustomer("");
    setCustomerPhone("");
    setOrderDate("");
    setItems("");
    setOrderAmount("");
    setPaymentStatus("");
    setOrderStatus("");

    setShowNewCustomer(false);

    setNewCustomerName("");
    setNewCustomerPhone("");
  };

  // ---------- Add Order ----------
  // IMPORTANT:
  // Nothing is mandatory.
  // The order can be saved with every field blank.

  const handleAddOrder = () => {
    const newOrder = {
      id: Date.now(),
      customer: customer.trim(),
      customerPhone: customerPhone.trim(),
      orderDate: orderDate,
      items: items.trim(),
      orderAmount:
        orderAmount === ""
          ? ""
          : Number(orderAmount),
      paymentStatus: paymentStatus,
      orderStatus: orderStatus,
      edited: false,
    };

    setOrders([
      ...orders,
      newOrder,
    ]);

    closeForm();
  };

  // ---------- Update Order ----------
  // IMPORTANT:
  // Nothing is mandatory here either.

  const handleUpdateOrder = () => {
    if (!orderToEdit) {
      return;
    }

    const updatedOrders = orders.map(
      (order) =>
        order.id === orderToEdit.id
          ? {
              ...order,
              customer: customer.trim(),
              customerPhone: customerPhone.trim(),
              orderDate: orderDate,
              items: items.trim(),
              orderAmount:
                orderAmount === ""
                  ? ""
                  : Number(orderAmount),
              paymentStatus: paymentStatus,
              orderStatus: orderStatus,
              edited: true,
            }
          : order
    );

    setOrders(updatedOrders);

    closeForm();
  };

  // ---------- Delete Confirmation ----------

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setOrderToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    if (!orderToDelete) {
      return;
    }

    const updatedOrders = orders.filter(
      (order) =>
        order.id !== orderToDelete.id
    );

    setOrders(updatedOrders);

    setOrderToDelete(null);
    setShowDeleteConfirm(false);
  };

  // ---------- Dashboard Statistics ----------

  const totalOrders = orders.length;

  const totalOrderValue = orders.reduce(
    (total, order) =>
      total + Number(order.orderAmount || 0),
    0
  );

  const pendingPayments = orders
    .filter(
      (order) =>
        order.paymentStatus === "Pending"
    )
    .reduce(
      (total, order) =>
        total + Number(order.orderAmount || 0),
      0
    );

  const completedOrders = orders.filter(
    (order) =>
      order.orderStatus === "Completed"
  ).length;

  return (
    <main className="orders-page">

      {/* ---------- Page Header ---------- */}

      <div className="page-header">

        <div>
          <h1>Orders</h1>

          <p>
            Manage all customer orders here.
          </p>
        </div>

        <button
          className="add-purchase-button"
          onClick={openAddForm}
        >
          + Add Order
        </button>

      </div>

      {/* ---------- Statistics ---------- */}

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="card">
          <h3>Total Order Value</h3>

          <h2>
            {currency}
            {totalOrderValue.toFixed(2)}
          </h2>
        </div>

        <div className="card">
          <h3>Pending Payments</h3>

          <h2>
            {currency}
            {pendingPayments.toFixed(2)}
          </h2>
        </div>

        <div className="card">
          <h3>Completed Orders</h3>
          <h2>{completedOrders}</h2>
        </div>

      </div>

      {/* ---------- Add / Edit Form ---------- */}

      {showForm && (

        <div className="purchase-form-card">

          <h2>
            {orderToEdit
              ? "Edit Order"
              : "Add Order"}
          </h2>

          {/* ---------- Customer ---------- */}

          <div className="form-group">

            <label>
              Customer
            </label>

            {customers.length > 0 ? (

              <select
                value={customer}
                onChange={handleCustomerChange}
              >

                <option value="">
                  Select customer
                </option>

                {customers.map(
                  (customerItem) => (

                    <option
                      key={customerItem.id}
                      value={customerItem.name}
                    >
                      {customerItem.name}
                    </option>

                  )
                )}

              </select>

            ) : (

              <p>
                No customers available yet.
              </p>

            )}

            {/* Add New Customer Button */}

            <button
              type="button"
              className="add-customer-button"
              onClick={() =>
                setShowNewCustomer(!showNewCustomer)
              }
            >
              + Add New Customer
            </button>

          </div>

          {/* ---------- New Customer Form ---------- */}

          {showNewCustomer && (

            <div className="new-customer-box">

              <h3>
                Add New Customer
              </h3>

              <div className="form-group">

                <label>
                  Customer Name
                </label>

                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={newCustomerName}
                  onChange={(e) =>
                    setNewCustomerName(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Phone / WhatsApp
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={newCustomerPhone}
                  onChange={(e) =>
                    setNewCustomerPhone(e.target.value)
                  }
                />

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowNewCustomer(false);
                    setNewCustomerName("");
                    setNewCustomerPhone("");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="save-purchase-button"
                  onClick={handleAddNewCustomer}
                >
                  Save Customer
                </button>

              </div>

            </div>

          )}

          {/* ---------- Customer Phone ---------- */}

          <div className="form-group">

            <label>
              Phone / WhatsApp
            </label>

            <input
              type="tel"
              value={customerPhone}
              placeholder="Customer phone number"
              readOnly
            />

          </div>

          {/* ---------- Order Date ---------- */}

          <div className="form-group">

            <label>
              Order Date
            </label>

            <input
              type="date"
              value={orderDate}
              onChange={(e) =>
                setOrderDate(e.target.value)
              }
            />

          </div>

          {/* ---------- Items ---------- */}

          <div className="form-group">

            <label>
              Items / Description
            </label>

            <textarea
              placeholder="Enter items or order details"
              value={items}
              onChange={(e) =>
                setItems(e.target.value)
              }
              rows="3"
            />

          </div>

          {/* ---------- Order Amount ---------- */}

          <div className="form-group">

            <label>
              Order Amount
            </label>

            <input
              type="number"
              min="0"
              placeholder="Enter order amount"
              value={orderAmount}
              onChange={(e) =>
                setOrderAmount(e.target.value)
              }
            />

          </div>

          {/* ---------- Payment Status ---------- */}

          <div className="form-group">

            <label>
              Payment Status
            </label>

            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(e.target.value)
              }
            >

              <option value="">
                Select payment status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

            </select>

          </div>

          {/* ---------- Order Status ---------- */}

          <div className="form-group">

            <label>
              Order Status
            </label>

            <select
              value={orderStatus}
              onChange={(e) =>
                setOrderStatus(e.target.value)
              }
            >

              <option value="">
                Select order status
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          {/* ---------- Form Actions ---------- */}

          <div className="form-actions">

            <button
              className="cancel-button"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              className="save-purchase-button"
              onClick={
                orderToEdit
                  ? handleUpdateOrder
                  : handleAddOrder
              }
            >
              {orderToEdit
                ? "Save Changes"
                : "Add Order"}
            </button>

          </div>

        </div>

      )}

      {/* ---------- Order History ---------- */}

      <div className="purchase-history">

        <h2>Order History</h2>

        {orders.length === 0 ? (

          <p>
            No orders yet.
          </p>

        ) : (

          <table>

            <thead>

              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Items / Description</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Edited</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {orders.map(
                (order) => (

                  <tr key={order.id}>

                    <td>
                      {order.customer || "—"}
                    </td>

                    <td>
                      {order.customerPhone || "—"}
                    </td>

                    <td>
                      {order.orderDate || "—"}
                    </td>

                    <td>
                      {order.items || "—"}
                    </td>

                    <td>
                      {order.orderAmount === "" ||
                      order.orderAmount === null ||
                      order.orderAmount === undefined
                        ? "—"
                        : `${currency}${Number(
                            order.orderAmount
                          ).toFixed(2)}`}
                    </td>

                    <td>

                      {order.paymentStatus ? (

                        <span
                          className={
                            order.paymentStatus === "Paid"
                              ? "status-badge status-paid"
                              : "status-badge status-pending"
                          }
                        >
                          {order.paymentStatus}
                        </span>

                      ) : (

                        "—"

                      )}

                    </td>

                    <td>

                      {order.orderStatus ? (

                        <span
                          className={
                            order.orderStatus === "Completed"
                              ? "status-badge status-completed"
                              : "status-badge status-progress"
                          }
                        >
                          {order.orderStatus}
                        </span>

                      ) : (

                        "—"

                      )}

                    </td>

                    <td>

                      {order.edited && (
                        <span className="edited-badge">
                          ● Edited
                        </span>
                      )}

                    </td>

                    <td>

                      <button
                        className="edit-purchase-button"
                        onClick={() =>
                          handleEditClick(order)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-purchase-button"
                        onClick={() =>
                          handleDeleteClick(order)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* ---------- Delete Confirmation ---------- */}

      {showDeleteConfirm &&
        orderToDelete && (

          <div className="delete-modal-overlay">

            <div className="delete-modal">

              <div className="delete-modal-icon">
                !
              </div>

              <h2>
                Delete Order?
              </h2>

              <p>
                Are you sure you want to delete this order?
              </p>

              <div className="delete-purchase-details">

                <strong>
                  {orderToDelete.customer || "Unnamed Order"}
                </strong>

                <span>
                  {orderToDelete.orderAmount === "" ||
                  orderToDelete.orderAmount === null ||
                  orderToDelete.orderAmount === undefined
                    ? "—"
                    : `${currency}${Number(
                        orderToDelete.orderAmount
                      ).toFixed(2)}`}
                </span>

              </div>

              <div className="delete-modal-actions">

                <button
                  className="modal-cancel-button"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>

                <button
                  className="modal-delete-button"
                  onClick={handleConfirmDelete}
                >
                  Delete Order
                </button>

              </div>

            </div>

          </div>

        )}

    </main>
  );
}

export default Orders;