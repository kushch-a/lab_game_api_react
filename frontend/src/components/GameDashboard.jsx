import React, { useEffect, useState } from "react";
import { getUserByToken, playGame, gameHistory, renewToken, deactivateToken } from "../api/api";

export default function GameDashboard({ token, setToken }) {
  const [user, setUser] = useState(null);
  const [lastGame, setLastGame] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const u = await getUserByToken(token);
      setUser(u);
    }
    fetchUser();
  }, [token]);

  const handlePlay = async () => {
    const game = await playGame(token);
    setLastGame(game);
  };

  const handleHistory = async () => {
    const h = await gameHistory(token);
    setHistory(h);
  };

  const handleRenew = async () => {
    const res = await renewToken(token);
    if (res.token) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      alert("Токен обновлен!");
    } else {
      alert("Ошибка обновления токена");
    }
  };

  const handleDeactivate = async () => {
    await deactivateToken(token);
    localStorage.removeItem("token");
    setToken(null);
    alert("Токен деактивирован!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Привет, {user?.username || "игрок"}!</h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePlay}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Играть
          </button>

          <button
            onClick={handleHistory}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            История игр
          </button>

          <button
            onClick={handleRenew}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all"
          >
            Обновить токен
          </button>

          <button
            onClick={handleDeactivate}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
          >
            Деактивировать токен
          </button>
        </div>

        {lastGame && (
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <p><strong>Случайное число:</strong> {lastGame.random_number}</p>
            <p><strong>Результат:</strong> {lastGame.result}</p>
            <p><strong>Выигрыш:</strong> {lastGame.prize}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <h3 className="font-semibold mb-2">Последние игры:</h3>
            <ul className="space-y-1">
              {history.map((g, i) => (
                <li key={i} className="border p-2 rounded-md">
                  Число: {g.random_number} | Результат: {g.result} | Выигрыш: {g.prize}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
