import React, { useContext } from "react";
import { FitnessContext } from "../context/FitnessContext";
import calculateWeeklyWorkouts from "../utils/CalculateWeeklyWorkouts";
import calculateAverageWeight from "../utils/CalculateAverageWeight";
import calculateWeeklyCalories from "../utils/calculateWeeklyCalories";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const Statistics = () => {
  const { progressLogs, dietPlans } = useContext(FitnessContext);

  const weeklyWorkouts = calculateWeeklyWorkouts(progressLogs);
  const avgWeight = calculateAverageWeight(progressLogs);
  const weeklyCalories = calculateWeeklyCalories(dietPlans);

  const weightChartData = progressLogs.map((log) => ({
    date: log.date,
    weight: log.weight,
  }));

  const workoutCountByDate = progressLogs.reduce((acc, log) => {
    const existing = acc.find((item) => item.date === log.date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date: log.date, count: 1 });
    }
    return acc;
  }, []);

  const calorieChartData = dietPlans.map((plan) => ({
    name: plan.date,
    calories: plan.totalCalories || 0,
  }));

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">Statistics Dashboard</h2>

      <div className="grid-layout mb-4">
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

      <div className="grid-layout">
        <div className="card">
          <h3 className="card-title">Weight Progress</h3>
          {progressLogs.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted text-center py-4">No progress data available.</p>
          )}
        </div>

        <div className="card">
          <h3 className="card-title">Workout Frequency</h3>
          {progressLogs.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutCountByDate}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted text-center py-4">No workout frequency data available.</p>
          )}
        </div>

        <div className="card">
          <h3 className="card-title">Calorie Distribution</h3>
          {dietPlans.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={calorieChartData}
                  dataKey="calories"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {calorieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted text-center py-4">No diet data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
