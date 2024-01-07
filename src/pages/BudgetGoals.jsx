import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/BudgetGoals.css";
import { auth, db } from "../../firebase/firestore.mjs";
import { collection, addDoc, getDocs } from "firebase/firestore";

const BudgetGoals = () => {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fetchData = async () => {
    if (!auth.currentUser) {
      return;
    }

    const userUid = auth.currentUser.uid;

    const goalsCollection = collection(db, "users", userUid, "goals");
    const goalsSnapshot = await getDocs(goalsCollection);

    const goalsData = goalsSnapshot.docs.map((doc) => doc.data().goal);
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

  return (
    <div className="BudgetGoals">
      <Sidebar></Sidebar>
      <div className="content">
        <h1>Budget Goals</h1>
        <button onClick={showAddGoalPopup}>+</button>
        {showPopup && (
          <div>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <button onClick={handleAddGoal}>Hinzufügen</button>
          </div>
        )}
        <div className="goalsContainer">
          {budgetGoals.map((goal, index) => (
            <div key={index}>{goal}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetGoals;
