import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import patientService from "../../services/patients";
import { Patient, Diagnosis, EntryWithoutId } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails";
import AddEntryForm from "../AddEntryForm";
import entryService from "../../services/entries";

interface Props {
  diagnoses: Diagnosis[];
}


const PatientPage = ({diagnoses}: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>();

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

  const handleAddEntry = async (values: EntryWithoutId) => {
    if (!id) {
      return;
    }

    try {
      await entryService.create(id, values);
      
      const updatedPatient = await patientService.getOne(id);
      setPatient(updatedPatient);

      setShowAddEntryForm(false);
      setError(undefined);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const validationErrors = error.response?.data?.error;

        if (validationErrors && validationErrors.length > 0) {
          const firstError = validationErrors[0];

          setError(
            `${firstError.path.join(".")}: ${firstError.message}`
          );
        } else {
          setError("Adding entry failed");
        }
      } else {
        setError("Adding entry failed");
      }
    }
  };

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
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
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
      
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 4, mb: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Entries
        </Typography>

        {!showAddEntryForm && (
          <Button
            variant="contained"
            onClick={() => setShowAddEntryForm(true)}
          >
            Add New Entry
          </Button>
        )}
      </Stack>

      {showAddEntryForm && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <AddEntryForm
              diagnoses={diagnoses}
              onSubmit={handleAddEntry}
              onCancel={() => setShowAddEntryForm(false)}
              error={error}
            />
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        {patient.entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent>
              <Typography fontWeight="bold" variant="subtitle1">
                {entry.date}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography fontWeight="bold">
                  Description:
                </Typography>

                <Typography sx={{ mt: 0.5 }}>
                  {entry.description}
                </Typography>
              </Box>
              
              {entry.diagnosisCodes && (
                <Box sx={{ mt: 1 }}>
                  <Typography fontWeight="bold">
                    Diagnosis codes:
                  </Typography>

                  <Box component="ul" sx={{ mt: 0.5, mb: 0, pl: 5 }}>
                    {entry.diagnosisCodes.map((code) => {
                      const diagnosis = diagnoses.find(d => d.code === code);

                      return (
                        <li key={code}>
                          <Typography component="span">
                            {code} {diagnosis ? `- ${diagnosis.name}` : ""}
                          </Typography>
                        </li>
                      );
                    })}
                  </Box>
                </Box>
              )}
              <EntryDetails entry={entry} />

            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default PatientPage;