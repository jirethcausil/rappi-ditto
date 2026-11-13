
import { useState } from "react";

function Admin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [acceso, setAcceso] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("https://rappi-ditto.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, password })
      });

      if (!respuesta.ok) throw new Error();

      setAcceso(true);
      setError("");

      const [resPedidos, resSolicitudes] = await Promise.all([
        fetch("https://rappi-ditto.onrender.com/pedidos"),
        fetch("https://rappi-ditto.onrender.com/contacto")
      ]);

      setPedidos(await resPedidos.json());
      setSolicitudes(await resSolicitudes.json());

    } catch {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <section className="admin-panel">

      {!acceso ? (
        <form onSubmit={iniciarSesion}>

          <h2>Panel administrativo</h2>
          <p>Gestiona Rappi Ditto desde aquí.</p>

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Iniciar sesión
          </button>

          <p>{error}</p>

        </form>
      ) : (

        <div>
          <h2>¡Bienvenida a la administración!</h2>
          <p>Panel de gestión de Rappi Ditto</p>

          <h3>📦 Pedidos recibidos ({pedidos.length})</h3>

          {pedidos.length === 0 ? (
            <p>No hay pedidos registrados.</p>
          ) : (
            pedidos.map((p) => (
              <article key={p.id}>
                <strong>Pedido #{p.id}</strong>
                <p>{p.nombre || "Cliente"}</p>
              </article>
            ))
          )}

          <h3>📩 Solicitudes de contacto ({solicitudes.length})</h3>

          {solicitudes.length === 0 ? (
            <p>No hay solicitudes registradas.</p>
          ) : (
            solicitudes.map((s) => (
              <article key={s.id}>
                <strong>{s.nombre}</strong>
                <p>{s.correo}</p>
                <p>{s.mensaje}</p>
              </article>
            ))
          )}

          <button onClick={() => setAcceso(false)}>
            Cerrar sesión
          </button>

        </div>
      )}

    </section>
  );
}

export default Admin;
