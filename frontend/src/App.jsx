import React, { useState } from "react";
import Register from "./components/Register";
import GameDashboard from "./components/GameDashboard";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return token ? <GameDashboard token={token} setToken={setToken} /> : <Register setToken={setToken} />;
}
