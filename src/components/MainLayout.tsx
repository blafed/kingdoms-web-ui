import { AppBar, Box, Button, Toolbar } from "@mui/material"
import CategoryView from "./CategoryView"
import { CategoryData } from "../type"
import { useEffect, useState } from "react"
import { apiUrl } from "../consts"

export default function MainLayout() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [categoryIndex, setCategoryIndex] = useState(0)

  useEffect(() => {
    fetch(apiUrl + "info/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])
  return (
    <Box>
      <MainBar
        selected={categoryIndex}
        onChange={(x) => setCategoryIndex(x)}
        categories={categories}
      />

      <Box sx={{ mt: 8 }}>
        {categories.length && (
          <CategoryView category={categories[categoryIndex]} />
        )}
      </Box>
    </Box>
  )
}

function MainBar(props: {
  selected: number
  categories: CategoryData[]
  onChange: (index: number) => void
}) {
  const { categories } = props
  return (
    <AppBar color="inherit">
      <Toolbar>
        <Box
          sx={{ gap: 3, display: "flex", width: 1, justifyContent: "center" }}
        >
          {categories.map((category, index) => {
            const isSelected = index == props.selected
            return (
              <Button
                variant={isSelected ? "outlined" : "text"}
                sx={{}}
                onClick={() => props.onChange(index)}
                color={isSelected ? "secondary" : "inherit"}
              >
                {category.header.displayName}
              </Button>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
