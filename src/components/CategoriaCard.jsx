import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function CategoriaCard({ categoria }) {
  return (
    <Card elevation={2}>
      <CardActionArea
        component={Link}
        to={`/categoria/${categoria.id}`}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            {categoria.nombre}
          </Typography>

          <Typography color="text.secondary">
            {categoria.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CategoriaCard
