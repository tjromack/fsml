"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function HomePage() {
  const [health, setHealth] = useState("…");
  const [x, setX] = useState("2");
  const [y, setY] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((r) => r.json())
      .then((j) => setHealth(j.status ?? "unknown"))
      .catch(() => setHealth("error"));
  }, []);

  async function predict() {
    setY("…");
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: Number(x) }),
      });
      const data = await res.json();
      setY(String(data.y));
    } catch {
      setY("error");
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">fsml web</h1>

      <div>
        API health: <span className="font-mono">{health}</span>
      </div>

      <div className="space-x-2">
        <input
          className="border px-2 py-1 rounded"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <button className="border px-3 py-1 rounded" onClick={predict}>
          Predict
        </button>
        <span className="font-mono">y = {y}</span>
      </div>
    </main>
  );
}
