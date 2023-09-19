import {
  CopyAll,
  ContentPaste,
  Undo,
  Save,
  Add,
  ContentCopy,
} from "@mui/icons-material"
import { Box, Typography, ButtonGroup, Button } from "@mui/material"

export default function DetailsActions(props: {
  hasCopy: boolean
  hasChanged: boolean
  handleSave: () => void
  handleReset: () => void
  handleCopy: () => void
  handlePaste: () => void
  handleDuplicate: () => void
}) {
  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          display: "none",
        }}
      >
        This element has been changed, to apply the changes click save
      </Typography>
      <ButtonGroup>
        <Button onClick={props.handleDuplicate} startIcon={<ContentCopy />}>
          Duplicate
        </Button>
        <Button onClick={props.handleCopy} startIcon={<CopyAll />}>
          Copy
        </Button>
        <Button
          onClick={props.handlePaste}
          disabled={!props.hasCopy}
          startIcon={<ContentPaste />}
        >
          Paste
        </Button>
      </ButtonGroup>
      <Box flexGrow={1}></Box>

      <ButtonGroup sx={{ display: !props.hasChanged ? "none" : "inherit" }}>
        <Button
          onClick={props.handleReset}
          startIcon={<Undo />}
          color="warning"
        >
          Discard Changes
        </Button>
        <Button
          startIcon={<Save />}
          variant="contained"
          onClick={props.handleSave}
        >
          Save
        </Button>
      </ButtonGroup>
    </Box>
  )
}
