import React, { useState } from "react";
import { registerUser } from "../api/api";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(username, phone);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Пользователь зарегистрирован!");
    } else {
      alert("Ошибка регистрации: " + JSON.stringify(data));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Регистрация</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
