import React, { useState, useEffect } from "react";

const EntryForm = ({
  newEntry,
  handleAddEntry,
  setNewEntry,
  closePopup,
  cardsOptions,

}) => {
  const [entryType, setEntryType] = useState("Expense");

  useEffect(() => {
    // Update entryType when newEntry.type changes
    setEntryType(newEntry.type || "Expense");
  }, [newEntry]);

  const handleEntryTypeChange = (type) => {
    setEntryType(type);
    setNewEntry({ ...newEntry, type });
  };

  const getCategories = () => {
    // Define categories based on entry type
    if (entryType === "Income") {
      return ["Select Category", "Salary", "Bonus", "Other Income"];
    } else if (entryType === "Expense") {
      return [
        "Select Category",
        "Food & Drinks",
        "Entertainment",
        "Groceries",
        "Utilities",
        "Transportation",
        "Healthcare",
        "Education",
        "Shopping",
        "Travel",
        "Housing",
        "Other Expense",
      ];
    }
  };

  const uniqueBanknames = [...new Set(cardsOptions.map(card => card.bankname))];

  return (
    <div className="modal" id="modal">
      <span className="close-btn" onClick={closePopup}>
        &times;
      </span>
      <form onSubmit={handleAddEntry}>
        <label htmlFor="party">Party:</label>
        <input
          type="text"
          id="party"
          name="party"
          value={newEntry.party}
          onChange={(e) => setNewEntry({ ...newEntry, party: e.target.value })}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={newEntry.description}
          onChange={(e) =>
            setNewEntry({ ...newEntry, description: e.target.value })
          }
        />

        <label htmlFor="time">Time:</label>
        <input
          type="datetime-local"
          id="time"
          name="time"
          value={newEntry.time}
          onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={newEntry.amount}
          onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
        />
        <label htmlFor="entryType">Entry Type:</label>
        <div>
          <input
            type="radio"
            id="income"
            name="entryType"
            value="Income"
            checked={entryType === "Income"}
            onChange={() => handleEntryTypeChange("Income")}
          />
          <label htmlFor="income">Income</label>

          <input
            type="radio"
            id="expense"
            name="entryType"
            value="Expense"
            checked={entryType === "Expense"}
            onChange={() => handleEntryTypeChange("Expense")}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={newEntry.category}
          onChange={(e) =>
            setNewEntry({ ...newEntry, category: e.target.value })
          }
        >
          {getCategories().map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="card">Bankcard (optional):</label>
        <select
          id="card"
          name="card"
          value={newEntry.bankname}
          onChange={(e) =>
            setNewEntry({ ...newEntry, bankname: e.target.value })
          }
        >
          <option value="">Select Bank</option>
          {uniqueBanknames.map((bankname) => (
            <option key={bankname} value={bankname}>
              {bankname}
            </option>
          ))}
        </select>

        <button className="entryform-cancel" type="button" onClick={closePopup}>
          Cancel
        </button>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
