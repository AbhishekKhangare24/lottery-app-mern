import { Typography, Box } from "@mui/material";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

const WinnerDisplay = ({ winner }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (winner && winner.toUpperCase() !== "TIE") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setShowConfetti(false);
    }
  }, [winner]);

  return (
    <Box mt={3} textAlign="center">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
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
          🤝 It's a TIE!
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
