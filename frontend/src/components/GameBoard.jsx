import { TextField, Typography, Box, Card, CardContent } from "@mui/material";

const GameBoard = ({
  name,
  grid,
  handleInputChange,
  gameStarted,
  cutNumbers,
}) => {
  return (
    <Card sx={{ width: { xs: "100%", sm: 250 }, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="#1976d2">
          {name}
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} mt={2}>
          {grid.map((num, index) => (
            <TextField
              key={index}
              value={num}
              onChange={(e) =>
                handleInputChange(
                  index,
                  e.target.value,
                  name.toLowerCase().replace(" ", "")
                )
              }
              disabled={gameStarted}
              autoComplete="off"
              sx={{
                width: 60,
                height: 63,
                textAlign: "center",
                position: "relative",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#333",
                },
                ...(cutNumbers.includes(num) && {
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    width: "90%",
                    height: "2px",
                    backgroundColor: "rgba(255, 0, 0, 0.6)",
                    top: "50%",
                    left: "5%",
                    filter: "blur(0.5px)",
                  },
                  "&::before": {
                    transform: "rotate(45deg)",
                  },
                  "&::after": {
                    transform: "rotate(-45deg)",
                  },
                }),
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GameBoard;
