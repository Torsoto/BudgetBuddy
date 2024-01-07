import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firestore.mjs";
import "../styles/Homepage.css";

const Homepage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [outcomeData, setOutcomeData] = useState([]);
  const [outcomeCategories, setOutcomeCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user-specific entries from Firestore
        const user = auth.currentUser;
        const userEntriesCollection = collection(
          db,
          "users",
          user.uid,
          "entries"
        );
        const userEntriesQuery = query(userEntriesCollection);
        const userEntriesSnapshot = await getDocs(userEntriesQuery);

        // Process entries to separate income and outcome
        const incomeEntries = [];
        const outcomeEntries = [];
        const uniqueOutcomeCategories = new Set();

        userEntriesSnapshot.forEach((doc) => {
          const entryData = doc.data();
          if (entryData.category === "Income") {
            incomeEntries.push({
              label: entryData.party,
              value: entryData.amount,
            });
          } else {
            outcomeEntries.push(entryData.amount);
            uniqueOutcomeCategories.add(entryData.category);
          }
        });

        setIncomeData(incomeEntries);
        setOutcomeData(outcomeEntries);
        setOutcomeCategories(Array.from(uniqueOutcomeCategories));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Function to generate random colors based on the number of categories
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(randomColor);
    }
    return colors;
  };

  return (
    <div className="homepage">
      <h1>Dashboard</h1>
      <Sidebar />

      <div className="chart-container">
        {incomeData.length > 0 ? (
          <div>
            <Doughnut
              data={{
                labels: incomeData.map((entry) => entry.label),
                datasets: [
                  {
                    label: "Income Dataset",
                    data: incomeData.map((entry) => entry.value),
                    backgroundColor: generateRandomColors(incomeData.length),
                  },
                ],
              }}
            />
            <p>Income</p>
          </div>
        ) : (
          <p className="no-income-text">No income data to display.</p>
        )}

        {outcomeCategories.length > 0 ? (
          <div>
            <Doughnut
              data={{
                labels: outcomeCategories,
                datasets: [
                  {
                    label: "Outcome Dataset",
                    data: outcomeData,
                    backgroundColor: generateRandomColors(
                      outcomeCategories.length
                    ),
                  },
                ],
              }}
            />
            <p>Outcome</p>
          </div>
        ) : (
          <p className="no-outcome-text">No outcome data to display.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
