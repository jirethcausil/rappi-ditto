
import { useState } from 'react'
import './App.css'

const productos = [
  { id: 1, nombre: 'Hamburguesa clásica', categoria: 'Comida', precio: 18000, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { id: 2, nombre: 'Pizza personal', categoria: 'Comida', precio: 16000, imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
  { id: 3, nombre: 'Papas fritas', categoria: 'Snacks', precio: 8000, imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80' },
  { id: 4, nombre: 'Gaseosa', categoria: 'Bebidas', precio: 5000, imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80' },
  { id: 5, nombre: 'Torta de chocolate', categoria: 'Postres', precio: 9000, imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
  { id: 6, nombre: 'Gomitas', categoria: 'Snacks', precio: 4000, imagen: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=800&q=80' },
  { id: 7, nombre: 'Perro caliente', categoria: 'Comida', precio: 12000, imagen: 'https://images.unsplash.com/photo-1683882330145-d23cbe4f7ccd?auto=format&fit=crop&w=800&q=80' },
  { id: 8, nombre: 'Sándwich especial', categoria: 'Comida', precio: 14000, imagen: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
  { id: 9, nombre: 'Nuggets de pollo', categoria: 'Snacks', precio: 11000, imagen: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80' },
  { id: 10, nombre: 'Limonada', categoria: 'Bebidas', precio: 6000, imagen: 'https://images.unsplash.com/photo-1656936637945-571e3f0893f9?auto=format&fit=crop&w=800&q=80' },
  { id: 11, nombre: 'Brownie', categoria: 'Postres', precio: 7000, imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  { id: 12, nombre: 'Dona de chocolate', categoria: 'Postres', precio: 6500, imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80' }
]

function App() {
  const [pantalla, setPantalla] = useState('login')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [carrito, setCarrito] = useState([])
  const [pedido, setPedido] = useState(null)

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

  function aumentarCantidad(id) {
    setCarrito(anterior =>
      anterior.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    )
  }

  function disminuirCantidad(id) {
    setCarrito(anterior =>
      anterior
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    )
  }

  function confirmarPedido() {
    if (carrito.length === 0) return

    const nuevoPedido = {
      numero: Date.now().toString().slice(-6),
      productos: [...carrito],
      total: carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
      )
    }

    setPedido(nuevoPedido)
    setCarrito([])
    setPantalla('confirmacion')
  }

  function salir() {
    setPantalla('login')
    setCarrito([])
    setCorreo('')
    setContrasena('')
    setPedido(null)
  }

  const productosFiltrados = productos.filter(producto =>
    (categoria === 'Todas' || producto.categoria === categoria) &&
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  // PANTALLA DE CONFIRMACION
  if (pantalla === 'confirmacion' && pedido) {
    return (
      <main className="inicio">
        <header className="encabezado">
          <h1>rappi<span>ditto</span></h1>
          <p>Todo lo que buscas, en un solo lugar.</p>
        </header>

        <section className="confirmacion-pedido">
          <div className="icono-confirmacion">✓</div>

          <h2>¡Pedido recibido!</h2>

          <p>
            Gracias{nombre ? `, ${nombre}` : ''}.
            Tu solicitud ha sido registrada correctamente.
          </p>

          <div className="numero-pedido">
            <span>Número de pedido</span>
            <h3>#{pedido.numero}</h3>
          </div>

          <h3>Resumen de tu pedido</h3>

          <div className="resumen-productos">
            {pedido.productos.map(item => (
              <div className="producto-resumen" key={item.id}>
                <span>{item.nombre} x {item.cantidad}</span>
                <strong>
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </strong>
              </div>
            ))}
          </div>

          <div className="total-confirmacion">
            <span>Total del pedido</span>
            <strong>
              ${pedido.total.toLocaleString('es-CO')}
            </strong>
          </div>

          <p className="mensaje-final">
            ¡Gracias por elegir Rappi Ditto! 💛
          </p>

          <button
            className="volver-catalogo"
            onClick={() => {
              setPedido(null)
              setPantalla('catalogo')
            }}
          >
            Volver al catálogo
          </button>
        </section>
      </main>
    )
  }

  // LOGIN Y REGISTRO
  if (pantalla !== 'catalogo') {
    return (
      <main className="inicio">
        <header className="encabezado">
          <h1>rappi<span>ditto</span></h1>
          <p>Todo lo que buscas, en un solo lugar.</p>
        </header>

        <section className="bienvenida">
          <h2>
            {pantalla === 'registro'
              ? '¡Únete a Rappi Ditto!'
              : '¡Qué bueno tenerte aquí!'}
          </h2>

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
              {pantalla === 'registro'
                ? 'Crear cuenta'
                : 'Iniciar sesión'}
            </button>
          </form>

          <p>
            {pantalla === 'login'
              ? '¿No tienes cuenta?'
              : '¿Ya tienes cuenta?'}
            {' '}

            <button
              className="enlace"
              onClick={() =>
                setPantalla(
                  pantalla === 'login' ? 'registro' : 'login'
                )
              }
            >
              {pantalla === 'login'
                ? 'Regístrate'
                : 'Inicia sesión'}
            </button>
          </p>

          <button
            className="invitado"
            onClick={() => setPantalla('catalogo')}
          >
            Continuar como invitado
          </button>
        </section>
      </main>
    )
  }

  // CATALOGO Y CARRITO
  return (
    <main className="inicio">
      <header className="encabezado">
        <h1>rappi<span>ditto</span></h1>
        <p>Todo lo que buscas, en un solo lugar.</p>

        <button className="boton-salir" onClick={salir}>
          Cerrar sesión
        </button>
      </header>

      <section className="bienvenida">
        <h2>
          ¡Hola{nombre ? `, ${nombre}` : ''}!
          {' '}¿Qué se te antoja hoy?
        </h2>

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
              className={
                categoria === item
                  ? 'categoria activa'
                  : 'categoria'
              }
              onClick={() => setCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="restaurantes">
        <h2>Nuestros productos</h2>
        <p className="subtitulo">
          Encuentra tus favoritos en nuestros establecimientos.
        </p>

        <div className="lista-restaurantes">
          {productosFiltrados.map(producto => (
            <article
              className="tarjeta-restaurante"
              key={producto.id}
            >
              <img
                className="imagen-producto"
                src={producto.imagen}
                alt={producto.nombre}
              />

              <div className="info-restaurante">
                <h3>{producto.nombre}</h3>

                <p>
                  ${producto.precio.toLocaleString('es-CO')}
                </p>

                <button onClick={() => agregar(producto)}>
                  + Agregar al carrito
                </button>
              </div>
            </article>
          ))}

          {productosFiltrados.length === 0 && (
            <p>No encontramos productos.</p>
          )}
        </div>
      </section>

      <section className="carrito">
        <h2>
          🛒 Mi carrito (
          {carrito.reduce((n, item) => n + item.cantidad, 0)}
          )
        </h2>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map(item => (
              <div className="producto-carrito" key={item.id}>
                <p>{item.nombre}</p>

                <div className="controles-cantidad">
                  <button
                    type="button"
                    onClick={() => disminuirCantidad(item.id)}
                  >
                    -
                  </button>

                  <span>{item.cantidad}</span>

                  <button
                    type="button"
                    onClick={() => aumentarCantidad(item.id)}
                  >
                    +
                  </button>
                </div>

                <p>
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </p>
              </div>
            ))}

            <h3>
              Total: ${total.toLocaleString('es-CO')}
            </h3>

            <button onClick={confirmarPedido}>
              Confirmar pedido
            </button>
          </>
        )}
      </section>
    </main>
  )
}

export default App
