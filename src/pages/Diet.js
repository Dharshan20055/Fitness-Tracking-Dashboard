import React from "react";
import DietForm from "../modules/DietModule/DietForm";
import MealList from "../modules/DietModule/MealList";

const Diet = () => {
  return (
    <div>
      <h2>Diet Management</h2>
      <DietForm />
      <MealList />
    </div>
  );
};

export default Diet;