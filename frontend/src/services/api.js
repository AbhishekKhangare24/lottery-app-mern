import axios from "axios";

export const startGameAPI = async (user1Grid, user2Grid) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/start-game`, {
    user1Grid,
    user2Grid,
  });
  return res.data;
};

export const cutNumberAPI = async (gameId, number) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/cut-number`, {
    gameId,
    number,
  });
};
