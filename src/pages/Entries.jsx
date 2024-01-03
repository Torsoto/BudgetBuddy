import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import '../styles/Entries.css';
//import { getFinancialEntriesFromDB } from "firebase";

function Entry({entry}) {
  return (
    <div className="entry">
      <h4>{entry.party}</h4>
      <p>{entry.description}</p>
      <p>{entry.time}</p>
      <p>{entry.amount} €</p>
    </div>
  );
}

const entry1 = {
  party: "Wallmart",
  description: "Expense for food and drinks",
  time: "2023-01-15T18:30:00",
  amount: 50.0,
};

const entry2 = {
  party: "Taco Bell",
  description: "Shopping for groceries",
  time: "2023-01-16T12:45:00",
  amount: 30.0,
};

const entry3 = {
  party: "XNXX",
  description: "Gas bill payment",
  time: "2023-01-17T09:15:00",
  amount: 40.0,
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
