import React, { useState, useEffect, useContext } from "react";
import "../styles/BudgetGoals.css";
import { auth, db } from "../../firebase/firestore.mjs";
import { GlobalContext } from "../context/GlobalContext";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const BudgetGoals = () => {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [editGoalText, setEditGoalText] = useState("");
  const [editGoalAmount, setEditGoalAmount] = useState("");
  const [newGoalType, setNewGoalType] = useState("Expense");
  const [editGoalType, setEditGoalType] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("Select Category");
  const [editGoalCategory, setEditGoalCategory] = useState("");
  const { categoryColors } = useContext(GlobalContext);

  const getCategories = () => {
    // Define categories based on entry type
    if (newGoalType === "Income") {
      return ["Select Category", "Salary", "Bonus", "Other Income"];
    } else if (newGoalType === "Expense") {
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

  const checkEntriesAgainstGoal = async (goal) => {
    if (!auth.currentUser) {
      return;
    }

    const userUid = auth.currentUser.uid;
    const entriesCollection = collection(db, 'users', userUid, 'entries');
    const entriesSnapshot = await getDocs(entriesCollection);

    // Calculate the total amount for the goal's category
    const totalAmount = entriesSnapshot.docs
      .map(doc => doc.data())
      .filter(entry => entry.type === goal.type && entry.category === goal.category)
      .reduce((total, entry) => total + parseFloat(entry.amount), 0);

    // Check if total amount exceeds the goal
    if (totalAmount > parseFloat(goal.amount)) {
      const overBudget = totalAmount - parseFloat(goal.amount);
      const notificationsRef = collection(db, 'users', userUid, 'notifications');
      const newNotification = {
        message: `Total expenses in ${goal.category} exceed budget by ${overBudget.toFixed(2)} €`,
        time: new Date().toISOString()
      };
      await addDoc(notificationsRef, newNotification);
    }
  };



  const fetchData = async () => {
    if (!auth.currentUser) {
      return;
    }

    const userUid = auth.currentUser.uid;
    const goalsCollection = collection(db, "users", userUid, "goals");
    const goalsSnapshot = await getDocs(goalsCollection);

    const goalsData = goalsSnapshot.docs.map((doc) => ({
      id: doc.id,
      goal: doc.data().goal,
      amount: doc.data().amount,
      type: doc.data().type,
      category: doc.data().category,
    }));
    setBudgetGoals(goalsData);
    //console.error(goalsData)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddGoal = async () => {
    if (!auth.currentUser || newGoal === "") {
      return;
    }

    const userUid = auth.currentUser.uid;

    await addDoc(collection(db, "users", userUid, "goals"), {
      goal: newGoal,
      amount: newGoalAmount,
      type: newGoalType,
      category: newGoalCategory,
    });
    setNewGoal("");
    setNewGoalAmount("");
    setNewGoalType("Expense");
    setNewGoalCategory("Select Category");
    setShowPopup(false);
    fetchData();

    const newGoalData = {
      goal: newGoal,
      amount: newGoalAmount,
      type: newGoalType,
      category: newGoalCategory,
    };

    checkEntriesAgainstGoal(newGoalData);
  };

  const showAddGoalPopup = () => {
    setShowPopup(true);
  };

  const handleEditGoal = async (goalId) => {
    const goalToEdit = budgetGoals.find((goal) => goal.id.toString() === goalId.toString());

    setEditGoalId(goalId);
    setEditGoalText(goalToEdit ? goalToEdit.goal : "");
    setEditGoalAmount(goalToEdit ? goalToEdit.amount : "");
    setEditGoalType(goalToEdit.type || "Expense");
    setEditGoalCategory(goalToEdit.category || "Select category");

    setShowPopup(true);

    const updatedGoalData = {
      goal: goalToEdit.goal,
      amount: goalToEdit.amount,
      type: goalToEdit.type,
      category: goalToEdit.category,
    };

    checkEntriesAgainstGoal(updatedGoalData);
  };

  //edit budget goal
  const handleSaveEditGoal = async () => {
    if (!auth.currentUser || editGoalText === "") {
      return;
    }

    await updateDoc(
      doc(db, "users", auth.currentUser.uid, "goals", editGoalId),
      {
        goal: editGoalText,
        amount: editGoalAmount,
        type: editGoalType,
        category: editGoalCategory,
      }
    );

    fetchData();
    setEditGoalId(null);
    setEditGoalText("");
    setEditGoalAmount("");
    setEditGoalType("Expense");
    setEditGoalCategory("Select Category");
    setShowPopup(false);

    const updatedGoalData = {
      goal: editGoalText,
      amount: editGoalAmount,
      type: editGoalType,
      category: editGoalCategory,
    };

    checkEntriesAgainstGoal(updatedGoalData);
  };

  //delete budget goal
  const handleDeleteGoal = async (goalId) => {
    if (!auth.currentUser) {
      return;
    }

    await deleteDoc(doc(db, "users", auth.currentUser.uid, "goals", goalId));
    fetchData();
  };

  return (
    <div className="BudgetGoals">
      <div className="content">
        <h1>Budget Goals</h1>
        <div>
          <button onClick={showAddGoalPopup}>Add</button>
          {showPopup && (
            <div className="popup">
              <input
                type="text"
                placeholder="description"
                value={editGoalId ? editGoalText : newGoal}
                onChange={(e) =>
                  editGoalId
                    ? setEditGoalText(e.target.value)
                    : setNewGoal(e.target.value)
                }
              />
              <input
                type="number"
                placeholder="amount"
                value={editGoalId ? editGoalAmount : newGoalAmount}
                onChange={(e) =>
                  editGoalId
                    ? setEditGoalAmount(e.target.value)
                    : setNewGoalAmount(e.target.value)
                }
              />

              <input
                type="radio"
                id="income"
                name="goalType"
                value="Income"
                checked={
                  editGoalId
                    ? editGoalType === "Income"
                    : newGoalType === "Income"
                }
                onChange={() =>
                  editGoalId
                    ? setEditGoalType("Income")
                    : setNewGoalType("Income")
                }
              />
              <label htmlFor="income">Income</label>

              <input
                type="radio"
                id="expense"
                name="goalType"
                value="Expense"
                checked={
                  editGoalId
                    ? editGoalType === "Expense"
                    : newGoalType === "Expense"
                }
                onChange={() =>
                  editGoalId
                    ? setEditGoalType("Expense")
                    : setNewGoalType("Expense")
                }
              />
              <label htmlFor="expense">Expense</label>

              <select
                value={editGoalId ? editGoalCategory : newGoalCategory}
                onChange={(e) =>
                  editGoalId
                    ? setEditGoalCategory(e.target.value)
                    : setNewGoalCategory(e.target.value)
                }
              >
                {getCategories().map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                className="insert-button"
                onClick={editGoalId ? handleSaveEditGoal : handleAddGoal}
              >
                {editGoalId ? "Save Changes" : "Insert"}
              </button>
            </div>
          )}
          <ul className="goalsContainer">
            {budgetGoals.map((goal) => (
              <li key={goal.id}>
                <span className="goal-text">{goal.goal}</span>
                <span className="goal-amount">{goal.amount} € </span>
                <span className="goal-type">{goal.type}</span>
                <span
                  style={{ backgroundColor: categoryColors[goal.category], borderRadius: '5px' }}
                  className="goal-category"
                >
                  {goal.category}
                </span>
                <div className="edit-delete-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEditGoal(goal.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetGoals;
