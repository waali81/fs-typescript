import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = req.body;
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;