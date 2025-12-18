function Dashboard({ user, onLogout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user.nombre}</p>

      <button onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Dashboard