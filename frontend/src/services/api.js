import axios from "axios";

const API_URL = "http://localhost:5000";

export const startGameAPI = async (user1Grid, user2Grid) => {
  const res = await axios.post(`${API_URL}/start-game`, {
    user1Grid,
    user2Grid,
  });
  return res.data;
};

export const cutNumberAPI = async (gameId, number) => {
  await axios.post(`${API_URL}/cut-number`, { gameId, number });
};
