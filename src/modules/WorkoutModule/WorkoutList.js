import React, { useContext } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const WorkoutList = ({ setEditWorkout }) => {
  const { workouts, deleteWorkout } = useContext(FitnessContext);

  if (workouts.length === 0) {
    return <p className="text-muted text-center card">No workouts added yet.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">Workout List</h3>

      <div className="grid-layout">
        {workouts.map((workout) => (
          <div key={workout.id} className="card">
            <h4 className="card-title text-primary">{workout.name}</h4>
            <div className="card-content mb-4">
              <p>Sets: <span className="font-bold">{workout.sets}</span></p>
              <p>Reps: <span className="font-bold">{workout.reps}</span></p>
            </div>

            <div className="flex-between">
              <button className="btn btn-primary" onClick={() => setEditWorkout(workout)}>
                Edit
              </button>

              <button className="btn btn-danger" onClick={() => deleteWorkout(workout.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;