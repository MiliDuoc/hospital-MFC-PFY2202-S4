import {
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material"

function LibroCard({ libro }) {
  const precioFormateado =
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(libro.precio)

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)"
        }
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
        >
          {libro.titulo}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {libro.autor}
        </Typography>

        <Chip
          label={precioFormateado}
          color="primary"
        />
      </CardContent>
    </Card>
  )
}

export default LibroCard
