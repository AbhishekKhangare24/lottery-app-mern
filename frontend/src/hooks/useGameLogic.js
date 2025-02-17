import { useState, useEffect } from "react";
import io from "socket.io-client";
import { startGameAPI, cutNumberAPI } from "../services/api";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_APP_SOCKET_URL);

export const useGameLogic = () => {
  const [user1Grid, setUser1Grid] = useState(Array(9).fill(""));
  const [user2Grid, setUser2Grid] = useState(Array(9).fill(""));
  const [cutNumbers, setCutNumbers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null);

  const handleInputChange = (index, value, user) => {
    if (value === "") {
      user === "user1"
        ? setUser1Grid((prev) => ((prev[index] = ""), [...prev]))
        : setUser2Grid((prev) => ((prev[index] = ""), [...prev]));
      return;
    }

    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 9) return;
    if (user === "user1" && user1Grid.includes(num)) {
      toast.error(`Number ${num} already exists in User 1's grid!`);
      return;
    }
    if (user === "user2" && user2Grid.includes(num)) {
      toast.error(`Number ${num} already exists in User 2's grid!`);
      return;
    }

    user === "user1"
      ? setUser1Grid((prev) => ((prev[index] = num), [...prev]))
      : setUser2Grid((prev) => ((prev[index] = num), [...prev]));
  };

  const startGame = async () => {
    if (new Set(user1Grid).size !== 9 || new Set(user2Grid).size !== 9) {
      toast.error("Fill all fields with unique numbers!");
      return;
    }
    try {
      const res = await startGameAPI(user1Grid, user2Grid);
      setGameId(res.gameId);
      setGameStarted(true);
      toast.success("Game started! Picking numbers...");
    } catch {
      toast.error("Error starting game!");
    }
  };

  const restartGame = () => {
    setUser1Grid(Array(9).fill(""));
    setUser2Grid(Array(9).fill(""));
    setCutNumbers([]);
    setWinner(null);
    setGameStarted(false);
    setGameId(null);
    toast.success("Game reset! Set new grids to start again.");
  };

  useEffect(() => {
    if (!gameStarted || winner || cutNumbers.length >= 9) return;
    const interval = setInterval(async () => {
      if (winner || cutNumbers.length >= 9) return;
      const randomNum = Math.floor(Math.random() * 9) + 1;
      await cutNumberAPI(gameId, randomNum);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameStarted, winner, cutNumbers, gameId]);

  useEffect(() => {
    socket.on("numberGenerated", ({ number }) => {
      setCutNumbers((prev) => [...prev, number]);
      toast.info(`Number ${number} drawn!`);
    });

    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
      if (winner.toUpperCase() === "TIE") {
        return toast.success(`It's TIE!`);
      } else {
        return toast.success(`${winner.toUpperCase()} WINS!`);
      }
    });

    return () => {
      socket.off("numberGenerated");
      socket.off("gameOver");
    };
  }, []);

  return {
    user1Grid,
    user2Grid,
    handleInputChange,
    cutNumbers,
    gameStarted,
    startGame,
    restartGame,
    winner,
  };
};
