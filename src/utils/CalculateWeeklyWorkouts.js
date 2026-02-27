
const CalculateWeeklyWorkouts = (progressLogs) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const weeklyLogs = progressLogs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= weekAgo && logDate <= today;
  });

  return weeklyLogs.length;
};

export default CalculateWeeklyWorkouts;