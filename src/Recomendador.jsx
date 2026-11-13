
import { useState } from "react";

function Recomendador({ productos = [] }) {
  const [categoria, setCategoria] = useState("");
  const [resultado, setResultado] = useState([]);

  const buscarRecomendaciones = () => {
    const encontrados = productos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    setResultado(encontrados.slice(0, 3));
  };

  return (
    <section className="recomendador">
      <h2>✨ Asistente Ditto</h2>
      <p>Cuéntanos qué se te antoja y te ayudamos a elegir.</p>

      <select
        value={categoria}
        onChange={(e) => {
          setCategoria(e.target.value);
          setResultado([]);
        }}
      >
        <option value="">¿Qué quieres hoy?</option>
        <option value="Comida">Comida</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Dulces">Dulces</option>
      </select>

      <button onClick={buscarRecomendaciones}>
        Encontrar recomendaciones
      </button>

      {resultado.map((p) => (
        <article key={p.id}>
          <h3>{p.nombre}</h3>
          <p>${Number(p.precio).toLocaleString("es-CO")}</p>
        </article>
      ))}

      {resultado.length === 0 && categoria && (
        <p>Pulsa el botón para ver tus recomendaciones.</p>
      )}
    </section>
  );
}

export default Recomendador;
