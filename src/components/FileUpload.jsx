import { createRef, useCallback, useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Container, Paper, Box, IconButton, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useDropzone } from "react-dropzone"
import ImgPicker from "./ImgPicker"

export default function ImgField() {
  const [imageUrl, setImageUrl] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [dragItems, setDragItems] = useState([])
  const [file, setFile] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    setFile(file)
    reader.onloadend = () => {
      setImageUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const inputRef = createRef()

  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true)
      setDragItems(e.dataTransfer.items)
    }
  }

  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack alignItems="center" spacing={2}>
        <label htmlFor="upload-image">
          <input
            ref={inputRef}
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        <Box
          sx={{
            width: "14rem",
            bgcolor: "#eee",
            p: 1,
            height: "14rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {imageUrl ? (
            <img
              style={{ objectFit: "contain", height: "100%" }}
              src={imageUrl}
              alt="Uploaded Image"
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Drag and Drop To upload</Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => setImageUrl("")}>
            <Delete />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            component="span"
            onClick={() => inputRef.current.click()}
          >
            Upload
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}

function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = useState(false)
  // ref
  const inputRef = useRef(null)

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
    }
  }

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <Box
      sx={{
        display: "block",
        bgcolor: "#aaa",
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            hidden
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          ></label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </Box>
    </Box>
  )
}

function DragAndDropHandler(props) {
  const thumb = {}
  const thumbInner = {}
  const thumbsContainer = {}
  const img = {}
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  )
}
