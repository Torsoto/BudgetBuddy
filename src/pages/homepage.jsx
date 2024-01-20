import React, { useState, useEffect, useContext } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GlobalContext } from "../context/GlobalContext";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firestore.mjs";
import "../styles/Homepage.css";

const Homepage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [outcomeData, setOutcomeData] = useState([]);
  const [outcomeCategories, setOutcomeCategories] = useState([]);
  const [incomeColors, setIncomeColors] = useState([]);
  const [outcomeColors, setOutcomeColors] = useState([]);
  const [budgetGoals, setBudgetGoals] = useState([]);
  const { incomeGraphType, outcomeGraphType } = useContext(GlobalContext);

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
          if (entryData.type === "Income") {
            incomeEntries.push({
              label: entryData.category,
              value: entryData.amount,
            });
          } else {
            outcomeEntries.push({
              label: entryData.category,
              value: entryData.amount,
            });
            uniqueOutcomeCategories.add(entryData.category);
          }
        });

        setIncomeData(incomeEntries);
        setOutcomeData(outcomeEntries);
        setOutcomeCategories(Array.from(uniqueOutcomeCategories));

        setIncomeColors(generateRandomColors(incomeEntries.length));
        setOutcomeColors(generateRandomColors(uniqueOutcomeCategories.size));
        await fetchBudgetGoals();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch budget goals from Firestore
    const fetchBudgetGoals = async () => {
      if (auth.currentUser) {
        const goalsCollection = collection(
          db,
          "users",
          auth.currentUser.uid,
          "goals"
        );
        /*
        const goalsSnapshot = await getDocs(goalsCollection);
        const goalsData = goalsSnapshot.docs.map((doc) => doc.data().goal);
        setBudgetGoals(goalsData);*/
        const goalsSnapshot = await getDocs(goalsCollection);
        const goalsData = goalsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          goal: data.goal,
          amount: data.amount // Hier holen Sie den Betrag
          };
        });
        setBudgetGoals(goalsData);
      }
    };

    fetchData();
  }, []);

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

  // Function to generate the graph based on the graph type selected in Settings
  const generateGraph = (graphType, data, backgroundColor) => {
    const datasets = [{
      label: '', // Set label to an empty string for all graph types
      data: data.map(entry => entry.value),
      backgroundColor,
    }];

    const chartData = {
      labels: data.map(entry => entry.label),
      datasets: datasets
    };

    const options = {
      // Disable the legend for Line and Bar charts
      plugins: {
        legend: graphType !== 'Doughnut' ? { display: false } : {}
      }
    };

    switch (graphType) {
      case 'Bar':
        return <Bar data={chartData} options={options} />;
      case 'Line':
        return <Line data={chartData} options={options} />;
      default:
        return <Doughnut data={chartData} options={options} />;
    }
  };

  const exportGraph = () => {
    // Assuming you have one canvas element for each graph
    const canvases = document.querySelectorAll('.chart-container canvas');

    canvases.forEach((canvas, index) => {
      if (canvas) {
        // Convert canvas to data URL
        const imageUrl = canvas.toDataURL("image/png");

        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = index === 0 ? 'income-graph.png' : 'expense-graph.png';

        // Append to the body and trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
      }
    });
  };



  return (
    <div className="homepage">
      <h1>Dashboard</h1>
      <p onClick={exportGraph} className="export-graph-p">EXPORT GRAPHS AS PNG</p>
      <div className="top-container">
        <div className="chart-container">
          {incomeData.length > 0 ? (
            <div className="income-graph">
              {generateGraph(incomeGraphType, incomeData, incomeColors)}
              <p>Income</p>
            </div>
          ) : (
            <p className="no-income-text">No income data to display.</p>
          )}

          {outcomeCategories.length > 0 ? (
            <div className="expense-graph">
              {generateGraph(outcomeGraphType, outcomeData, outcomeColors)}
              <p>Expenses</p>
            </div>
          ) : (
            <p className="no-outcome-text">No outcome data to display.</p>
          )}
        </div>
        <div className="budgetgoal-container">
          <p>Budget Goals</p>
          <ul>
            {budgetGoals.map((goal, index) => (
              <li style={{ color: "black" }} key={index}>
                {goal.goal} - {goal.amount} €
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom-container">
        <p>Hey</p>
      </div>
    </div>
  );
};

export default Homepage;
