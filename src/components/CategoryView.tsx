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
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { apiUrl } from "../consts"
import { Add, Delete } from "@mui/icons-material"
import { MainLayoutContext } from "./MainLayout"
import Details from "./Details"
export default function CategoryView(props: {
  hidden: boolean
  category: CategoryData
}) {
  //   const [items, setItems] = useState<CategoryItem[]>([])
  const [selected, setSelected] = useState<number>(0)

  const context = useContext(MainLayoutContext)

  const items = props.category.items

  useLayoutEffect(() => {
    fetch(apiUrl + "info/" + props.category.header.name)
      .then((res) => res.json())
      .then((data) => {
        const categories = context.categories
        const myCategoryIndex = categories.indexOf(props.category)
        categories[myCategoryIndex].items = data
        context.setCategories(categories)
      })
  }, [])

  const { category } = props

  if (!items || !items[selected]) return <></>
  return (
    <Box sx={{ px: 2, display: props.hidden ? "none" : "inherit" }}>
      <Header category={category} />
      <Box sx={{ height: "1rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={3}>
          <ItemsListView
            selected={selected}
            onSelect={setSelected}
            items={items}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={9}>
          <Details
            itemIndex={selected}
            category={category}
            item={items[selected]}
          />
          {/* <DetailsView category={props.category} item={items[selected]} /> */}
        </Grid>
      </Grid>
    </Box>
  )
}

function Header(props: { category: CategoryData }) {
  const { category } = props
  return (
    <Paper sx={{ p: 2 }}>
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
      <List sx={{ minHeight: "80vh", maxHeight: "80vh", overflowY: "auto" }}>
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
