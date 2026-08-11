import { useEffect, useState } from "react";

function Settings() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [currency, setCurrency] = useState("₹");

  const [savedMessage, setSavedMessage] = useState("");

  // ---------- Customers ----------

  const [customers, setCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // ---------- Load Settings & Customers ----------

  useEffect(() => {
    // ---------- Load Settings ----------

    const savedSettings =
      localStorage.getItem("rihaniSettings");

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);

        setBusinessName(settings.businessName || "");
        setPhone(settings.phone || "");
        setInstagram(settings.instagram || "");
        setCurrency(settings.currency || "₹");
      } catch (error) {
        console.error(
          "Unable to load settings.",
          error
        );
      }
    }

    // ---------- Load Customers ----------

    const savedCustomers =
      localStorage.getItem("rihaniCustomers");

    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (error) {
        console.error(
          "Unable to load customers.",
          error
        );

        setCustomers([]);
      }
    }
  }, []);

  // ---------- Save Settings ----------

  const handleSaveSettings = () => {
    const settings = {
      businessName: businessName.trim(),
      phone: phone.trim(),
      instagram: instagram.trim(),
      currency,
    };

    localStorage.setItem(
      "rihaniSettings",
      JSON.stringify(settings)
    );

    setSavedMessage(
      "Settings saved successfully."
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  // ---------- Delete Customer ----------

  const handleDeleteCustomer = (customer) => {
    setCustomerToDelete(customer);
  };

  // ---------- Cancel Customer Delete ----------

  const handleCancelCustomerDelete = () => {
    setCustomerToDelete(null);
  };

  // ---------- Confirm Customer Delete ----------

  const handleConfirmCustomerDelete = () => {
    if (!customerToDelete) {
      return;
    }

    const updatedCustomers = customers.filter(
      (customer) =>
        customer.id !== customerToDelete.id
    );

    localStorage.setItem(
      "rihaniCustomers",
      JSON.stringify(updatedCustomers)
    );

    setCustomers(updatedCustomers);

    setCustomerToDelete(null);

    alert(
      `Customer "${customerToDelete.name}" has been deleted.`
    );
  };

  // ---------- Backup ----------

  const handleBackup = () => {
    try {
      const backupData = {
        appName: "Rihani Business Manager",
        version: 1,
        createdAt: new Date().toISOString(),

        settings: JSON.parse(
          localStorage.getItem(
            "rihaniSettings"
          ) || "{}"
        ),

        purchases: JSON.parse(
          localStorage.getItem(
            "rihaniPurchases"
          ) || "[]"
        ),

        orders: JSON.parse(
          localStorage.getItem(
            "rihaniOrders"
          ) || "[]"
        ),

        customers: JSON.parse(
          localStorage.getItem(
            "rihaniCustomers"
          ) || "[]"
        ),
      };

      const dataString = JSON.stringify(
        backupData,
        null,
        2
      );

      const blob = new Blob(
        [dataString],
        {
          type: "application/json",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `rihani-creations-backup-${new Date()
          .toISOString()
          .slice(0, 10)}.json`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      alert(
        "Backup downloaded successfully."
      );
    } catch (error) {
      console.error(
        "Backup failed:",
        error
      );

      alert(
        "Unable to create the backup."
      );
    }
  };

  // ---------- Restore ----------

  const handleRestore = (event) => {
    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = (e) => {
      try {
        const backupData =
          JSON.parse(
            e.target.result
          );

        // ---------- Validate Backup ----------

        if (
          !backupData ||
          backupData.appName !==
            "Rihani Business Manager" ||
          backupData.version !== 1 ||
          !Array.isArray(
            backupData.purchases
          ) ||
          !Array.isArray(
            backupData.orders
          ) ||
          !Array.isArray(
            backupData.customers
          ) ||
          typeof backupData.settings !==
            "object"
        ) {
          alert(
            "This does not appear to be a valid Rihani Business Manager backup file."
          );

          event.target.value = "";

          return;
        }

        // ---------- Confirmation ----------

        const confirmed =
          window.confirm(
            "Restoring this backup will replace your current purchases, orders, customers and settings. Continue?"
          );

        if (!confirmed) {
          event.target.value = "";

          return;
        }

        // ---------- Restore Purchases ----------

        localStorage.setItem(
          "rihaniPurchases",
          JSON.stringify(
            backupData.purchases
          )
        );

        // ---------- Restore Orders ----------

        localStorage.setItem(
          "rihaniOrders",
          JSON.stringify(
            backupData.orders
          )
        );

        // ---------- Restore Customers ----------

        localStorage.setItem(
          "rihaniCustomers",
          JSON.stringify(
            backupData.customers
          )
        );

        // ---------- Restore Settings ----------

        localStorage.setItem(
          "rihaniSettings",
          JSON.stringify(
            backupData.settings
          )
        );

        alert(
          "Backup restored successfully. The application will now refresh."
        );

        window.location.reload();
      } catch (error) {
        console.error(
          "Restore failed:",
          error
        );

        alert(
          "Unable to read this backup file. Please select a valid Rihani Business Manager backup."
        );
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  // ---------- Clear All Data ----------

  const handleClearAllData = () => {
    const firstConfirmation =
      window.confirm(
        "WARNING: This will permanently remove all purchases, orders, customers and settings from this browser. Are you sure?"
      );

    if (!firstConfirmation) {
      return;
    }

    const secondConfirmation =
      window.confirm(
        "This is the final confirmation. Delete ALL business data?"
      );

    if (!secondConfirmation) {
      return;
    }

    localStorage.removeItem(
      "rihaniPurchases"
    );

    localStorage.removeItem(
      "rihaniOrders"
    );

    localStorage.removeItem(
      "rihaniCustomers"
    );

    localStorage.removeItem(
      "rihaniSettings"
    );

    alert(
      "All application data has been cleared."
    );

    window.location.reload();
  };

  return (
    <main className="settings-page">

      {/* ---------- Header ---------- */}

      <div className="page-header">

        <div>

          <h1>Settings</h1>

          <p>
            Manage your business information
            and application data.
          </p>

        </div>

      </div>

      {/* ---------- Business Information ---------- */}

      <section className="settings-section">

        <div className="settings-section-header">

          <h2>
            Business Information
          </h2>

          <p>
            These details are stored locally
            on this device.
          </p>

        </div>

        <div className="settings-form">

          <div className="settings-form-group">

            <label>
              Business Name
            </label>

            <input
              type="text"
              placeholder="Rihani Creations"
              value={businessName}
              onChange={(e) =>
                setBusinessName(
                  e.target.value
                )
              }
            />

          </div>

          <div className="settings-form-group">

            <label>
              Business Phone
            </label>

            <input
              type="tel"
              placeholder="Enter business phone"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

          </div>

          <div className="settings-form-group">

            <label>
              Instagram
            </label>

            <input
              type="text"
              placeholder="@rihanicreations"
              value={instagram}
              onChange={(e) =>
                setInstagram(
                  e.target.value
                )
              }
            />

          </div>

          <div className="settings-form-group">

            <label>
              Currency
            </label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(
                  e.target.value
                )
              }
            >

              <option value="₹">
                ₹ - Indian Rupee
              </option>

              <option value="$">
                $ - US Dollar
              </option>

              <option value="€">
                € - Euro
              </option>

              <option value="£">
                £ - British Pound
              </option>

            </select>

          </div>

        </div>

        <div className="settings-save-area">

          <button
            className="save-settings-button"
            onClick={
              handleSaveSettings
            }
          >
            Save Settings
          </button>

          {savedMessage && (

            <span className="settings-success">
              ✓ {savedMessage}
            </span>

          )}

        </div>

      </section>

      {/* ---------- Customer Management ---------- */}

      <section className="settings-section">

        <div className="settings-section-header">

          <h2>
            Customer Management
          </h2>

          <p>
            Remove customers that you no longer
            want to keep in your customer list.
          </p>

        </div>

        {customers.length === 0 ? (

          <div className="customer-management-empty">

            <p>
              No customers have been added yet.
            </p>

          </div>

        ) : (

          <div className="customer-management-list">

            {customers.map(
              (customer) => (

                <div
                  className="customer-management-item"
                  key={customer.id}
                >

                  <div className="customer-management-info">

                    <strong>
                      {customer.name}
                    </strong>

                    <span>
                      {customer.phone || "No phone number"}
                    </span>

                  </div>

                  <button
                    type="button"
                    className="customer-delete-button"
                    onClick={() =>
                      handleDeleteCustomer(
                        customer
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* ---------- Backup ---------- */}

      <section className="settings-section">

        <div className="settings-section-header">

          <h2>
            Backup & Restore
          </h2>

          <p>
            Keep a backup of your business
            data so you can restore it if
            needed.
          </p>

        </div>

        <div className="backup-actions">

          <div className="backup-card">

            <h3>
              Backup Data
            </h3>

            <p>
              Download your purchases,
              orders, customers and
              settings as a backup file.
            </p>

            <button
              className="backup-button"
              onClick={handleBackup}
            >
              ↓ Download Backup
            </button>

          </div>

          <div className="backup-card">

            <h3>
              Restore Data
            </h3>

            <p>
              Restore your business data
              from a previous backup file.
            </p>

            <label className="restore-button">

              ↑ Restore Backup

              <input
                type="file"
                accept=".json"
                onChange={
                  handleRestore
                }
                hidden
              />

            </label>

          </div>

        </div>

      </section>

      {/* ---------- Danger Zone ---------- */}

      <section className="settings-section danger-zone">

        <div className="settings-section-header">

          <h2>
            Danger Zone
          </h2>

          <p>
            These actions can permanently
            affect your business data.
          </p>

        </div>

        <div className="danger-card">

          <div>

            <h3>
              Clear All Application Data
            </h3>

            <p>
              Permanently delete all
              purchases, orders, customers
              and settings from this browser.
            </p>

          </div>

          <button
            className="clear-data-button"
            onClick={
              handleClearAllData
            }
          >
            Clear All Data
          </button>

        </div>

      </section>

      {/* ---------- Delete Customer Confirmation ---------- */}

      {customerToDelete && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              !
            </div>

            <h2>
              Delete Customer?
            </h2>

            <p>
              Are you sure you want to delete
              this customer from your customer list?
            </p>

            <div className="delete-purchase-details">

              <strong>
                {customerToDelete.name}
              </strong>

              <span>
                {customerToDelete.phone ||
                  "No phone"}
              </span>

            </div>

            <p className="customer-delete-note">
              Existing orders belonging to this
              customer will NOT be deleted.
            </p>

            <div className="delete-modal-actions">

              <button
                className="modal-cancel-button"
                onClick={
                  handleCancelCustomerDelete
                }
              >
                Cancel
              </button>

              <button
                className="modal-delete-button"
                onClick={
                  handleConfirmCustomerDelete
                }
              >
                Delete Customer
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Settings;