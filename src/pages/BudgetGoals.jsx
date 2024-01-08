import React, { useState, useEffect } from "react";
import "../styles/BudgetGoals.css";
import { auth, db } from "../../firebase/firestore.mjs";
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
  const [showPopup, setShowPopup] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [editGoalText, setEditGoalText] = useState("");

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
    }));
    setBudgetGoals(goalsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddGoal = async () => {
    if (!auth.currentUser || newGoal === "") {
      return;
    }

    const userUid = auth.currentUser.uid;

    await addDoc(collection(db, "users", userUid, "goals"), { goal: newGoal });
    setNewGoal("");
    setShowPopup(false);
    fetchData();
  };

  const showAddGoalPopup = () => {
    setShowPopup(true);
  };

  const handleEditGoal = (goalId) => {
    const goalToEdit = budgetGoals.find((goal) => goal.id === goalId);
    setEditGoalId(goalId);
    setEditGoalText(goalToEdit ? goalToEdit.goal : "");
    setShowPopup(true);
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
      }
    );
    setEditGoalId(null);
    setEditGoalText("");
    setShowPopup(false);
    fetchData();
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
          <button onClick={showAddGoalPopup}>Add Budget Goal +</button>
          {showPopup && (
            <div className="popup">
              <input
                type="text"
                value={editGoalId ? editGoalText : newGoal}
                onChange={(e) =>
                  editGoalId
                    ? setEditGoalText(e.target.value)
                    : setNewGoal(e.target.value)
                }
              />
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
