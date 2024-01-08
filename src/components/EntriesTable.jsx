import React from "react";

const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString(); // Adjust the format as needed
    return formattedTime;
};

const EntriesTable = ({ financialEntries, totalIncome, totalExpenses, handleEditEntry, deleteEntry }) => {
    console.log("Financial Entries:", financialEntries);
    return (
        <div className="entry-container">
            <div className="Balance-text">
                <p>Total Income: {totalIncome.toFixed(2)} €</p>
                <p>Total Expenses: {totalExpenses.toFixed(2)} €</p>
                <p>Balance: {(totalIncome - totalExpenses).toFixed(2)} €</p>
            </div>
            <table className="entries-table">
                <thead>
                    <tr>
                        <th>Party</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {financialEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.party}</td>
                            <td className="description-column">{entry.description}</td>
                            <td>{formatTime(entry.time)}</td>
                            <td>{entry.amount} €</td>
                            <td>{entry.type}</td>
                            <td>{entry.category}</td>
                            <td>
                                <button className="edit-button-table" onClick={() => handleEditEntry(index)}>Edit</button>
                                <button className="delete-button-table" onClick={() => deleteEntry(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntriesTable;
