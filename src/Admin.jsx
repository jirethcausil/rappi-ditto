
import { useState } from "react";

function Admin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [acceso, setAcceso] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [error, setError] = useState("");

  const API = "https://rappi-ditto.onrender.com";

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
      });

      if (!respuesta.ok) throw new Error();

      const [p, s, n] = await Promise.all([
        fetch(`${API}/pedidos`),
        fetch(`${API}/contacto`),
        fetch(`${API}/negocios`)
      ]);

      setPedidos(await p.json());
      setSolicitudes(await s.json());
      setNegocios(await n.json());
      setAcceso(true);
      setError("");
    } catch {
      setError("No se pudo iniciar sesión. Revisa los datos o el servidor.");
    }
  };

  return (
    <section className="admin-panel">
      {!acceso ? (
        <form onSubmit={iniciarSesion}>
          <h2>Panel administrativo</h2>
          <p>Gestiona Rappi Ditto desde aquí.</p>

          <input
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

          <button type="submit">Iniciar sesión</button>
          <p>{error}</p>
        </form>
      ) : (
        <div>
          <h2>¡Bienvenida a la administración!</h2>

          <h3>🏪 Negocios registrados ({negocios.length})</h3>
          {negocios.length === 0 ? (
            <p>No hay solicitudes de negocios todavía.</p>
          ) : (
            negocios.map((n) => (
              <article key={n.id}>
                <strong>{n.nombre}</strong>
                <p>Encargado: {n.encargado}</p>
                <p>Teléfono: {n.telefono}</p>
                <p>Dirección: {n.direccion}</p>
                <p>Tipo: {n.tipo}</p>
                <p>Estado: {n.estado}</p>
              </article>
            ))
          )}

          <h3>📦 Pedidos recibidos ({pedidos.length})</h3>
          {pedidos.map((p) => (
            <article key={p.id}>
              Pedido #{p.id}
              <p>{p.nombre || "Cliente"}</p>
            </article>
          ))}

          <h3>📩 Solicitudes de contacto ({solicitudes.length})</h3>
          {solicitudes.map((s) => (
            <article key={s.id}>
              <strong>{s.nombre}</strong>
              <p>{s.correo}</p>
              <p>{s.mensaje}</p>
            </article>
          ))}

          <button onClick={() => setAcceso(false)}>Cerrar sesión</button>
        </div>
      )}
    </section>
  );
}

export default Admin;
