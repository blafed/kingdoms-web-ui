import { TextField, InputLabel, Typography, Grid } from "@mui/material"
import { randomId } from "../utils"
import { useEffect, useState } from "react"
export function MyTextField({ defaultValue = "", ...other }) {
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  const [value, setValue] = useState(defaultValue)
  let id = randomId()
  return (
    <TextField
      {...other}
      minRows={other.multiline ? 3 : 1}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      id={randomId}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{}}
      name="username"
      autoComplete="username"
      autoFocus
    />
  )
}

export function MyTextAreaField({ defaultValue = "", ...other }) {
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  const [value, setValue] = useState(defaultValue)
  let id = randomId()
  return (
    <MyTextAreaField
      {...other}
      multiline
      onChange={(e) => setValue(e.target.value)}
      value={value}
      id={randomId}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{}}
      name="username"
      autoComplete="username"
      autoFocus
    />
  )
}
