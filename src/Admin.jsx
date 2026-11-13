
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
      const respuesta = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
      });

      if (!respuesta.ok) throw new Error();

      setAcceso(true);
      setError("");

      const [resPedidos, resSolicitudes] = await Promise.all([
        fetch("http://localhost:3001/pedidos"),
        fetch("http://localhost:3001/contacto")
      ]);

      setPedidos(await resPedidos.json());
      setSolicitudes(await resSolicitudes.json());
    } catch {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <section style={{ padding: "35px 20px", background: "#f5efff" }}>
      {!acceso ? (
        <form onSubmit={iniciarSesion} style={{
          maxWidth: "350px", margin: "auto", padding: "25px",
          background: "white", borderRadius: "18px"
        }}>
          <h2>Panel administrativo</h2>
          <p>Inicia sesión para gestionar Rappi Ditto.</p>

          <input
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>
          <p>{error}</p>
        </form>
      ) : (
        <div>
          <h2>¡Bienvenida a la administración!</h2>

          <h3>Pedidos recibidos ({pedidos.length})</h3>
          {pedidos.map(p => (
            <p key={p.id}>Pedido #{p.id}</p>
          ))}

          <h3>Solicitudes de contacto ({solicitudes.length})</h3>
          {solicitudes.map(s => (
            <article key={s.id} style={{
              background: "white", padding: "15px",
              borderRadius: "12px", marginBottom: "10px"
            }}>
              <strong>{s.nombre}</strong>
              <p>{s.correo}</p>
              <p>{s.mensaje}</p>
            </article>
          ))}

          <button onClick={() => setAcceso(false)}>
            Cerrar sesión
          </button>
        </div>
      )}
    </section>
  );
}

export default Admin;
