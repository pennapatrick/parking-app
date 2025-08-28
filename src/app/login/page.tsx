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
    <div className="container-narrow flex items-center justify-center min-h-[60vh] py-10">
      <form onSubmit={handleLogin} className="card p-8 w-full max-w-sm flex flex-col gap-5 bg-surface">
        <h1 className="text-2xl font-bold heading-gradient text-center">Login Admin</h1>
        <div className="field">
          <label className="text-xs font-medium uppercase tracking-wide text-soft">Username</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
            placeholder="admin"
          />
        </div>
        <div className="field">
          <label className="text-xs font-medium uppercase tracking-wide text-soft">Senha</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••"
          />
        </div>
        {error && <div className="text-negative text-sm">{error}</div>}
        <button 
          type="submit" 
          className="btn btn-accent w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="text-xs text-soft text-center">
          Use: admin / admin
        </div>
      </form>
    </div>
  );
} 