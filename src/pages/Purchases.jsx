import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/currency";

function Purchases() {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [purchaseToDelete, setPurchaseToDelete] = useState(null);
  const [purchaseToEdit, setPurchaseToEdit] = useState(null);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [itemBought, setItemBought] = useState("");
  const [cost, setCost] = useState("");

  const [purchases, setPurchases] = useState(() => {
    const savedPurchases =
      localStorage.getItem("rihaniPurchases");

    return savedPurchases
      ? JSON.parse(savedPurchases)
      : [];
  });

  // ---------- Save Purchases ----------

  useEffect(() => {
    localStorage.setItem(
      "rihaniPurchases",
      JSON.stringify(purchases)
    );
  }, [purchases]);

  // ---------- Add Purchase ----------

  const handleAddPurchase = () => {
    if (!purchaseDate || !itemBought || !cost) {
      alert("Please fill in all three fields.");
      return;
    }

    const newPurchase = {
      id: Date.now(),
      date: purchaseDate,
      item: itemBought,
      cost: Number(cost),
      edited: false,
    };

    setPurchases([
      ...purchases,
      newPurchase,
    ]);

    setPurchaseDate("");
    setItemBought("");
    setCost("");

    setShowForm(false);
  };

  // ---------- Edit Purchase ----------

  const handleEditClick = (purchase) => {
    setPurchaseToEdit(purchase);

    setPurchaseDate(purchase.date);
    setItemBought(purchase.item);
    setCost(purchase.cost);

    setShowForm(true);
  };

  // ---------- Update Purchase ----------

  const handleUpdatePurchase = () => {
    if (!purchaseDate || !itemBought || !cost) {
      alert("Please fill in all three fields.");
      return;
    }

    const updatedPurchases = purchases.map(
      (purchase) =>
        purchase.id === purchaseToEdit.id
          ? {
              ...purchase,
              date: purchaseDate,
              item: itemBought,
              cost: Number(cost),
              edited: true,
            }
          : purchase
    );

    setPurchases(updatedPurchases);

    setPurchaseToEdit(null);
    setPurchaseDate("");
    setItemBought("");
    setCost("");

    setShowForm(false);
  };

  // ---------- Cancel Form ----------

  const handleCancelForm = () => {
    setShowForm(false);
    setPurchaseToEdit(null);

    setPurchaseDate("");
    setItemBought("");
    setCost("");
  };

  // ---------- Delete Purchase ----------

  const handleDeleteClick = (purchase) => {
    setPurchaseToDelete(purchase);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!purchaseToDelete) {
      return;
    }

    const updatedPurchases =
      purchases.filter(
        (purchase) =>
          purchase.id !== purchaseToDelete.id
      );

    setPurchases(updatedPurchases);

    setPurchaseToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setPurchaseToDelete(null);
    setShowDeleteConfirm(false);
  };

  // ---------- Total Investment ----------

  const totalInvestment = purchases.reduce(
    (total, purchase) =>
      total + Number(purchase.cost || 0),
    0
  );

  return (
    <main className="purchases-page">

      {/* ---------- Header ---------- */}

      <div className="page-header">

        <div>
          <h1>Purchases</h1>

          <p>
            Track everything you spend on purchases.
          </p>
        </div>

        <button
          className="add-purchase-button"
          onClick={() => {
            setPurchaseToEdit(null);
            setPurchaseDate("");
            setItemBought("");
            setCost("");
            setShowForm(true);
          }}
        >
          + Add Purchase
        </button>

      </div>

      {/* ---------- Add / Edit Form ---------- */}

      {showForm && (

        <div className="purchase-form-card">

          <h2>
            {purchaseToEdit
              ? "Edit Purchase"
              : "Add Purchase"}
          </h2>

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              value={purchaseDate}
              onChange={(e) =>
                setPurchaseDate(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Item Bought
            </label>

            <input
              type="text"
              placeholder="Enter item bought"
              value={itemBought}
              onChange={(e) =>
                setItemBought(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Cost
            </label>

            <input
              type="number"
              min="0"
              placeholder="Enter cost"
              value={cost}
              onChange={(e) =>
                setCost(e.target.value)
              }
            />

          </div>

          <div className="form-actions">

            <button
              className="cancel-button"
              onClick={handleCancelForm}
            >
              Cancel
            </button>

            <button
              className="save-purchase-button"
              onClick={
                purchaseToEdit
                  ? handleUpdatePurchase
                  : handleAddPurchase
              }
            >
              {purchaseToEdit
                ? "Save Changes"
                : "Add Purchase"}
            </button>

          </div>

        </div>

      )}

      {/* ---------- Investment Summary ---------- */}

      <div className="investment-card">

        <p>
          Total Investment
        </p>

        <h2>
          {formatCurrency(totalInvestment)}
        </h2>

        <span>
          Total spent on purchases
        </span>

      </div>

      {/* ---------- Purchase History ---------- */}

      <div className="purchase-history">

        <h2>
          Purchase History
        </h2>

        <table>

          <thead>

            <tr>

              <th>
                Date
              </th>

              <th>
                Item Bought
              </th>

              <th>
                Cost
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.length === 0 ? (

              <tr>

                <td colSpan="5">
                  No purchases yet
                </td>

              </tr>

            ) : (

              purchases.map(
                (purchase) => (

                  <tr
                    key={purchase.id}
                  >

                    <td>
                      {purchase.date}
                    </td>

                    <td>
                      {purchase.item}
                    </td>

                    <td>
                      {formatCurrency(
                        Number(
                          purchase.cost || 0
                        )
                      )}
                    </td>

                    <td>

                      {purchase.edited && (

                        <span className="edited-badge">
                          ● Edited
                        </span>

                      )}

                    </td>

                    <td>

                      <button
                        className="edit-purchase-button"
                        onClick={() =>
                          handleEditClick(
                            purchase
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-purchase-button"
                        onClick={() =>
                          handleDeleteClick(
                            purchase
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* ---------- Delete Confirmation ---------- */}

      {showDeleteConfirm &&
        purchaseToDelete && (

          <div className="delete-modal-overlay">

            <div className="delete-modal">

              <div className="delete-modal-icon">
                !
              </div>

              <h2>
                Delete Purchase?
              </h2>

              <p>
                Are you sure you want
                to delete this purchase?
              </p>

              <div className="delete-purchase-details">

                <strong>
                  {purchaseToDelete.item}
                </strong>

                <span>
                  {formatCurrency(
                    Number(
                      purchaseToDelete.cost || 0
                    )
                  )}
                </span>

              </div>

              <div className="delete-modal-actions">

                <button
                  className="modal-cancel-button"
                  onClick={
                    handleCancelDelete
                  }
                >
                  Cancel
                </button>

                <button
                  className="modal-delete-button"
                  onClick={
                    handleConfirmDelete
                  }
                >
                  Delete Purchase
                </button>

              </div>

            </div>

          </div>

        )}

    </main>
  );
}

export default Purchases;