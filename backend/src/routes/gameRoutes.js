import express from "express";
import { startGame, cutNumber } from "../controllers/gameController.js";

const router = express.Router();

router.post("/start-game", startGame);
router.post("/cut-number", cutNumber);

export default router;
