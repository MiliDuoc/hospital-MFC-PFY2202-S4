const cache = new Map()

async function solicitar(url, { force = false } = {}) {
  if (!force && cache.has(url)) {
    return cache.get(url)
  }

  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    let mensaje = "No fue posible completar la solicitud."

    try {
      const cuerpo = await respuesta.json()

      if (cuerpo?.mensaje) {
        mensaje = cuerpo.mensaje
      }
    } catch {
      // Se mantiene el mensaje por defecto.
    }

    const error = new Error(mensaje)
    error.status = respuesta.status
    throw error
  }

  const datos = await respuesta.json()

  cache.set(url, datos)

  return datos
}

export function obtenerCategorias(opciones) {
  return solicitar("api/categorias", opciones)
}

export function obtenerLibros(
  categoria,
  opciones
) {
  const url =
    `api/libros?categoria=${encodeURIComponent(categoria)}`

  return solicitar(url, opciones)
}

export function simularErrorServidor() {
  return solicitar(
    "api/libros?categoria=ficcion&error=500",
    { force: true }
  )
}

export function limpiarCache() {
  cache.clear()
}
