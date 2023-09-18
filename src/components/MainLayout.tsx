import { AppBar, Box, Button, Toolbar } from "@mui/material"
import CategoryView from "./CategoryView"
import { CategoryData } from "../type"
import { useEffect, useLayoutEffect, useState } from "react"
import { apiUrl } from "../consts"
import { createContext } from "react"

const mainContextDefaultValue = {
  categories: [] as CategoryData[],
  categoryIndex: 0,
  setCategoryIndex: (index: number) => {
    return
  },

  setCategories: (categories: CategoryData[]) => {
    return
  },
}
export const MainLayoutContext = createContext<typeof mainContextDefaultValue>(
  mainContextDefaultValue
)

export default function MainLayout() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [categoryIndex, setCategoryIndex] = useState(0)

  useLayoutEffect(() => {
    fetch(apiUrl + "info/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])

  if (categories.length == 0) return <></>
  return (
    <MainLayoutContext.Provider
      value={{
        categories,
        categoryIndex,
        setCategoryIndex,
        setCategories: setCategories,
      }}
    >
      <Box>
        <MainBar
          selected={categoryIndex}
          onChange={(x) => setCategoryIndex(x)}
          categories={categories}
        />

        <Box sx={{ mt: 8 }}>
          {categories.map((category, index) => (
            <CategoryView
              key={index}
              hidden={categoryIndex != index}
              category={category}
            />
          ))}
        </Box>
      </Box>
    </MainLayoutContext.Provider>
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
