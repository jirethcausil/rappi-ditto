
import { useState } from "react";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("");

  const enviarSolicitud = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("https://rappi-ditto.onrender.com/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          correo,
          mensaje
        })
      });

      if (!respuesta.ok) throw new Error();

      setEstado("¡Solicitud enviada correctamente!");
      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (error) {
      setEstado("No se pudo enviar la solicitud.");
    }
  };

  return (
    <section className="contacto">
      <h2>Contáctanos</h2>
      <p>En Rappi Ditto queremos conocer tus opiniones.</p>

      <form onSubmit={enviarSolicitud}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <textarea
          placeholder="Escribe tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />

        <button type="submit">Enviar solicitud</button>
      </form>

      <p>{estado}</p>
    </section>
  );
}

export default Contacto;


