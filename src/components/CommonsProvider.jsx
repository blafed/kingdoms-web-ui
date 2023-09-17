import { createContext, useContext } from "react"

const CommonsContext = createContext()

const defaults = {
  showAlert: (msg = "", type = "error") => {},
}

const useCommons = () => useContext({})

export default function CommonsProvider({ value = defaults, children }) {
  return (
    <CommonsContext.Provider value={value}>{children}</CommonsContext.Provider>
  )
}
