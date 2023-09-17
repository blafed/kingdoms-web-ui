import { createContext, useContext } from "react"
import basicsDefaultValue from "../basicsDefaultValue"
const BasicsContext = createContext(basicsDefaultValue)

export const useBasics = () => useContext(BasicsContext)

export default function BasicsProvider({
  value = basicsDefaultValue,
  children,
}) {
  return (
    <BasicsContext.Provider value={value}>{children}</BasicsContext.Provider>
  )
}
