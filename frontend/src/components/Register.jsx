import React, { useState } from "react";
import { registerUser } from "../api/api";

function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !phoneNumber) return alert("Enter username and phone number!");
    const data = await registerUser(username, phoneNumber);
    console.log("Registration response:", data);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("User registered! Token saved.");
    } else {
      alert("Registration error: " + JSON.stringify(data));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-3 w-80"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="border p-2 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
