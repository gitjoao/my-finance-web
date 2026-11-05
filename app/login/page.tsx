"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login(username, password);

      await response;
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      router.replace(`/dashboard?month=${currentMonth}&year=${currentYear}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-box">
      <div className="login-logo">
        <b>My</b> Finance
      </div>

      <div className="login-box-body">
        <p className="login-box-msg">Entre para iniciar sua sessão</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <span className="glyphicon glyphicon-user form-control-feedback" />
          </div>

          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-flat"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
