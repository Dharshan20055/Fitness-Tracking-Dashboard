const CalculateAverageWeight = (progressLogs) => {
  if (progressLogs.length === 0) return 0;

  const totalWeight = progressLogs.reduce(
    (sum, log) => sum + log.weight,
    0
  );

  return (totalWeight / progressLogs.length).toFixed(2);
};

export default CalculateAverageWeight;