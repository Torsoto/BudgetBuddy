import React from 'react'

const EntryForm = ({ newEntry, handleAddEntry, setNewEntry, closePopup }) => {
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
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
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

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                >
                    <option value="">Select Category</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Income">Incomes</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Housing">Housing</option>
                </select>

                <button type="button" onClick={closePopup}>
                    Cancel
                </button>
                <button type="submit">Add Entry</button>
            </form>
        </div>
    );
};

export default EntryForm