import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignUpForm"
import Dashboard from "./components/ProfileView"

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState("login")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch("http://localhost:3000/user/auth/me", {
          credentials: "include"
        })

        if (!res.ok) throw new Error()

        const data = await res.json()
        setUser(data)

      } catch {

        setUser(null)

      } finally {

        setLoading(false)

      }

    }

    checkAuth()

  }, [])

  const handleLogin = async (credentials) => {

    setLoading(true)
    setError(null)

    try {

      const res = await fetch("http://localhost:3000/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentials)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Login inválido")
      }

      // Cookie ya quedó guardada por el navegador
      // Ahora pedimos el usuario
      const meRes = await fetch("http://localhost:3000/auth/me", {
        credentials: "include"
      })

      const userData = await meRes.json()
      setUser(userData)

    } catch (err) {

      setError(err.message)

    } finally {

      setLoading(false)

    }

  }


  const handleSignup = async (data) => {
    setLoading(true)
    setError(null)

    try {

      const res = await fetch("http://localhost:3000/user/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Error al crear cuenta")
      }

      // Normalmente signup también deja sesión abierta
      const meRes = await fetch("http://localhost:3000/auth/me", {
        credentials: "include"
      })

      const userData = await meRes.json()
      setUser(userData)

    } catch (err) {

      setError(err.message)

    } finally {

      setLoading(false)

    }

  }

  if (loading) {
    return <p>Cargando...</p>
  }

  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={() => {
          setUser(null)
        }}
      />
    )
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
