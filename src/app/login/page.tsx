"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    // Simula login
    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Login</h1>
        <input
          type="email"
          placeholder="E-mail"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-700 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition-colors">Entrar</button>
      </form>
    </div>
  );
} 