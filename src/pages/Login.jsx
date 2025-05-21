import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name) {
      localStorage.setItem("user", name);
      onLogin();
      navigate("/quiz");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #5C258D, #4389A2)",
      }}
    >
      <Stack
        sx={{
          bgcolor: "#ffffffdd",
          padding: 4,
          width: { xs: "90%", sm: "400px" },
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#333" }}>
          Welcome!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
          Please enter your name to start the quiz
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          color="#5C258D"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.3s ease",
              backgroundColor: "#fff",
              color: "#5C258D",
              "&:hover fieldset": {
                borderColor: "#5C258D",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5C258D",
                borderWidth: "2px",
              },
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#5C258D",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#3b1865",
            },
          }}
        >
          Start Quiz
        </Button>
      </Stack>
    </Box>
  );
}
