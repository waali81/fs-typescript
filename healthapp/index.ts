import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (typeof req.query.height !== 'string' || typeof req.query.weight !== 'string') {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  if (req.query.height === '' || req.query.weight === '') {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (isNaN(Number(target))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  if (daily_exercises.some((exercise: unknown) => isNaN(Number(exercise)))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});