import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import {
  CssBaseline,
  ThemeProvider
} from "@mui/material"

import { HashRouter } from "react-router"

import App from "./App.jsx"
import theme from "./theme/theme"

async function enableMocking() {
  const { worker } =
    await import("./mocks/browser")

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${
        import.meta.env.BASE_URL
      }mockServiceWorker.js`
    }
  })
}

enableMocking().then(() => {
  createRoot(
    document.getElementById("root")
  ).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </StrictMode>
  )
})
