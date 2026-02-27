import React, { useState, useContext, useEffect } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const WorkoutForm = ({ editWorkout, setEditWorkout }) => {
  const { addWorkout, updateWorkout } = useContext(FitnessContext);

  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  useEffect(() => {
    if (editWorkout) {
      setName(editWorkout.name);
      setSets(editWorkout.sets);
      setReps(editWorkout.reps);
    }
  }, [editWorkout]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !sets || !reps) {
      alert("Please fill all fields");
      return;
    }

    const workoutData = {
      name,
      sets,
      reps,
    };

    if (editWorkout) {
      updateWorkout(editWorkout.id, workoutData);
    } else {
      addWorkout(workoutData);
    }

    setName("");
    setSets("");
    setReps("");
    setEditWorkout(null);
  };

  return (
    <div className="form-container">
      <h3 className="mb-4">{editWorkout ? "Edit Workout" : "Add Workout"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {editWorkout ? "Update Workout" : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;