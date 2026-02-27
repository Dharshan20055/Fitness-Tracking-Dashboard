import React, { useContext } from "react";
import { FitnessContext } from "../context/FitnessContext";
import "./Dashboard.css";
import calculateWeeklyWorkouts from "../utils/CalculateWeeklyWorkouts";
import calculateAverageWeight from "../utils/CalculateAverageWeight";
import calculateWeeklyCalories from "../utils/calculateWeeklyCalories";

import fitnessImage from "../assets/fitness.jpg";

const Dashboard = () => {
  const { workouts, progressLogs, dietPlans } =
    useContext(FitnessContext);

  const totalWorkouts = workouts.length;
  const totalLogs = progressLogs.length;
  const weeklyWorkouts = calculateWeeklyWorkouts(progressLogs);
  const avgWeight = calculateAverageWeight(progressLogs);
  const weeklyCalories = calculateWeeklyCalories(dietPlans);

  return (
    <div className="container">
      <div className="hero-section card">
        <img
          src={fitnessImage}
          alt="Fitness Tracker"
          className="hero-image"
        />

        <div className="hero-content">
          <h2 className="text-primary">Fitness Tracking Dashboard</h2>
          <p>
            This project is a complete fitness management system built using React.
            It allows users to create workout plans, schedule exercises,
            track progress, manage diet plans, and analyze statistics
            through interactive charts.
          </p>
          <p>
            The application uses Context API for global state management
            and localStorage for data persistence, making it fully
            functional without backend integration.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Dashboard Summary</h3>

        <div className="grid-layout">
          <div className="card text-center">
            <h4 className="text-muted">Total Workouts</h4>
            <h2 className="text-primary">{totalWorkouts}</h2>
          </div>

          <div className="card text-center">
            <h4 className="text-muted">Total Progress Logs</h4>
            <h2 className="text-primary">{totalLogs}</h2>
          </div>

          <div className="card text-center">
            <h4 className="text-muted">Weekly Workouts</h4>
            <h2 className="text-primary">{weeklyWorkouts}</h2>
          </div>

          <div className="card text-center">
            <h4 className="text-muted">Average Weight</h4>
            <h2 className="text-primary">{avgWeight} <small>kg</small></h2>
          </div>

          <div className="card text-center">
            <h4 className="text-muted">Weekly Calories</h4>
            <h2 className="text-primary">{weeklyCalories} <small>kcal</small></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
