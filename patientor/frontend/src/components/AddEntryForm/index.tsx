import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  Alert,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";

import { Diagnosis, EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, error, diagnoses }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value);
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    const value = event.target.value;

    setDiagnosisCodes(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (entryType) {
      case "Hospital":
        onSubmit({
          date,
          description,
          specialist,
          type: "Hospital",
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;

      case "OccupationalHealthcare":
        onSubmit({
          date,
          description,
          specialist,
          type: "OccupationalHealthcare",
          diagnosisCodes,
          employerName,
          ...(sickLeaveStartDate && sickLeaveEndDate
            ? {
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                },
              }
            : {}),
        });
        break;

      case "HealthCheck":
        onSubmit({
          date,
          description,
          specialist,
          type: "HealthCheck",
          diagnosisCodes,
          healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
        });
        break;

      default:
        throw new Error(`Unhandled entry type: ${entryType}`);
    }
  };

  const renderEntrySpecialFields = () => {
    switch (entryType) {
      case "Hospital":
        return (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        );

      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </>
        );
      case "HealthCheck":
        return (
          <>
            <InputLabel>Health check rating</InputLabel>

            <Select
              fullWidth
              value={healthCheckRating}
              onChange={(event) => setHealthCheckRating(event.target.value)}
            >
              <MenuItem value="0">0 - Healthy</MenuItem>
              <MenuItem value="1">1 - Low risk</MenuItem>
              <MenuItem value="2">2 - High risk</MenuItem>
              <MenuItem value="3">3 - Critical risk</MenuItem>
            </Select>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        {error && <Alert severity="error">{error}</Alert>}
        <InputLabel>
          Entry type:
        </InputLabel>

        <Select
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>

        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel>Diagnosis Codes</InputLabel>

        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        {renderEntrySpecialFields()}

        <Grid
          container
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>

          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;