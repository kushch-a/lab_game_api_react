const API_URL = "/api"; // через Vite proxy или backend с CORS

export async function registerUser(username, phone_number) {
    const res = await fetch(`${API_URL}/user/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phone_number }),
    });
    return await res.json();
  }
  
  export async function getUserByToken(token) {
    const res = await fetch(`${API_URL}/game/${token}/`);
    return await res.json();
  }
  
  export async function playGame(token) {
    const res = await fetch(`${API_URL}/game/${token}/play`, { method: "POST" });
    return await res.json();
  }
  
  export async function gameHistory(token) {
    const res = await fetch(`${API_URL}/game/${token}/history`);
    return await res.json();
  }
  
  export async function renewToken(token) {
    const res = await fetch(`${API_URL}/game/${token}/renew`, { method: "POST" });
    return await res.json();
  }
  
  export async function deactivateToken(token) {
    const res = await fetch(`${API_URL}/game/${token}/deactivate`, { method: "POST" });
    return await res.json();
  }