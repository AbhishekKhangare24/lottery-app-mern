import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  user1Grid: { type: [Number], required: true },
  user2Grid: { type: [Number], required: true },
  cutNumbers: { type: [Number], default: [] },
  winner: { type: String, default: null },
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
