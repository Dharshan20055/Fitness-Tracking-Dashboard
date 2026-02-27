import React, { useState, useContext, useEffect } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const ProgressLogger = () => {
  const {
    workouts,
    progressLogs,
    addProgressLog,
    updateProgressLog,
    deleteProgressLog,
  } = useContext(FitnessContext);

  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [editLog, setEditLog] = useState(null);

  useEffect(() => {
    if (editLog) {
      setSelectedWorkout(editLog.workoutId);
      setWeight(editLog.weight);
      setReps(editLog.reps);
    }
  }, [editLog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedWorkout || !weight || !reps) {
      alert("Please fill all fields");
      return;
    }

    const logData = {
      workoutId: selectedWorkout,
      weight: Number(weight),
      reps: Number(reps),
      date: new Date().toISOString().split("T")[0],
    };

    if (editLog) {
      updateProgressLog(editLog.id, logData);
    } else {
      addProgressLog(logData);
    }

    setSelectedWorkout("");
    setWeight("");
    setReps("");
    setEditLog(null);
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">Progress Logger</h2>

      <div className="form-container">
        <h3 className="mb-4">Log Progress</h3>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedWorkout}
            onChange={(e) => setSelectedWorkout(e.target.value)}
          >
            <option value="">Select Workout</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Reps Completed"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>
            {editLog ? "Update Log" : "Save Log"}
          </button>
        </form>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Progress History</h3>

        {progressLogs.length === 0 ? (
          <p className="text-muted text-center card">No progress logs yet.</p>
        ) : (
          <div className="grid-layout">
            {progressLogs.map((log) => {
              const workout = workouts.find(
                (w) => w.id === log.workoutId
              );

              return (
                <div key={log.id} className="card">
                  <h4 className="card-title text-primary">
                    {workout ? workout.name : "Deleted Workout"}
                  </h4>
                  <div className="card-content mb-4">
                    <p>Date: <span className="font-bold">{log.date}</span></p>
                    <p>Weight: <span className="font-bold">{log.weight} kg</span></p>
                    <p>Reps: <span className="font-bold">{log.reps}</span></p>
                  </div>

                  <div className="flex-between">
                    <button className="btn btn-primary" onClick={() => setEditLog(log)}>
                      Edit
                    </button>

                    <button className="btn btn-danger" onClick={() => deleteProgressLog(log.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressLogger;
