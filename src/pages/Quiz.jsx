import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../utils/api";
import Timer from "../components/Timer";

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(parseInt(localStorage.getItem("currentIndex")) || 0);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem("answers") || "[]"));
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      const q = await fetchQuestions();
      setQuestions(q);
      if (!localStorage.getItem("questions")) {
        localStorage.setItem("questions", JSON.stringify(q));
      }
    };
    if (!localStorage.getItem("questions")) loadQuestions();
    else setQuestions(JSON.parse(localStorage.getItem("questions")));
  }, []);

  const handleAnswer = () => {
    const correctAnswer = questions[current].correct_answer;
    const isCorrect = selected === correctAnswer;
    const newAnswers = [...answers, { question: questions[current].question, selected, isCorrect }];
    const nextIndex = current + 1;

    setAnswers(newAnswers);
    setCurrent(nextIndex);
    setSelected("");

    localStorage.setItem("answers", JSON.stringify(newAnswers));
    localStorage.setItem("currentIndex", nextIndex);

    if (nextIndex >= questions.length) {
      navigate("/result");
    }
  };

  const handleTimeUp = () => {
    navigate("/result");
  };

  if (questions.length === 0) return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #5C258D, #4389A2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      Loading....
    </Box>
  )

  const q = questions[current];
  const options = [...q.incorrect_answers, q.correct_answer].sort();

  function decodeHTMLEntities(text) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #5C258D, #4389A2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Stack spacing={3}>
          <Timer initialTime={60} onTimeUp={handleTimeUp} />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Soal {current + 1} dari {questions.length}
          </Typography>
          <Typography color="#5C258D" variant="body1" dangerouslySetInnerHTML={{ __html: q.question }} />
          <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
            {options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio color="primary" />}
                label={decodeHTMLEntities(opt)}
                sx={{
                  backgroundColor: selected === opt ? "#e3f2fd" : "transparent",
                  borderRadius: 2,
                  pl: 1,
                  mb: 1,
                  "& .MuiFormControlLabel-label": {
                    color: "primary.main"
                  },
                }}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            onClick={handleAnswer}
            disabled={!selected}
            sx={{
              backgroundColor: "#6a11cb",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#5015b8",
              },
            }}
          >
            Lanjut
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
