import {
  Box,
  Button,
  Paper,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function NoEncontrado() {
  return (
    <Box
      sx={{
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 5,
          textAlign: "center",
          maxWidth: 480
        }}
      >
        <Typography variant="h2">
          404
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
        >
          Página no encontrada
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          La dirección ingresada no corresponde a
          una página disponible.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
        >
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  )
}

export default NoEncontrado
