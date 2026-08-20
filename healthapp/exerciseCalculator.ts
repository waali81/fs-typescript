interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const totalHours = hours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating = 1;

  if (average >= target) {
    rating = 3;
  } else if (average >= target * 0.5) {
    rating = 2;
  }

  const ratingDescription =
    rating === 3
      ? 'great'
      : rating === 2
        ? 'not too bad but could be better'
        : 'bad';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const target = Number(process.argv[2]);

  if (isNaN(target)) {
    throw new Error('Target must be a number');
  }

  const hours = process.argv.slice(3).map(Number);

  if (hours.length === 0) {
    throw new Error('No exercise hours provided');
  }

  if (hours.some(hour => isNaN(hour))) {
    throw new Error('Provided values were not numbers!');
  }

  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Something went wrong:', error.message);
  }
}