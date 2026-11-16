import {
  Alert,
  AlertTitle,
  Button,
  Stack
} from "@mui/material"

function ErrorPeticion({
  mensaje,
  codigo,
  onReintentar
}) {
  return (
    <Alert
      severity="error"
      action={
        onReintentar ? (
          <Button
            color="inherit"
            size="small"
            onClick={onReintentar}
          >
            Reintentar
          </Button>
        ) : null
      }
    >
      <AlertTitle>
        {codigo
          ? `Error ${codigo}`
          : "Ocurrió un problema"}
      </AlertTitle>

      <Stack spacing={0.5}>
        <span>{mensaje}</span>
        <span>
          Puedes volver a intentarlo o regresar al inicio.
        </span>
      </Stack>
    </Alert>
  )
}

export default ErrorPeticion
