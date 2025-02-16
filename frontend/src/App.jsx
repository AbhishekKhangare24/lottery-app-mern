import { Box, Stack, Typography } from "@mui/material";
import { useGameLogic } from "./hooks/useGameLogic";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import WinnerDisplay from "./components/WinnerDisplay";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {
    user1Grid,
    user2Grid,
    handleInputChange,
    cutNumbers,
    gameStarted,
    startGame,
    restartGame,
    winner,
  } = useGameLogic();

  return (
    <Box textAlign="center" p={4} bgcolor="#f4f6f8" minHeight="100vh">
      <Toaster position="top-center" />
      <Typography variant="h4" fontWeight="bold" color="#333" mb={3}>
        Lottery Game
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={5}
        justifyContent="center"
        mb={4}
      >
        <GameBoard
          name="User 1"
          grid={user1Grid}
          handleInputChange={handleInputChange}
          gameStarted={gameStarted}
          cutNumbers={cutNumbers}
        />
        <GameBoard
          name="User 2"
          grid={user2Grid}
          handleInputChange={handleInputChange}
          gameStarted={gameStarted}
          cutNumbers={cutNumbers}
        />
      </Stack>
      <GameControls
        gameStarted={gameStarted}
        startGame={startGame}
        restartGame={restartGame}
        winner={winner}
        cutNumbers={cutNumbers}
      />
      {winner && <WinnerDisplay winner={winner} />}
    </Box>
  );
};

export default App;
