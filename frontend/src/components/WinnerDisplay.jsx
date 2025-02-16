import { Typography, Box } from "@mui/material";

const WinnerDisplay = ({ winner }) => {
  return (
    <Box mt={3} textAlign="center">
      {winner.toUpperCase() === "TIE" ? (
        <Typography
          variant="h5"
          fontWeight="bold"
          color="green"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          🤝 It's TIE!
        </Typography>
      ) : (
        <Typography
          variant="h5"
          fontWeight="bold"
          color="green"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          🎉 {winner.toUpperCase()} WINS!
        </Typography>
      )}
    </Box>
  );
};

export default WinnerDisplay;
