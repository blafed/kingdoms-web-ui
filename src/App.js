import { useEffect, useState } from "react"
import MainLayout from "./components/MainLayout"
import BasicsProvider from "./components/BasicsProvider"
import { apiUrl } from "./consts"
import Main from "./components/Main"
import {
  Box,
  CssBaseline,
  Snackbar,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import basicsDefaultValue from "./basicsDefaultValue"
import CommonsProvider from "./components/CommonsProvider"
function App() {
  return <Container />
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f8bbd0",
    },
    background: {
      default: "#eee",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
})
function Container() {
  const [basicsValue, setBasicsValue] = useState(basicsDefaultValue)

  useEffect(() => {
    fetch(apiUrl + "info/forms/basics")
      .then((response) => response.json())
      .then((data) => {
        setBasicsValue(data)
      })
      .catch(() => {})
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BasicsProvider value={basicsValue}>
          <CommonsProvider>
            <Main />
          </CommonsProvider>
        </BasicsProvider>
      </ThemeProvider>

      <></>
    </>
  )
}

export default App
