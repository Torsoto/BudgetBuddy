import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import "../styles/Entries.css";
//import { getFinancialEntriesFromDB } from "firebase";

function testfunction(id) {
  console.log(id);
}

function openEntryCreation() {
  // Display the overlay and modal
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

function closePopup() {
  // Hide the overlay and modal
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

const entry1 = {
  id: 1,
  party: "Wallmart",
  description: "Expense for food and drinks",
  time: "2023-01-15T18:30:00",
  amount: -50.0,
  category: "Food & Drinks",
};

const entry2 = {
  id: 2,
  party: "Microsoft",
  description: "Salary January",
  time: "2023-01-16T12:45:00",
  amount: 5000.0,
  category: "Incomes",
};

const entry3 = {
  id: 3,
  party: "PornHub",
  description: "Premium membership",
  time: "2023-01-17T09:15:00",
  amount: -15.0,
  category: "Entertainment",
};

const Entries = () => {
  
  function Entry({ entry }) {
    return (
      <div className="entry">
        <h4>{entry.party}</h4>
        <p>{entry.description}</p>
        <p>{entry.time}</p>
        <p>{entry.amount} €</p>
        <p></p>
        <button>Edit</button>
        <button onClick={() => deleteEntry(entry.id)}>Delete</button>
      </div>
    );
  }

  const [financialEntries, setFinancialEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //const entries = getFinancialEntriesFromDB();
      const entries = [entry1, entry2, entry3];
      setFinancialEntries(entries);
    };

    fetchData();
  }, []);

  function saveEntry() {
    const party = document.getElementById("party");
    const amount = document.getElementById("amount");
    const category = document.getElementById("category");
    const desc = document.getElementById("description");
    const time = document.getElementById("time");
    const newEntry = {
      id: 99,
      party: party.value,
      description: desc.value,
      time: time.value,
      amount: amount.value,
      category: category.value,
    };
    let newEntries = [];
    financialEntries.forEach((item) => {
      newEntries.push(item);
    });
    newEntries.push(newEntry);
    setFinancialEntries(newEntries);
    closePopup();
  }

  function deleteEntry(id) {
      const newList = financialEntries.filter(item => item.id != id);
      setFinancialEntries(newList)
  }

  return (
    <div className="Entries">
      <Sidebar></Sidebar>
      <div className="content">
        <h1>Entries</h1>
        <div className="overlay" id="overlay"></div>
        <div className="modal" id="modal">
          <span className="close-btn" onClick={() => closePopup()}>
            &times;
          </span>
          <h2>New Income/Expense</h2>
          <div className="input-container">
            <label for="party">Party:</label>
            <input type="text" id="party" name="party" required />
          </div>
          <div className="input-container">
            <label form="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>
          <div className="input-container">
            <label for="party">Category:</label>
            <select id="category" name="category">
              <option value="volvo">Food & Croceries</option>
              <option value="saab">Energy</option>
              <option value="fiat">Leisure & Entertainment</option>
              <option value="audi">Shopping</option>
            </select>
          </div>
          <p>Optional:</p>
          <div className="input-container">
            <label for="description">Description:</label>
            <input type="text" id="description" name="description" />
          </div>
          <div className="input-container">
            <label for="time">Time:</label>
            <input type="datetime-local" id="time" name="time" />
          </div>
          <div className="input-container">
            <button type="button" onClick={() => saveEntry()}>
              Save
            </button>
            <button type="button" onClick={() => closePopup()}>
              Cancel
            </button>
          </div>
        </div>
        <button onClick={() => openEntryCreation()}>Add Entry</button>
        <div className="entry-container">
          <ul>
            {financialEntries.map((entry, index) => (
              <li key={index}>
                <Entry entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Entries;
