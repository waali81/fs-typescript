import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, Alert } from "@mui/material";

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

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      date,
      description,
      specialist,
      type: "HealthCheck",
      healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
      diagnosisCodes: diagnosisCodes
        .split(",")
        .map(code => code.trim())
        .filter(code => code.length > 0),
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        {error && <Alert severity="error">{error}</Alert>}
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

        <TextField
          label="Health check rating (0-3)"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

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