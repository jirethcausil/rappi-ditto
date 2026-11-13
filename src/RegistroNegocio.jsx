
import { useState } from "react";

function RegistroNegocio() {
  const [datos, setDatos] = useState({
    nombre: "",
    encargado: "",
    telefono: "",
    direccion: "",
    tipo: ""
  });

  const [mensaje, setMensaje] = useState("");

  const cambiar = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setMensaje("Enviando solicitud...");

    try {
      const respuesta = await fetch(
        "https://rappi-ditto.onrender.com/negocios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datos)
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) throw new Error(resultado.mensaje);

      setMensaje("¡Tu negocio fue registrado correctamente!");
      setDatos({
        nombre: "",
        encargado: "",
        telefono: "",
        direccion: "",
        tipo: ""
      });
    } catch (error) {
      setMensaje("No se pudo enviar. Intenta nuevamente.");
    }
  };

  return (
    <section className="contacto">
      <h2>🏪 ¿Tienes un negocio?</h2>
      <p>Únete a Rappi Ditto y conecta con nuevos clientes.</p>

      <form onSubmit={enviar}>
        <input name="nombre" placeholder="Nombre del negocio" value={datos.nombre} onChange={cambiar} required />
        <input name="encargado" placeholder="Nombre del encargado" value={datos.encargado} onChange={cambiar} required />
        <input name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={cambiar} required />
        <input name="direccion" placeholder="Dirección del negocio" value={datos.direccion} onChange={cambiar} required />

        <select name="tipo" value={datos.tipo} onChange={cambiar} required>
          <option value="">Tipo de negocio</option>
          <option value="Restaurante">Restaurante</option>
          <option value="Tienda">Tienda</option>
          <option value="Dulcería">Dulcería</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Otro">Otro</option>
        </select>

        <button type="submit">Enviar solicitud</button>
      </form>

      <p>{mensaje}</p>
    </section>
  );
}

export default RegistroNegocio;
