import { useState } from "react"
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material"
import MainLayout from "./components/MainLayout"
import theme from "./theme"

function App() {
  const [count, setCount] = useState(0)

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
