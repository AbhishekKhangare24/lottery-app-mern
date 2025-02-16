import Game from "../models/gameModel.js";

// Start a new game
export const startGame = async (req, res) => {
  const { user1Grid, user2Grid } = req.body;
  const newGame = new Game({ user1Grid, user2Grid });
  await newGame.save();
  res.json({ gameId: newGame._id });
};

// Get unique number for cutting
const getUniqueNumber = (cutNumbers) => {
  const availableNumbers = Array.from({ length: 9 }, (_, i) => i + 1).filter(
    (num) => !cutNumbers.includes(num)
  );
  return availableNumbers.length
    ? availableNumbers[Math.floor(Math.random() * availableNumbers.length)]
    : null;
};

// Cut a number and check winner
export const cutNumber = async (req, res) => {
  const { gameId } = req.body;
  const game = await Game.findById(gameId);

  if (!game || game.winner)
    return res
      .status(400)
      .json({ message: "Invalid game or winner already decided" });

  const number = getUniqueNumber(game.cutNumbers);
  if (number === null) return res.json({ message: "All numbers used" });

  game.cutNumbers.push(number);
  await game.save();
  global.io.emit("numberGenerated", { number });

  // Check winning conditions
  const checkWin = (grid) =>
    [0, 1, 2].some((row) =>
      [0, 1, 2].every((col) => game.cutNumbers.includes(grid[row * 3 + col]))
    ) ||
    [0, 1, 2].some((col) =>
      [0, 1, 2].every((row) => game.cutNumbers.includes(grid[row * 3 + col]))
    );

  const user1Win = checkWin(game.user1Grid);
  const user2Win = checkWin(game.user2Grid);

  if (user1Win && user2Win) {
    game.winner = "tie";
  } else if (user1Win) {
    game.winner = "user1";
  } else if (user2Win) {
    game.winner = "user2";
  }

  if (game.winner) {
    await game.save();
    global.io.emit("gameOver", { winner: game.winner });
  }

  res.json({ message: "Number cut", cutNumbers: game.cutNumbers });
};
