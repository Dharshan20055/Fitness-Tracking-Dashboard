import React, { useState } from "react";
import WorkoutForm from "../modules/WorkoutModule/WorkoutForm";
import WorkoutList from "../modules/WorkoutModule/WorkoutList";

const Workouts = () => {
  const [editWorkout, setEditWorkout] = useState(null);

  return (
    <div>
      <h2>Workout Management</h2>

      <WorkoutForm
        editWorkout={editWorkout}
        setEditWorkout={setEditWorkout}
      />

      <WorkoutList setEditWorkout={setEditWorkout} />
    </div>
  );
};

export default Workouts;