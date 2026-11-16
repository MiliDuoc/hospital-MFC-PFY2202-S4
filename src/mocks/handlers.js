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
      titulo: "La casa de los espíritus",
      autor: "Isabel Allende",
      precio: 13990
    },
    {
      id: 2,
      titulo: "Hijo de ladrón",
      autor: "Manuel Rojas",
      precio: 11990
    },
    {
      id: 3,
      titulo: "Coronación",
      autor: "José Donoso",
      precio: 12990
    }
  ],

  "ciencia-ficcion": [
    {
      id: 4,
      titulo: "Synco",
      autor: "Jorge Baradit",
      precio: 14990
    },
    {
      id: 5,
      titulo: "Ygdrasil",
      autor: "Jorge Baradit",
      precio: 13990
    },
    {
      id: 6,
      titulo: "Policía del karma",
      autor: "Jorge Baradit",
      precio: 12990
    }
  ],

  misterio: [
    {
      id: 7,
      titulo: "El obsceno pájaro de la noche",
      autor: "José Donoso",
      precio: 14990
    },
    {
      id: 8,
      titulo: "La última niebla",
      autor: "María Luisa Bombal",
      precio: 10990
    },
    {
      id: 9,
      titulo: "El lugar sin límites",
      autor: "José Donoso",
      precio: 11990
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