import { Favorite } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

interface Props {
  rating: 0 | 1 | 2 | 3;
}

const HealthCheckRating = ({ rating }: Props) => {
  const colors = [
    "success.main",
    "warning.main",
    "warning.dark",
    "error.main",
  ];

  const labels = [
    "Healthy",
    "Low risk",
    "High risk",
    "Critical risk",
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Favorite
        sx={{
          color: colors[rating],
          fontSize: 28,
        }}
      />

      <Typography>
        {labels[rating]}
      </Typography>
    </Stack>
  );
};

export default HealthCheckRating;