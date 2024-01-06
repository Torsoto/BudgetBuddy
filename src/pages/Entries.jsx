import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Entries.css";

const Entries = () => {
  const [financialEntries, setFinancialEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    party: "",
    description: "",
    time: "",
    amount: "",
    category: "",
  });
  const [editingEntryIndex, setEditingEntryIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch entries from the database or API
      // const entries = await getFinancialEntriesFromDB();
      const entries = [];
      setFinancialEntries(entries);
    };

    fetchData();
  }, []);

  const handleAddEntry = (e) => {
    e.preventDefault();

    /*if (!newEntry.party || !newEntry.time || !newEntry.amount) {
      alert("Please fill in all fields.");
      return;
    }
    */

    if (editingEntryIndex !== null) {
      // If editing an entry, update the existing entry
      const updatedEntries = [...financialEntries];
      updatedEntries[editingEntryIndex] = newEntry;
      setFinancialEntries(updatedEntries);
      setEditingEntryIndex(null);
    } else {
      // If adding a new entry, add it to the list
      setFinancialEntries((prevEntries) => [...prevEntries, newEntry]);
    }

    // Clear the form and close the modal
    setNewEntry({
      party: "",
      description: "",
      time: "",
      amount: "",
      category: "", // Set default category
    });
    closePopup();
  };

  const deleteEntry = (id) => {
    // Find the index of the entry with the given id
    const entryIndex = financialEntries.findIndex((entry) => entry.id === id);

    // If the entry is found, remove it from the array
    if (entryIndex !== -1) {
      const updatedEntries = [...financialEntries];
      updatedEntries.splice(entryIndex, 1);
      setFinancialEntries(updatedEntries);
    }

    // Optionally, you can also close the popup here if needed
    closePopup();
  };

  const handleEditEntry = (index) => {
    // Set the form fields with the data of the entry being edited
    const entryToEdit = financialEntries[index];
    setNewEntry(entryToEdit);
    setEditingEntryIndex(index);
    openEntryCreation();
  };



  const openEntryCreation = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
  };

  const closePopup = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
  };

  return (
    <div className="Entries">
      <Sidebar />
      <h1>Entries</h1>
      <div className="content">
        <div className="overlay" id="overlay"></div>
        <div className="modal" id="modal">
          <span className="close-btn" onClick={closePopup}>
            &times;
          </span>
          <form onSubmit={handleAddEntry}>
            <label htmlFor="party">Party:</label>
            <input type="text" id="party" name="party" value={newEntry.party} onChange={(e) => setNewEntry({ ...newEntry, party: e.target.value })} />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={newEntry.description} onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })} />

            <label htmlFor="time">Time:</label>
            <input type="datetime-local" id="time" name="time" value={newEntry.time} onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })} />

            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" value={newEntry.amount} onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })} />

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={newEntry.category} onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Incomes">Incomes</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Housing">Housing</option>
              {/* Add more categories as needed */}
            </select>

            <button type="button" onClick={closePopup}>
              Cancel
            </button>
            <button type="submit">Add Entry</button>
          </form>
        </div>

        <button onClick={openEntryCreation}>Add Entry</button>
        <div className="entry-container">
          <table>
            <thead>
              <tr>
                <th>Party</th>
                <th>Description</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {financialEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.party}</td>
                  <td>{entry.description}</td>
                  <td>{entry.time}</td>
                  <td>{entry.amount} €</td>
                  <td>{entry.category}</td>
                  <td>
                    <button onClick={() => handleEditEntry(index)}>Edit</button>
                    <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Entries;
