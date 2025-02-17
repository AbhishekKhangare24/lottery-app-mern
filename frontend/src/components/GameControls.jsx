import { Button, Typography, Box } from "@mui/material";

const GameControls = ({
  gameStarted,
  startGame,
  restartGame,
  winner,
  cutNumbers,
}) => (
  <Box textAlign="center" mt={2}>
    {!winner ? (
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#1976d2",
          fontSize: 18,
          borderRadius: "8px",
          ":hover": { backgroundColor: "#1565c0" },
        }}
        onClick={startGame}
        disabled={gameStarted}
      >
        Start Game
      </Button>
    ) : (
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "green",
          fontSize: 18,
          borderRadius: "8px",
          ":hover": { backgroundColor: "darkgreen" },
        }}
        onClick={restartGame}
      >
        Reset
      </Button>
    )}

    {gameStarted && cutNumbers.length > 0 && (
      <Box mt={2} textAlign="center">
        <Typography variant="h5" fontWeight="medium">
          Generated Numbers:
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="red">
          {cutNumbers.join(", ")}
        </Typography>
      </Box>
    )}
  </Box>
);

export default GameControls;
