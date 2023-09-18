import { useEffect } from "react"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import MainLayout from "./components/MainLayout"
import theme from "./theme"

function App() {
  useEffect(() => {
    document.title = "KingdomsEditor | For  Mystical Realms Conquest Game"
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <MainLayout />
      </Box>
    </ThemeProvider>
  )
}

export default App
