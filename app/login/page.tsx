"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSlow(false);
    setError("");

    const slowTimer = setTimeout(() => setSlow(true), 4000);

    try {
      await login(username, password);

      const now = new Date();
      router.replace(
        `/dashboard?month=${now.getMonth() + 1}&year=${now.getFullYear()}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao realizar login");
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
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
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              required
            />
            <span className="glyphicon glyphicon-user form-control-feedback" />
          </div>

          <div className="form-group">
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {slow && (
            <div className="login-slow">
              <i className="fa fa-refresh fa-spin" /> O servidor está acordando,
              isso pode levar até 1 minuto…
            </div>
          )}

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
