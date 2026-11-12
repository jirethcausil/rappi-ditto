
import { useState } from 'react'
import './App.css'


const productos = [
  {
    id: 1,
    nombre: 'Hamburguesa clásica',
    categoria: 'Comida',
    precio: 18000,
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    nombre: 'Pizza personal',
    categoria: 'Comida',
    precio: 16000,
    imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    nombre: 'Papas fritas',
    categoria: 'Snacks',
    precio: 8000,
    imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    nombre: 'Gaseosa',
    categoria: 'Bebidas',
    precio: 5000,
    imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    nombre: 'Torta de chocolate',
    categoria: 'Postres',
    precio: 9000,
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    nombre: 'Gomitas',
    categoria: 'Snacks',
    precio: 4000,
    imagen: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=800&q=80'
  }
]


function App() {
  const [pantalla, setPantalla] = useState('login')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [carrito, setCarrito] = useState([])

  function entrar(e) {
    e.preventDefault()
    if (correo.trim() && contrasena.trim()) {
      setPantalla('catalogo')
    }
  }

  function agregar(producto) {
    setCarrito(anterior => {
      const existe = anterior.find(item => item.id === producto.id)

      if (existe) {
        return anterior.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...anterior, { ...producto, cantidad: 1 }]
    })
  }

  function salir() {
    setPantalla('login')
    setCarrito([])
    setCorreo('')
    setContrasena('')
  }

  const productosFiltrados = productos.filter(producto =>
    (categoria === 'Todas' || producto.categoria === categoria) &&
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad, 0
  )

  if (pantalla !== 'catalogo') {
    return (
      <main className="inicio">
        <header className="encabezado">
          <h1>rappi<span>ditto</span></h1>
          <p>Todo lo que buscas, en un solo lugar.</p>
        </header>

        <section className="bienvenida">
          <h2>{pantalla === 'registro' ? '¡Únete a Rappi Ditto!' : '¡Qué bueno tenerte aquí!'}</h2>
          <p>Descubre tus productos favoritos.</p>

          <form className="formulario" onSubmit={entrar}>
            {pantalla === 'registro' && (
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              required
            />

            <button type="submit">
              {pantalla === 'registro' ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>

          <p>
            {pantalla === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            {' '}
            <button
              className="enlace"
              onClick={() => setPantalla(pantalla === 'login' ? 'registro' : 'login')}
            >
              {pantalla === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>

          <button className="invitado" onClick={() => setPantalla('catalogo')}>
            Continuar como invitado
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="inicio">
      <header className="encabezado">
        <h1>rappi<span>ditto</span></h1>
        <p>Todo lo que buscas, en un solo lugar.</p>
        <button className="boton-salir" onClick={salir}>Cerrar sesión</button>
      </header>

      <section className="bienvenida">
        <h2>¡Hola{nombre ? `, ${nombre}` : ''}! ¿Qué se te antoja hoy?</h2>
        <p>Encuentra comida, bebidas, snacks y mucho más.</p>
        <input
          className="buscador"
          placeholder="Busca tus productos favoritos..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </section>

      <section className="categorias">
        <h2>Explora por categorías</h2>
        <div className="lista-categorias">
          {['Todas', 'Comida', 'Bebidas', 'Snacks', 'Postres'].map(item => (
            <button
              key={item}
              className={categoria === item ? 'categoria activa' : 'categoria'}
              onClick={() => setCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="restaurantes">
        <h2>Nuestros productos</h2>
        <div className="lista-restaurantes">
          {productosFiltrados.map(producto => (
            <article className="tarjeta-restaurante" key={producto.id}>
            <img
  className="imagen-producto"
  src={producto.imagen}
  alt={producto.nombre}
/>
              <div className="info-restaurante">
                <h3>{producto.nombre}</h3>
                <p>${producto.precio.toLocaleString('es-CO')}</p>
                <button onClick={() => agregar(producto)}>
                  + Agregar al carrito
                </button>
              </div>
            </article>
          ))}
          {productosFiltrados.length === 0 && <p>No encontramos productos.</p>}
        </div>
      </section>

      <section className="carrito">
        <h2>🛒 Mi carrito ({carrito.reduce((n, item) => n + item.cantidad, 0)})</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map(item => (
              <div className="producto-carrito" key={item.id}>
                <p>{item.nombre} x {item.cantidad}</p>
                <button onClick={() => setCarrito(anterior =>
                  anterior.filter(producto => producto.id !== item.id)
                )}>
                  Eliminar
                </button>
              </div>
            ))}
            <h3>Total: ${total.toLocaleString('es-CO')}</h3>
            <button onClick={() => alert('¡Pedido de demostración registrado!')}>
              Continuar con el pedido
            </button>
          </>
        )}
      </section>
    </main>
  )
}

export default App
