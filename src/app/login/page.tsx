"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Erro no login");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Login Admin</h1>
        <input
          type="text"
          placeholder="Username"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button 
          type="submit" 
          className="bg-blue-700 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="text-xs text-gray-500 text-center">
          Use: admin / admin
        </div>
      </form>
    </div>
  );
} 