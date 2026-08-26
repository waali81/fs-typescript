import express from 'express';
import errorMiddleware from './middleware.ts';
import diagnosisRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patients.ts';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});