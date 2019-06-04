function getDateString(date) {
  const cleanDate = date.slice(0, 7);
  return new Date(cleanDate).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric'
  });
}

function getOneRepMax(weight, reps) {
  return Number((weight * (36 / (37 - reps))).toFixed(2));
}

export const buildChartData = (data) => {
  // this might be better used during initial api requests
  // we can also speed this up...
  let monthToMonthData = data.reduce((acc, curr, idx) => {
    const date = getDateString(curr.performed_at);
    acc[date] = acc[date] || [];
    acc[date].push(curr);
    return acc;
  }, []);

  return Object.values(monthToMonthData).map((exercise, idx) => {
    const { exercise_id, totalReps, totalWeight, date, name } = exercise.reduce(
      (acc, curr, idx, arr) => {
        const { performed_at: date, exercise_id } = curr;
        return {
          totalReps: acc.totalReps ? acc.totalReps + curr.reps : curr.reps,
          totalWeight: acc.totalWeight
            ? acc.totalWeight + curr.weight
            : curr.weight,
          date: getDateString(date),
          exercise_id,
          name
        };
      }
    );

    return {
      exercise_id,
      date,
      weight: getOneRepMax(
        totalWeight / exercise.length,
        totalReps / exercise.length
      )
    };
  });
};
