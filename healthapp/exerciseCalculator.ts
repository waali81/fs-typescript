interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
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

    let ratingDescription = '';

    if (rating === 3) {
    ratingDescription = 'great';
    } else if (rating === 2) {
    ratingDescription = 'not too bad but could be better';
    } else {
    ratingDescription = 'bad';
    }

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));