import {
  Button,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  List,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { Box, Stack } from "@mui/system"
import {
  CategoryData,
  CategoryItem,
  EntityCategory,
  FieldInfo,
  FieldType,
} from "../type"
import { createContext, useContext, useEffect, useState } from "react"
import { MainLayoutContext } from "./MainLayout"
import { getDescendantProp, setDescendantProp } from "../utils/objectUtils"
import { Add } from "@mui/icons-material"

import Field from "./Field"

const defaultCategoryItemContext = {
  item: {} as CategoryItem,
  setItem: (item: CategoryItem) => {
    return
  },
}

export const CategoryItemContext = createContext<
  typeof defaultCategoryItemContext
>(defaultCategoryItemContext)

export default function Details(props: {
  item: CategoryItem
  category: CategoryData
  itemIndex: number
}) {
  const [formItem, setFormItem] = useState<CategoryItem>(props.item)

  useEffect(() => {
    setFormItem(props.item)
  }, [props.item, props.itemIndex])

  return (
    <CategoryItemContext.Provider
      value={{ item: formItem, setItem: setFormItem }}
    >
      <Paper sx={{ w: 1, minHeight: "100vh" }}>
        <Box sx={{ w: 1, display: "flex", justifyContent: "center" }}>
          <Stack spacing={3} sx={{ width: "40rem" }}>
            <Typography variant="h1" textAlign={"center"}>
              {formItem.displayName}
            </Typography>
            <Stack spacing={2}>
              <FieldView fields={props.category.fields} />
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </CategoryItemContext.Provider>
  )
}

function FieldView(props: { fields: FieldInfo[] }) {
  const { item, setItem } = useContext(CategoryItemContext)
  return (
    <>
      {props.fields.map((field) =>
        field.group && !item[field.group] ? (
          <></>
        ) : (
          <Field
            value={item[field.name]}
            onChange={(v) => {
              const newItem = { ...item }
              newItem[field.name] = v
              setItem(newItem)
            }}
            field={field}
          />
        )
      )}
    </>
  )
}
