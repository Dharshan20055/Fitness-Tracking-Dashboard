import React, { useState, useContext } from "react";
import { FitnessContext } from "../../context/FitnessContext";

const DietForm = () => {
  const { dietPlans, setDietPlans } = useContext(FitnessContext);

  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddMeal = (e) => {
    e.preventDefault();

    if (!date || !foodItem || !calories) {
      alert("Please fill all fields");
      return;
    }

    const newMeal = {
      mealType,
      foodItem,
      calories: Number(calories),
    };

    const existingPlan = dietPlans.find((plan) => plan.date === date);

    if (existingPlan) {
      const updatedPlans = dietPlans.map((plan) => {
        if (plan.date === date) {
          const updatedMeals = [...plan.meals, newMeal];

          const totalCalories = updatedMeals.reduce(
            (sum, meal) => sum + meal.calories,
            0
          );

          return {
            ...plan,
            meals: updatedMeals,
            totalCalories,
          };
        }
        return plan;
      });

      setDietPlans(updatedPlans);
    } else {
      const newPlan = {
        id: Date.now(),
        date,
        meals: [newMeal],
        totalCalories: newMeal.calories,
      };

      setDietPlans((prev) => [...prev, newPlan]);
    }

    setFoodItem("");
    setCalories("");
  };

  return (
    <div>
      <h3>Add Diet Entry</h3>

      <form onSubmit={handleAddMeal}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>

        <input
          type="text"
          placeholder="Food Item"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
};

export default DietForm;