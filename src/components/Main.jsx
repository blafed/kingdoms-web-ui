import {
  AppBar,
  List,
  ListItem,
  Toolbar,
  Box,
  Button,
  ButtonBase,
  Typography,
  Grid,
  Paper,
  Listitem,
  Icon,
  ListItemButton,
  Divider,
  IconButton,
  ListItemText,
  TextField,
  ToggleButton,
  Switch,
  Stack,
} from "@mui/material"
import { useBasics } from "./BasicsProvider"
import { useEffect, useLayoutEffect, useState } from "react"
import { Add, Delete } from "@mui/icons-material"
import { apiUrl } from "../consts"
import { ListItemPrefix, ListItemSuffix } from "@material-tailwind/react"
import { MyTextAreaField, MyTextField } from "./inputs"
import basicsDefaultValue from "../basicsDefaultValue"
import ImgField from "./FileUpload"

export default function () {
  const basics = useBasics()
  const { entityCategories } = basics

  const [selected, setSelected] = useState(0)
  const [selectedItem, setSelectedItem] = useState(0)

  const [items, setItems] = useState([])
  var cat = entityCategories[selected]
  const fieldTypes = basics.fieldTypes

  useEffect(() => {
    fetch(apiUrl + "info/" + cat.name)
      .then((res) => res.json())
      .then((res) => {
        setItems(res)
      })
  }, [selected])

  return (
    <Box>
      <AppBar color="primary">
        <Toolbar style={{ justifyContent: "center" }}>
          {entityCategories.map((category, index) => {
            return (
              <ButtonBase
                onClick={() => setSelected(index)}
                sx={{ p: 2 }}
                color="inherit"
                key={index}
              >
                <Typography>{category.displayName}</Typography>
              </ButtonBase>
            )
          })}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, p: 2 }}>
        <Box sx={{ w: 1, display: "flex", justifyContent: "center" }}>
          <Typography fontSize="2rem">{cat.displayName + "s"}</Typography>
        </Box>
        <Box sx={{ w: 1, display: "flex", justifyContent: "center" }}>
          <Typography fontSize="1rem">{cat.description}</Typography>
        </Box>
        <Divider />
        <Grid sx={{ mt: 2 }} container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, minHeight: "100vh" }}>
              <Box
                sx={{
                  spacing: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography>All Elements</Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton sx={{ mx: 1 }} color="error" onClick={() => {}}>
                  <Delete />
                </IconButton>
                <Button variant="contained" startIcon={<Add />}>
                  Add
                </Button>
              </Box>
              <Divider />
              <Box>
                <List sx={{ maxHeight: "100vh", overflowY: "auto" }}>
                  {items.map((x) => (
                    <ListItemButton
                      style={{
                        fontWeight: selectedItem == x.code ? "bold" : "inherit",
                      }}
                      onClick={() => setSelectedItem(x.code)}
                      selected={selectedItem == x.code}
                      key={x.code}
                    >
                      <ListItemPrefix>{<img src={x.img} />}</ListItemPrefix>
                      {x.displayName}
                      <ListItemSuffix>{x.code}</ListItemSuffix>
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={9} xs={12}>
            <Paper sx={{ w: 1, p: 2, minHeight: "100vh" }}>
              <Box
                sx={{
                  display: "flex",
                  minWidth: "100%",
                  justifyContent: "center",
                }}
              >
                <Typography>{selectedItem}</Typography>
                <Box flexGrow={1} />
                <Button variant="contained">Save</Button>
              </Box>
              <Form selectedCat={selected} item={items[selectedItem]} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

function Form({ selectedCat = 0, item = {} }) {
  const basics = useBasics()
  const { entityCategories } = basics
  const cat = entityCategories[selectedCat]
  const fieldTypes = basics.fieldTypes

  return (
    <Box sx={{ maxWidth: "40rem", mx: "auto" }}>
      <form>
        <Stack spacing={2}>
          {cat.form.fields.map((field, index) => {
            return fieldTypes[field.type] == "image" ? (
              <ImgField />
            ) : (
              <>
                <MyTextField
                  multiline={fieldTypes[field.type] == "textarea"}
                  fullWidth
                  disabled={fieldTypes[field.type] == "readonly"}
                  key={index}
                  label={field.label}
                  defaultValue={item[field.name]}
                />
              </>
            )
          })}
        </Stack>
      </form>
    </Box>
  )
}

// function DrawFields(category) {
//   return category.form.fields.map((field, index) => {
//     return (
//       <Grid item xs={12} md={6} key={index}>
//         <Paper sx={{ p: 2 }}>
//           <Typography>{field.label}</Typography>
//         </Paper>
//       </Grid>
//     )
//   })
// }
