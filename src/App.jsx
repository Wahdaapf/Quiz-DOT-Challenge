import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/quiz" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/quiz" element={isLoggedIn ? <Quiz /> : <Navigate to="/" />} />
        <Route path="/result" element={isLoggedIn ? <Result onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
