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

import CategoriaCard from "../components/CategoriaCard"
import EstadoCarga from "../components/EstadoCarga"
import ErrorPeticion from "../components/ErrorPeticion"

import {
  obtenerCategorias,
  simularErrorServidor
} from "../services/librosApi"

function Inicio() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [errorPrueba, setErrorPrueba] = useState(null)

  const cargarCategorias = useCallback(
    async (force = false) => {
      setCargando(true)
      setError(null)

      try {
        const datos =
          await obtenerCategorias({ force })

        setCategorias(datos)
      } catch (errorPeticion) {
        setError({
          mensaje: errorPeticion.message,
          codigo: errorPeticion.status
        })
      } finally {
        setCargando(false)
      }
    },
    []
  )

  useEffect(() => {
    cargarCategorias()
  }, [cargarCategorias])

  const probarError500 = async () => {
    setErrorPrueba(null)

    try {
      await simularErrorServidor()
    } catch (errorPeticion) {
      setErrorPrueba({
        mensaje: errorPeticion.message,
        codigo: errorPeticion.status
      })
    }
  }

  if (cargando) {
    return (
      <EstadoCarga mensaje="Consultando categorías en la API REST..." />
    )
  }

  if (error) {
    return (
      <ErrorPeticion
        mensaje={error.mensaje}
        codigo={error.codigo}
        onReintentar={() =>
          cargarCategorias(true)
        }
      />
    )
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Librería MFC
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Explora nuestros libros por categoría. Los
        datos son obtenidos desde una API REST mock
        creada con MSW.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)"
          },
          gap: 2,
          mb: 4
        }}
      >
        {categorias.map((categoria) => (
          <CategoriaCard
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        Esta aplicación incluye manejo de errores
        HTTP 404 y 500 para demostrar la integración.
      </Alert>

      <Button
        variant="outlined"
        color="error"
        onClick={probarError500}
      >
        Simular error 500
      </Button>

      {errorPrueba && (
        <Box sx={{ mt: 2 }}>
          <ErrorPeticion
            mensaje={errorPrueba.mensaje}
            codigo={errorPrueba.codigo}
            onReintentar={probarError500}
          />
        </Box>
      )}
    </Box>
  )
}

export default Inicio
