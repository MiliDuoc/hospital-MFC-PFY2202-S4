import {
  Alert,
  Box,
  Button,
  Typography
} from "@mui/material"

import {
  useCallback,
  useEffect,
  useState
} from "react"

import {
  Link,
  useParams
} from "react-router"

import EstadoCarga from "../components/EstadoCarga"
import ErrorPeticion from "../components/ErrorPeticion"
import LibroCard from "../components/LibroCard"

import {
  obtenerLibros
} from "../services/librosApi"

function Categoria() {
  const { categoria } = useParams()

  const [libros, setLibros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargarLibros = useCallback(
    async (force = false) => {
      setCargando(true)
      setError(null)

      try {
        const datos = await obtenerLibros(
          categoria,
          { force }
        )

        setLibros(datos)
      } catch (errorPeticion) {
        setError({
          mensaje: errorPeticion.message,
          codigo: errorPeticion.status
        })
      } finally {
        setCargando(false)
      }
    },
    [categoria]
  )

  useEffect(() => {
    cargarLibros()
  }, [cargarLibros])

  if (cargando) {
    return (
      <EstadoCarga mensaje="Consultando libros..." />
    )
  }

  if (error) {
    return (
      <Box>
        <ErrorPeticion
          mensaje={error.mensaje}
          codigo={error.codigo}
          onReintentar={() =>
            cargarLibros(true)
          }
        />

        <Button
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Volver a categorías
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        sx={{ mb: 2 }}
      >
        ← Volver a categorías
      </Button>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {categoria.replaceAll("-", " ")}
      </Typography>

      {libros.length === 0 ? (
        <Alert severity="info">
          No hay libros disponibles en esta categoría.
        </Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: 2
          }}
        >
          {libros.map((libro) => (
            <LibroCard
              key={libro.id}
              libro={libro}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Categoria
