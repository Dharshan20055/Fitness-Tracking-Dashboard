const calculateWeeklyCalories = (dietPlans) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const weeklyPlans = dietPlans.filter(plan => {
    const planDate = new Date(plan.date);
    return planDate >= weekAgo && planDate <= today;
  });

  const totalCalories = weeklyPlans.reduce(
    (sum, plan) => sum + plan.totalCalories,
    0
  );

  return totalCalories;
};

export default calculateWeeklyCalories;