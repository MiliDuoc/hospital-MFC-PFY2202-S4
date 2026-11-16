import { http, HttpResponse, delay } from "msw"

const categorias = [
  {
    id: "ficcion",
    nombre: "Ficción",
    descripcion: "Novelas y relatos de mundos imaginarios."
  },
  {
    id: "ciencia-ficcion",
    nombre: "Ciencia Ficción",
    descripcion: "Historias de ciencia, tecnología y futuros posibles."
  },
  {
    id: "misterio",
    nombre: "Misterio",
    descripcion: "Enigmas, investigaciones y suspenso."
  },
  {
    id: "drama",
    nombre: "Drama",
    descripcion: "Historias centradas en conflictos humanos."
  }
]

const librosPorCategoria = {
  ficcion: [
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      precio: 12990
    },
    {
      id: 2,
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      precio: 14990
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      precio: 10990
    }
  ],

  "ciencia-ficcion": [
    {
      id: 4,
      titulo: "Dune",
      autor: "Frank Herbert",
      precio: 15990
    },
    {
      id: 5,
      titulo: "Neuromante",
      autor: "William Gibson",
      precio: 12990
    },
    {
      id: 6,
      titulo: "Fahrenheit 451",
      autor: "Ray Bradbury",
      precio: 11990
    }
  ],

  misterio: [
    {
      id: 7,
      titulo: "El nombre de la rosa",
      autor: "Umberto Eco",
      precio: 14990
    },
    {
      id: 8,
      titulo: "Los crímenes de la calle Morgue",
      autor: "Edgar Allan Poe",
      precio: 9990
    },
    {
      id: 9,
      titulo: "El código Da Vinci",
      autor: "Dan Brown",
      precio: 10990
    }
  ],

  drama: []
}

export const handlers = [
  http.get("*/api/categorias", async () => {
    await delay(900)

    return HttpResponse.json(categorias)
  }),

  http.get("*/api/libros", async ({ request }) => {
    await delay(1000)

    const url = new URL(request.url)
    const categoria = url.searchParams.get("categoria")
    const simularError = url.searchParams.get("error")

    if (simularError === "500") {
      return HttpResponse.json(
        {
          mensaje:
            "El servidor simulado no pudo procesar la solicitud."
        },
        { status: 500 }
      )
    }

    if (!categoria || !(categoria in librosPorCategoria)) {
      return HttpResponse.json(
        {
          mensaje:
            "La categoría solicitada no existe."
        },
        { status: 404 }
      )
    }

    return HttpResponse.json(
      librosPorCategoria[categoria]
    )
  })
]
