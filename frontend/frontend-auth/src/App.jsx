import { useState } from "react"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignUpForm"

function App() {
  const [view, setView] = useState("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = (credentials) => {
    console.log("LOGIN:", credentials)
  }

  const handleSignup = async (userData) => {
    setLoading(true)
    setError(null)

    try {

      console.log(userData)
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })

      const data = await res.json()

      console.log(data)
      if (!res.ok) {
        throw new Error(data.message || "Error al crear cuenta")
      }

      console.log("SIGNUP OK:", data)
      setView("login")

    } catch (err) {
      setError(err.message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>{view === "login" ? "Login" : "Signup"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {view === "login" && (
        <>
          <LoginForm onLogin={handleLogin} />
          <p>
            ¿No tienes cuenta?{" "}
            <button onClick={() => setView("signup")}>
              Regístrate
            </button>
          </p>
        </>
      )}

      {view === "signup" && (
        <>
          <SignupForm onSignup={handleSignup} loading={loading} />
          <p>
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => setView("login")}>
              Inicia sesión
            </button>
          </p>
        </>
      )}
      
    </div>
  )
}

export default App
