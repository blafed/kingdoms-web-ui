import {
  Button,
  ButtonGroup,
  Divider,
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
import { ContentPaste, CopyAll, Repeat, Save, Undo } from "@mui/icons-material"

import Field from "./Field"
import DetailsActions from "./DetailsActions"
import { saveEnttiy } from "../func/entity"

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
  const mainContext = useContext(MainLayoutContext)
  const [formItem, setFormItem] = useState<CategoryItem>(props.item)

  const [hasChanged, setHasChanged] = useState(false)
  const [copy, setCopy] = useState<CategoryItem | null>(null)

  const handleSave = () => {
    saveEnttiy(formItem, props.category.header.code, mainContext)
  }
  const handleReset = () => {
    setFormItem(props.item)
    setHasChanged(false)
  }
  const handleCopy = () => {
    setCopy(formItem)
  }
  const handlePaste = () => {
    if (!copy) return
    setFormItem({ ...copy, name: formItem.name, code: formItem.code })
    setHasChanged(true)
  }
  const handleDuplicate = () => {
    const cloneFrom = formItem
    const items = props.category.items ?? []
    const newEntity = {
      ...cloneFrom,
      code: items.length,
      name: cloneFrom.name + items.length,
    }
    saveEnttiy(newEntity, mainContext.categoryIndex, mainContext)
  }

  useEffect(() => {
    setFormItem(props.item)
  }, [props.item, props.itemIndex])

  useEffect(() => {
    setHasChanged(false)
  }, [props.itemIndex])

  return (
    <CategoryItemContext.Provider
      value={{
        item: formItem,
        setItem: (d: CategoryItem) => {
          setHasChanged(true)
          setFormItem(d)
        },
      }}
    >
      <Paper sx={{ w: 1, minHeight: "100vh" }}>
        <DetailsActions
          {...{
            hasCopy: !!copy,
            hasChanged,
            handleSave,
            handleReset,
            handleCopy,
            handlePaste,
            handleDuplicate,
          }}
        />
        <Divider sx={{ my: 1 }} />
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
