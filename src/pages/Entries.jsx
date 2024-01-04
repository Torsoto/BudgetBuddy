import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import "../styles/Entries.css";
//import { getFinancialEntriesFromDB } from "firebase";

function Entry({ entry }) {
  return (
    <div className="entry">
      <h4>{entry.party}</h4>
      <p>{entry.description}</p>
      <p>{entry.time}</p>
      <p>{entry.amount} €</p>
      <p></p>
      <button>Edit</button>
      <button onClick={() => testfunction(entry.id)}>Delete</button>
    </div>
  );
}

function testfunction(id){
  console.log(id)
}

function openEntryCreation() {
  // Display the overlay and modal
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}

function closePopup() {
  // Hide the overlay and modal
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
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
  const [financialEntries, setFinancialEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //const entries = getFinancialEntriesFromDB();
      const entries = [entry1, entry2, entry3];
      setFinancialEntries(entries);
    };

    fetchData();
  }, []);

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
          <h2>Entry Creation PopUp</h2>
          <p>This is the content of the popup.</p>
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
