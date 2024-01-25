import React, { useState, useEffect, useContext } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { GlobalContext } from "../context/GlobalContext";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
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
  const [notifications, setNotifications] = useState([
    "Notification 1: ",
    "Notification 2: ",
    "Notification 3: ",
    "Notification 4: ",
    "Notification 5: "
  ]);

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString(); // Adjust the format as needed
    return formattedTime;
  };

  // Fetch notifications from Firestore
  const fetchNotifications = async () => {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const notificationsRef = collection(db, "users", userUid, "notifications");
      const querySnapshot = await getDocs(query(notificationsRef, orderBy("time", "desc"), limit(5)));
      const fetchedNotifications = querySnapshot.docs.map(doc => doc.data().message + " | " + formatTime(doc.data().time));
      setNotifications(fetchedNotifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
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
        const incomeByCategory = {};
        const outcomeByCategory = {};
        const uniqueOutcomeCategories = new Set();

        userEntriesSnapshot.forEach((doc) => {
          const entryData = doc.data();
          const amount = parseFloat(entryData.amount);
          if (entryData.type === "Income") {
            incomeByCategory[entryData.category] = (incomeByCategory[entryData.category] || 0) + amount;
          } else {
            outcomeByCategory[entryData.category] = (outcomeByCategory[entryData.category] || 0) + amount;
            uniqueOutcomeCategories.add(entryData.category);
          }
        });

        // Convert the accumulated data into the array format for the chart
        const incomeEntries = Object.keys(incomeByCategory).map((category) => ({
          label: category,
          value: incomeByCategory[category],
        }));

        const outcomeEntries = Object.keys(outcomeByCategory).map((category) => ({
          label: category,
          value: outcomeByCategory[category],
        }));

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
            amount: data.amount,
            category: data.category
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
          <h3>Budget Goals</h3>
          <ul>
            {budgetGoals.map((goal, index) => (
              <li style={{ color: "black" }} key={index}>
                {goal.category} - {goal.amount} €
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom-container">
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
