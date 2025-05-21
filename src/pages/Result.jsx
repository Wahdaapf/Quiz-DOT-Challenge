import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Result({ onLogout }) {
  const navigate = useNavigate();
  const answers = JSON.parse(localStorage.getItem("answers") || "[]");
  const correct = answers.filter((a) => a.isCorrect).length;
  const wrong = answers.length - correct;

  const handleRestart = () => {
    localStorage.clear();
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #5C258D, #4389A2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="#1f1c2c">
          🎉 Hasil Kuis
        </Typography>

        <Stack spacing={1.5}>
          <Typography variant="body1" color="primary" fontSize="1.1rem">
            <strong>Total Soal Dikerjakan:</strong> {answers.length}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" color="green">
            <strong>Benar:</strong> {correct}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" color="red">
            <strong>Salah:</strong> {wrong}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          onClick={handleRestart}
          sx={{
            backgroundColor: "#5C258D",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            transition: "background-color 0.3s ease",
            mt: 2,
            "&:hover": {
              backgroundColor: "#3b1865",
            },
          }}
        >
          Kembali ke Login
        </Button>
      </Paper>
    </Box>
  );
}
