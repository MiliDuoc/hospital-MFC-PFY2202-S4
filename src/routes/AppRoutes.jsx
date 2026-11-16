import {
  Route,
  Routes
} from "react-router"

import Inicio from "../pages/Inicio"
import Categoria from "../pages/Categoria"
import NoEncontrado from "../pages/NoEncontrado"

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Inicio />}
      />

      <Route
        path="/categoria/:categoria"
        element={<Categoria />}
      />

      <Route
        path="*"
        element={<NoEncontrado />}
      />
    </Routes>
  )
}

export default AppRoutes
