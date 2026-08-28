/* import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientPage; */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import patientService from "../../services/patients";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Patient not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">
          {patient.name}
        </Typography>

        {patient.gender === "male" && <MaleIcon sx={{ color: "primary.main", fontSize: 30 }} />}
        {patient.gender === "female" && <FemaleIcon sx={{ color: "error.main", fontSize: 30}} />}
        {patient.gender === "other" && <TransgenderIcon sx={{ color: "text.primary", fontSize: 30}} />}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Personal informations:
          </Typography>

          <Stack spacing={1}>
            <Box>
              <Typography component="span" fontWeight="bold">
                Date of birth:{" "}
              </Typography>
              <Typography component="span">
                {patient.dateOfBirth}
              </Typography>
            </Box>

            <Box>
              <Typography component="span" fontWeight="bold">
                SSN:{" "}
              </Typography>
              <Typography component="span">
                {patient.ssn}
              </Typography>
            </Box>

            <Box>
              <Typography component="span" fontWeight="bold">
                Occupation:{" "}
              </Typography>
              <Typography component="span">
                {patient.occupation}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPage;