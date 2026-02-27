import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [progressLogs, setProgressLogs] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);

  useEffect(() => {
    setWorkouts(JSON.parse(localStorage.getItem("workouts")) || []);
    setSchedule(JSON.parse(localStorage.getItem("schedule")) || []);
    setProgressLogs(JSON.parse(localStorage.getItem("progressLogs")) || []);
    setDietPlans(JSON.parse(localStorage.getItem("dietPlans")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("progressLogs", JSON.stringify(progressLogs));
    localStorage.setItem("dietPlans", JSON.stringify(dietPlans));
  }, [workouts, schedule, progressLogs, dietPlans]);

  const addWorkout = (workout) => {
    const newWorkout = { id: uuidv4(), ...workout };
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  const updateWorkout = (id, updatedWorkout) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id ? { ...workout, ...updatedWorkout } : workout
      )
    );
  };

  const deleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const addSchedule = (workoutId, day) => {
    const newSchedule = { id: uuidv4(), workoutId, day };
    setSchedule((prev) => [...prev, newSchedule]);
  };

  const deleteSchedule = (id) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
  };

  const addProgressLog = (log) => {
    const newLog = { id: uuidv4(), ...log };
    setProgressLogs((prev) => [...prev, newLog]);
  };

  const updateProgressLog = (id, updatedLog) => {
    setProgressLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, ...updatedLog } : log))
    );
  };

  const deleteProgressLog = (id) => {
    setProgressLogs((prev) => prev.filter((log) => log.id !== id));
  };

  return (
    <FitnessContext.Provider
      value={{
        workouts,
        schedule,
        progressLogs,
        dietPlans,
        setDietPlans,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        addSchedule,
        deleteSchedule,
        addProgressLog,
        updateProgressLog,
        deleteProgressLog,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};
