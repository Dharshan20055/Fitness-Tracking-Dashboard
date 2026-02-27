import React, { useContext } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const MealList = () => {
  const { dietPlans } = useContext(FitnessContext);

  if (dietPlans.length === 0) {
    return <p className="text-muted text-center card">No diet entries yet.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">Diet History</h3>

      <div className="grid-layout">
        {dietPlans.map((plan) => (
          <div key={plan.id} className="card">
            <h4 className="card-title text-primary">Date: {plan.date}</h4>

            <div className="list-container mb-4">
              {plan.meals.map((meal, index) => (
                <div key={index} className="list-item">
                  <span>{meal.mealType} - {meal.foodItem}</span>
                  <span className="font-bold">{meal.calories} kcal</span>
                </div>
              ))}
            </div>

            <div className="text-right font-bold mt-4" style={{ textAlign: 'right' }}>
              Total: <span className="text-primary">{plan.totalCalories} kcal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;