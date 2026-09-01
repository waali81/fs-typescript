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
} from "@mui/material";

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [entryType, setEntryType] = useState("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value);
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
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map(code => code.trim())
            .filter(code => code.length > 0),
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
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map(code => code.trim())
            .filter(code => code.length > 0),
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
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map(code => code.trim())
            .filter(code => code.length > 0),
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
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
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
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />

            <TextField
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        );
      case "HealthCheck":
        return (
          <TextField
            label="Health check rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
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
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
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

        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          placeholder="S62.5, Z57.1"
        />

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