import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  Paper,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Breadcrumbs,
  TextField,
  FormLabel,
} from "@mui/material"
import { CategoryData, CategoryItem } from "../type"
import { useEffect, useState } from "react"
import { apiUrl } from "../consts"
import { Add, Delete } from "@mui/icons-material"
import DetailsView from "./DetailsView"
export default function CategoryView(props: {
  hidden: boolean
  category: CategoryData
}) {
  const [items, setItems] = useState<CategoryItem[]>([])
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    fetch(apiUrl + "info/" + props.category.header.name)
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [props.category.header.name])

  const { category } = props
  return (
    <Box sx={{ px: 2, display: props.hidden ? "none" : "inline" }}>
      <Header category={category} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={3}>
          <ItemsListView
            selected={selected}
            onSelect={setSelected}
            items={items}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={9}>
          <DetailsView category={props.category} item={items[selected]} />
        </Grid>
      </Grid>
    </Box>
  )
}

function Header(props: { category: CategoryData }) {
  const { category } = props
  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Box
        sx={{
          w: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <Typography variant="h4">{category.header.displayName}</Typography>
        </Box>
        <Box sx={{}}>
          <Typography variant="h6">{category.header.description}</Typography>
        </Box>
        <Divider />
      </Box>
    </Paper>
  )
}

function ItemsListView(props: {
  selected: number
  items: CategoryItem[]
  onSelect: (index: number) => void
}) {
  return (
    <Paper sx={{ p: 1 }}>
      <Toolbar>
        <Button variant="outlined" startIcon={<Add />}>
          Add
        </Button>
        <Box flexGrow={1} />
        <IconButton color="error">
          <Delete />
        </IconButton>
      </Toolbar>
      <Divider sx={{ my: 2 }}>Items</Divider>
      <List sx={{ maxHeight: "80vh", overflowY: "auto" }}>
        {props.items.map((item, index) => {
          return (
            <ListItemButton
              selected={index == props.selected}
              onClick={() => props.onSelect(index)}
            >
              <Typography
                variant="h6"
                fontWeight={index == props.selected ? "bold" : "inherit"}
              >
                {item.displayName}
              </Typography>
              <Box flexGrow={1} />
              <Typography
                fontWeight={index == props.selected ? "bold" : "inherit"}
              >
                {item.code}
              </Typography>
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )
}
