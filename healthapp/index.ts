import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});