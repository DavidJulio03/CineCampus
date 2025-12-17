import { useState } from "react"

function SignupForm({ onSignup, loading }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignup({ nombre, email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label><br />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Crear cuenta"}</button>
    </form>
  )
}

export default SignupForm
