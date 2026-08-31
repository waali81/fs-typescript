import { Box, Stack, Typography } from "@mui/material";
import { Entry } from "../../types";
import HealthCheckRating from "../HealthCheckRating";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Stack spacing={1}>
          <Box>
            <Typography component="span" fontWeight="bold">
              Discharged:{" "}
            </Typography>
            <Typography component="span">
              {entry.discharge.date}
            </Typography>
          </Box>

          <Box>
            <Typography component="span" fontWeight="bold">
              Discharge criteria:{" "}
            </Typography>
            <Typography component="span">
              {entry.discharge.criteria}
            </Typography>
          </Box>

          <Box>
            <Typography component="span" fontWeight="bold">
              Specialist:{" "}
            </Typography>
            <Typography component="span">
              {entry.specialist}
            </Typography>
          </Box>
        </Stack>
      );

    case "OccupationalHealthcare":
      return (
        <Stack spacing={1}>
          <Box>
            <Typography component="span" fontWeight="bold">
              Employer:{" "}
            </Typography>
            <Typography component="span">
              {entry.employerName}
            </Typography>
          </Box>

          {entry.sickLeave && (
            <Box>
              <Typography component="span" fontWeight="bold">
                Sick leave:{" "}
              </Typography>
              <Typography component="span">
                {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography component="span" fontWeight="bold">
              Specialist:{" "}
            </Typography>
            <Typography component="span">
              {entry.specialist}
            </Typography>
          </Box>
        </Stack>
      );

    case "HealthCheck":
        return (
            <Stack spacing={1}>
            <Box>
                <HealthCheckRating rating={entry.healthCheckRating} />
            </Box>

            <Box>
                <Typography component="span" fontWeight="bold">
                Specialist:{" "}
                </Typography>
                <Typography component="span">
                {entry.specialist}
                </Typography>
            </Box>
            </Stack>
        );

/*     case "HealthCheck":
      return (
        <Stack spacing={1}>
          <Box>
            <Typography component="span" fontWeight="bold">
              Health check rating:{" "}
            </Typography>
            <Typography component="span">
              {entry.healthCheckRating}
            </Typography>
          </Box>

          <Box>
            <Typography component="span" fontWeight="bold">
              Specialist:{" "}
            </Typography>
            <Typography component="span">
              {entry.specialist}
            </Typography>
          </Box>
        </Stack>
      ); */

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;