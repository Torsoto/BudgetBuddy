import React, { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm"
import EntriesTable from "../components/EntriesTable";
import { auth, db } from '../../firebase/firestore.mjs';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { CSVLink, CSVDownload } from "react-csv";
import "../styles/Entries.css";

const Entries = () => {
  const [financialEntries, setFinancialEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    party: "",
    description: "",
    time: "",
    amount: "",
    type: "",
    category: "",
  });
  const [editingEntryIndex, setEditingEntryIndex] = useState(null);

  const fetchData = async () => {
    if (!auth.currentUser) {
      // User not authenticated, handle this case as needed
      return;
    }

    const userUid = auth.currentUser.uid;

    const entriesCollection = collection(db, 'users', userUid, 'entries');
    const entriesSnapshot = await getDocs(entriesCollection);

    const entriesData = entriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFinancialEntries(entriesData);
  };

  useEffect(() => {
    fetchData();
  }, [editingEntryIndex]);

  const handleAddEntry = async (e) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        // User not authenticated, handle this case as needed
        return;
      }

      const userUid = auth.currentUser.uid;

      if (editingEntryIndex !== null) {
        // If editing an entry, update the existing entry in Firestore
        const entryId = financialEntries[editingEntryIndex]?.id;

        if (!entryId) {
          console.error("No entry ID found for editing.");
          return;
        }

        console.log("Updating entry with ID:", entryId);

        const entryRef = doc(db, 'users', userUid, 'entries', entryId);
        await updateDoc(entryRef, { ...newEntry, type: financialEntries[editingEntryIndex].type });
        setEditingEntryIndex(null);
      } else {
        // If adding a new entry, add it to the user's entries in Firestore
        console.log("Adding a new entry:", newEntry);

        const entryRef = await addDoc(collection(db, 'users', userUid, 'entries'), {
          ...newEntry,
          type: newEntry.type || "Expense",
        });

        setFinancialEntries((prevEntries) => [...prevEntries, { ...newEntry, id: entryRef.id }]);
      }

      // Clear the form and close the modal
      setNewEntry({
        party: "",
        description: "",
        time: "",
        amount: "",
        type: "",
        category: "",
      });

      // Fetch updated data from Firestore
      await fetchData();

      closePopup();
    } catch (error) {
      console.error("Error adding/editing entry:", error);
    }
  };

  const deleteEntry = async (id) => {
    if (!auth.currentUser) {
      // User not authenticated, handle this case as needed
      return;
    }

    const userUid = auth.currentUser.uid;

    // Find the index of the entry with the given id
    const entryIndex = financialEntries.findIndex((entry) => entry.id === id);

    // If the entry is found, remove it from the user's entries in Firestore and the array
    if (entryIndex !== -1) {
      const entryRef = doc(db, 'users', userUid, 'entries', id);
      await deleteDoc(entryRef);

      const updatedEntries = [...financialEntries];
      updatedEntries.splice(entryIndex, 1);
      setFinancialEntries(updatedEntries);
    }

    // Optionally, you can also close the popup here if needed
    closePopup();
  };

  const totalIncome = financialEntries
    .filter((entry) => entry.type === "Income")
    .reduce((total, entry) => total + parseFloat(entry.amount), 0);

  const totalExpenses = financialEntries
    .filter((entry) => entry.type === "Expense")
    .reduce((total, entry) => total + parseFloat(entry.amount), 0);

  const handleEditEntry = async (index) => {
    // Set the form fields with the data of the entry being edited
    const entryToEdit = financialEntries[index];
    setNewEntry({
      ...entryToEdit,
      type: entryToEdit.type, // Set a default type if not provided
      category: entryToEdit.category, // Add default category handling
    });

    console.log("Editing entry:", entryToEdit)

    setEditingEntryIndex(index);

    // Wait for fetchData to complete before opening the entry creation
    await fetchData();

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
  /*
  const headers = [
    { label: "Party", key: "party" },
    { label: "Description", key: "description" },
    { label: "Time", key: "time" },
    { label: "Amount", key: "amount" },
    { label: "Type", key: "type" },
    { label: "Category", key: "category" },
  ];
  */

  // CSV data
  const csvData = financialEntries.map(entry => ({
    party: entry.party,
    description: entry.description,
    time: entry.time,
    amount: entry.amount,
    type: entry.type,
    category: entry.category,
  }));

  const currentDate = new Date().toDateString();

  return (
    <div className="Entries">
      <h1>Entries</h1>
      <div className="content">
        <div className="overlay" id="overlay"></div>
        <EntryForm
          newEntry={newEntry}
          handleAddEntry={handleAddEntry}
          setNewEntry={setNewEntry}
          closePopup={closePopup}
        />
        <button onClick={openEntryCreation}>Add Entry</button>
        <CSVLink filename={"Financial-Entries," + currentDate} className="csv-link" data={csvData}>EXPORT CSV</CSVLink>;
        {financialEntries.length > 0 ? (
          <div className="entry-container">
            <EntriesTable
              financialEntries={financialEntries}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              handleEditEntry={handleEditEntry}
              deleteEntry={deleteEntry}
            />
          </div>
        ) : (
          <p>No entries to display.</p>
        )}
      </div>
    </div>
  );
};

export default Entries;
