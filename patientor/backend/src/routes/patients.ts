import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = req.body;
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;