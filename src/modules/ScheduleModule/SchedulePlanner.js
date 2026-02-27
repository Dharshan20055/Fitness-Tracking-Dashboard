import React, { useState, useContext } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

const SchedulePlanner = () => {
  const { workouts, schedule, addSchedule, deleteSchedule } = useContext(FitnessContext);

  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const handleAssign = (e) => {
    e.preventDefault();

    if (!selectedWorkout || !selectedDay) {
      alert("Please select workout and day");
      return;
    }

    addSchedule(selectedWorkout, selectedDay);

    setSelectedWorkout("");
    setSelectedDay("");
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">Weekly Schedule Planner</h2>

      <div className="form-container">
        <h3 className="mb-4">Assign Workout</h3>
        <form onSubmit={handleAssign}>
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

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Select Day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary w-full" style={{ width: '100%' }}>
            Assign Workout
          </button>
        </form>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Weekly Schedule</h3>

        <div className="grid-layout">
          {daysOfWeek.map((day) => {
            const dayWorkouts = schedule.filter(
              (item) => item.day === day
            );

            return (
              <div key={day} className="card">
                <h4 className="card-title text-primary border-bottom pb-2 mb-3">{day}</h4>

                {dayWorkouts.length === 0 ? (
                  <p className="text-muted text-center py-4">Rest Day</p>
                ) : (
                  <div className="list-container">
                    {dayWorkouts.map((item) => {
                      const workout = workouts.find(
                        (w) => w.id === item.workoutId
                      );

                      return (
                        <div key={item.id} className="list-item">
                          <span>{workout ? workout.name : "Deleted Workout"}</span>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteSchedule(item.id)}
                            style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                          >
                            Cancel
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SchedulePlanner;
