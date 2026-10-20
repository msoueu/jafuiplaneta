import { useState } from 'react'
import { signInWithUsername } from '../auth.js'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Preencha o usuário e a senha.')
      return
    }
    setError('')
    setLoading(true)
    const { error: authError } = await signInWithUsername(username, password)
    if (authError) {
      setError(
        authError.status === 400
          ? 'Usuário ou senha incorretos.'
          : 'Não foi possível entrar agora. Confira a conexão e tente de novo.',
      )
    }
    setLoading(false)
  }

  return (
    <>
      <div className="ambient-bg" style={{ backgroundImage: 'url(/img/bg-ambient.jpg)' }} />
      <div className="ambient-overlay" />

      <main className="login-wrap">
        <form className="login-card" onSubmit={handleSubmit}>
          <span className="brand-dots" aria-hidden="true">
            <i className="dot dot-orange" />
            <i className="dot dot-green" />
            <i className="dot dot-blue" />
          </span>
          <h1 className="login-title">jafuiplaneta</h1>
          <p className="login-sub">Um local tranquilo para poder ser um cinéfilo chato hipotético sem julgamentos</p>

          <label className="field">
            <span>Usuário</span>
            <input
              autoFocus
              autoComplete="username"
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'entrando…' : 'entrar'}
          </button>
        </form>
      </main>
    </>
  )
}
