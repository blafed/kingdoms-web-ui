import { useTheme } from "@emotion/react"
import {
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Icon,
} from "@mui/material"
import { useState, useRef, useEffect } from "react"

export default function ImgPicker({
  maxImgs = 10,
  useInput,
  name,
  error,
  helperText,
  value = "",
  onChange,
  disabled,
  allowFiles,
  customFaceButton,
}) {
  //TODO implemement allowFiles
  useEffect(() => onChange?.("[]"), [])
  helperText = error ? error : helperText
  // const [error, setError] = useState(error)`
  //let { max = 10, useInput, name = 'imgs' } = props
  const [drop, setDrop] = useState(false)
  //const [items, setItems] = useState([])
  const [selected, setSelected] = useState("0")

  let items = value
    ? typeof value == "string"
      ? JSON.parse(value)
      : value
    : []

  const handleChange = function (x) {
    x = JSON.stringify(x)
    onChange?.(x)
  }
  const handleSelect = function (i) {
    if (i === selected) setSelected("")
    else setSelected(i + "")
  }
  const handleInput = async function (e) {
    let files = e
    if (e.target) files = e.target.files
    let newItemsToSet = []
    for (let i = 0; i < files.length; i++) {
      if (items.length + i < maxImgs) {
        let f = files[i]
        await new Promise((res) => {
          let reader = new FileReader()
          reader.onload = () => {
            newItemsToSet.push({
              url: reader.result.toString(),
              id: files.length,
            })
            res()
          }
          reader.readAsDataURL(f)
        })
      } else {
        break
      }
    }
    if (newItemsToSet.length) {
      handleChange([...items, ...newItemsToSet])
      setSelected(items.length + newItemsToSet.length - 1 + "")
    }
    // @ts-ignore
    inputRef.current.value = ""
  }

  const handleAdd = function () {
    inputRef.current.click()
  }
  const handleDelete = function () {
    let newItems = [...items]
    newItems.splice(selected, 1)
    handleChange(newItems)
    if (selected >= items.length - 1 && selected > 0)
      setSelected(parseInt(selected) - 1 + "")
  }

  const handleDrop = function (e) {
    e.preventDefault()
    let files = e.dataTransfer.files
    handleInput(files)
    setDrop(false)
  }

  const handleMove = function (x) {
    let i = parseInt(selected)
    let j = i + x
    if (j >= 0 && j < items.length) {
      let newItems = [...items]
      newItems[i] = items[j]
      newItems[j] = items[i]
      handleChange(newItems)
      setSelected(j + "")
    }
  }
  const inputRef = useRef()
  return (
    <Box>
      <Box
        elevation={2}
        onDragLeave={() => setDrop(false)}
        sx={{ width: "100%", border: drop ? 2 : 0, position: "relative" }}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDrop(true)
        }}
      >
        {!useInput ? null : (
          <input name={name} hidden value={JSON.stringify(items)} />
        )}
        <input
          onInput={handleInput}
          ref={inputRef}
          hidden
          type="file"
          accept={allowFiles ? "*" : "image/*"}
          multiple
        />
        {!items.length ? (
          <Box>
            <Button
              disabled={disabled}
              onClick={handleAdd}
              variant={"outlined"}
              icon="photo"
              sx={{
                fontSize: "1rem",
                height: "4rem",
                borderRadius: 3,
                border: 2,
              }}
              fullWidth
              text="Add Photos"
            />
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex" }}>
              <Button
                color="inherit"
                disabled={items.length >= maxImgs || disabled}
                onClick={handleAdd}
                text="Add Picture"
                icon="add_circle_outlined"
                tooltip={"Add Photo"}
              />

              <Box flexGrow={1} />
              <Button
                disabled={selected == 0 || !selected || disabled}
                onClick={() => handleMove(-1)}
                icon="arrow_upward"
                tooltip="Move up"
              />
              <Button
                disabled={selected == items.length - 1 || !selected || disabled}
                onClick={() => handleMove(1)}
                icon="arrow_downward"
                tooltip={"Move down"}
              />

              <Button
                disabled={!selected || disabled}
                icon="rotate_left"
                tooltip={"Rotate"}
              />
              <Button
                onClick={handleDelete}
                disabled={!selected || disabled}
                icon="delete"
                color="error"
                tooltip={"Delete"}
              />
            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Grid container spacing={1}>
                {items.map((x, i) => (
                  <Grid key={i} xs={4} sm={12 / 4} md={2} item>
                    <Button
                      disabled={disabled}
                      onClick={() => handleSelect(i + "")}
                      sx={{
                        width: "100%",
                        height: "6rem",
                        p: 0,
                        border: selected == i + "" ? 3 : 0,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: useTheme().palette.shade,
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <img
                          src={x.url}
                          style={{
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                            transform: `rotate(${x.rot}deg)`,
                          }}
                        />
                      </Box>
                      {i != 0 ? null : (
                        <Box
                          color="inherit"
                          sx={{ position: "absolute", bottom: 0, right: 0 }}
                        >
                          <Icon>star</Icon>
                        </Box>
                      )}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex" }}>
                <Typography
                  textAlign="center"
                  variant="subtitle2"
                  sx={{ my: "auto", flexGrow: 1 }}
                >
                  ({items.length + " "}/{" " + maxImgs})
                </Typography>
              </Box>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: drop ? "inline" : "none",
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <Icon>add_photo_alternate</Icon>
        </Box>
      </Box>
      {!helperText ? null : (
        <Typography
          variant="caption"
          color={error ? "error" : "text.secondary"}
        ></Typography>
      )}
    </Box>
  )
}
