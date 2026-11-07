import './App.css'

const restaurantes = [
  {
    nombre: 'Burger House',
    tipo: 'Hamburguesas',
    tiempo: '25-35 min',
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'
  },
  {
    nombre: 'Pizza Central',
    tipo: 'Pizzas',
    tiempo: '30-40 min',
    imagen: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600'
  },
  {
    nombre: 'Dulce Momento',
    tipo: 'Postres',
    tiempo: '20-30 min',
    imagen: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600'
  }
]

function App() {
  return (
    <main className="inicio">

      <header className="encabezado">
        <h1>rappi<span>ditto</span></h1>
        <p>Todo lo que buscas, en un solo lugar.</p>
      </header>

      <section className="bienvenida">
        <h2>¿Qué se te antoja hoy?</h2>
        <p>Encuentra restaurantes y tiendas cerca de ti.</p>

        <div className="buscador">
          <span>🔎</span>
          <input type="text" placeholder="Busca comida o restaurantes..." />
        </div>
      </section>

      <section className="categorias">
        <h2>Explora por categorías</h2>

        <div className="lista-categorias">
          <article className="categoria">
            <span>🍔</span>
            <p>Hamburguesas</p>
          </article>

          <article className="categoria">
            <span>🍕</span>
            <p>Pizza</p>
          </article>

          <article className="categoria">
            <span>🍣</span>
            <p>Sushi</p>
          </article>

          <article className="categoria">
            <span>🍰</span>
            <p>Postres</p>
          </article>
        </div>
      </section>

      <section className="restaurantes">
        <h2>Restaurantes recomendados</h2>
        <p className="subtitulo">Descubre opciones para disfrutar hoy.</p>

        <div className="lista-restaurantes">
          {restaurantes.map((restaurante) => (
            <article className="tarjeta-restaurante" key={restaurante.nombre}>
              <img src={restaurante.imagen} alt={restaurante.tipo} />

              <div className="info-restaurante">
                <h3>{restaurante.nombre}</h3>
                <p>{restaurante.tipo}</p>
                <span>🕒 {restaurante.tiempo}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

export default App
