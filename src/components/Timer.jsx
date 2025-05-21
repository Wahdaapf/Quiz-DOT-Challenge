// src/components/Timer.jsx
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Timer({ initialTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return parseInt(localStorage.getItem("timeLeft")) || initialTime;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        localStorage.setItem("timeLeft", prev - 1);
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Typography color="primary" variant="h6">
      Waktu Tersisa: {minutes}:{seconds.toString().padStart(2, "0")}
    </Typography>
  );
}
