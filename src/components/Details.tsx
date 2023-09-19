import { Divider, Paper, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { createContext, useContext, useEffect, useState } from "react"
import { CategoryData, CategoryItem, FieldInfo } from "../type"
import { MainLayoutContext } from "./MainLayout"

import { saveEnttiy } from "../func/entity"
import DetailsActions from "./DetailsActions"
import Field from "./Field"

const defaultCategoryItemContext = {
  item: {} as CategoryItem,
  setItem: (item: CategoryItem) => {
    if (item) return
  },
  setFiles: (files: File[]) => {
    if (files) return
  },
  files: [] as File[],
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
  const [files, setFiles] = useState<File[]>([])

  const handleSave = () => {
    saveEnttiy(formItem, props.category.header.code, mainContext, files)
    setFiles([])
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
        files,
        setFiles,
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
