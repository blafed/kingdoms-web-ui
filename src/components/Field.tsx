import {
  TextField,
  Typography,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Switch,
  Box,
  List,
  ListItemButton,
  Button,
  IconButton,
  Paper,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material"
import { useContext, useState } from "react"
import { FieldInfo, FieldType, EntityCategory } from "../type"
import { CategoryItemContext } from "./Details"
import { MainLayoutContext } from "./MainLayout"
import { Category, Delete } from "@mui/icons-material"
import { randomString } from "../utils/stringUtils"

export default function Field(props: {
  field: FieldInfo
  value: any
  onChange: (v: any) => void
}) {
  const { field } = props

  //   const { item, setItem } = useContext(CategoryItemContext)
  const context = useContext(MainLayoutContext)
  const { categories } = context

  const label = field.label ? field.label : field.name
  const help = field.help ? field.help : ""

  const value = props.value

  const name = field.name
  //   const [name, setName] = useState(field.name)
  //   const value = item[name] as any

  //   useEffect(() => {
  //     setName(field.name)
  //   }, [field.name])

  const setValue = (value: any) => {
    props.onChange(value)
    // if (!setItem) return
    // const newItem = { ...item }
    // newItem[name] = value
    // // setDescendantProp(newItem, name, value)
    // setItem(newItem)
  }

  switch (field.type) {
    case FieldType.code:
      return (
        <TextField
          label={label}
          helperText={field.help}
          disabled
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )
    // case FieldType.unique_name:
    //   return (
    //     <TextField
    //       label={label}
    //       helperText={field.help}
    //       disabled
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //     />
    //   )

    case FieldType.text:
      return (
        <TextField
          label={label}
          helperText={field.help}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )

    case FieldType.textarea:
      return (
        <TextField
          multiline
          minRows={2}
          label={label}
          helperText={field.help}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )

    case FieldType.entity_id: {
      const category = categories[field.entityCategory ?? -1]
      const categoryItems = category.items
      console.log(field.entityCategory)
      console.log(category)

      const inputId = randomString(10)
      return (
        <FormControl sx={{ width: 1 }}>
          <InputLabel id={inputId}>{label}</InputLabel>
          <Select
            label={field.label}
            labelId={inputId}
            fullWidth
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {categoryItems?.map((x) => (
              <MenuItem value={x.code}>
                {x.displayName ? x.displayName : x.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.help}</FormHelperText>
        </FormControl>
      )
    }

    case FieldType.number:
      return (
        <TextField
          label={label}
          helperText={field.help}
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
      )

    case FieldType.integer:
      return (
        <TextField
          label={label}
          helperText={field.help}
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
        />
      )

    case FieldType.toggle:
      return (
        <Box sx={{}}>
          <FormControlLabel
            labelPlacement="top"
            label={label}
            control={
              <Switch
                value={value}
                onChange={(e) => setValue(e.target.checked)}
              />
            }
          />
          <FormHelperText>{help}</FormHelperText>
        </Box>
      )

    case FieldType.point2:
      return (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              type="number"
              value={value.x}
              label="X"
              onChange={(e) =>
                setValue({ ...value, x: parseInt(e.target.value, 10) })
              }
            />
            <TextField
              label="Y"
              type="number"
              value={value.y}
              onChange={(e) =>
                setValue({ ...value, y: parseInt(e.target.value, 10) })
              }
            />
          </Box>
          <FormHelperText>{help}</FormHelperText>
        </Box>
      )

    case FieldType.keyvalue:
      return (
        <Box>
          <FormLabel>{label}</FormLabel>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {!field.keyField ? null : (
              <Field
                field={field.keyField as FieldInfo}
                value={value.key}
                onChange={(v) => setValue({ ...value, key: v })}
              />
            )}

            {!field.valueField ? null : (
              <Field
                field={field.valueField as FieldInfo}
                value={value.value}
                onChange={(v) => setValue({ ...value, value: v })}
              />
            )}
          </Box>
          <FormHelperText>{help}</FormHelperText>
        </Box>
      )

    case FieldType.rate:
      return (
        <TextField
          label={label}
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
      )

    case FieldType.entity_quantity:
      return (
        <CategoryItemContext.Provider
          value={{
            item: value ?? {},
            setItem: setValue,
          }}
        >
          <Box>
            <FormLabel>{label}</FormLabel>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Field
                field={{
                  name: "code",
                  type: FieldType.entity_id,
                  entityCategory: field.entityCategory,
                  label: EntityCategory[field?.entityCategory ?? -1] ?? "Code",
                }}
                value={value?.code ?? -1}
                onChange={(v) => setValue({ ...value, code: v })}
              />

              <Field
                field={{
                  name: "quantity",
                  type: FieldType.integer,
                  label: "Quantity",
                }}
                value={value?.quantity ?? 0}
                onChange={(v) => setValue({ ...value, quantity: v })}
              />
            </Box>
            <FormHelperText>{help}</FormHelperText>
          </Box>
        </CategoryItemContext.Provider>
      )

    case FieldType.list:
      return (
        <ListField value={value} field={field} onChange={(v) => setValue(v)} />
      )

    case FieldType.entity_quantity_gain:
      return (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Field
              value={value.code}
              onChange={(v) => setValue({ ...value, code: v })}
              field={{
                name: "",
                label:
                  categories[field?.entityCategory ?? -1]?.header.displayName,
                type: FieldType.entity_id,
                entityCategory: field.entityCategory,
              }}
            />

            <Field
              value={value.rate * 60}
              onChange={(v) => setValue({ ...value, rate: v / 60 })}
              field={{
                name: "",
                label: "Rate (per minute)",
                type: FieldType.rate,
              }}
            />

            <Field
              value={value.limit}
              onChange={(v) => setValue({ ...value, limit: v })}
              field={{
                name: "",
                type: FieldType.integer,
              }}
            />

            <Field
              value={value.initialValue}
              onChange={(v) => setValue({ ...value, initialValue: v })}
              field={{
                name: "",
                type: FieldType.integer,
              }}
            />
          </Box>
        </Box>
      )

    //     case FieldType.list:
    //       return (
    //         <Box sx={{}}>
    //           <Typography>{label}</Typography>
    //           <List sx={{ maxHeight: "10rem" }}>
    //             {(value as any[]).map((x) => (
    //               <ListItemButton>{x}</ListItemButton>
    //             ))}
    //           </List>
    //           <Button startIcon={<Add></Add>}></Button>
    //           <Typography variant="subtitle1">{field.help}</Typography>
    //         </Box>
    //       )
    //       break
  }
}

function ListField(props: {
  value: any[]
  field: FieldInfo
  onChange: (v: any[]) => void
}) {
  const { categories } = useContext(MainLayoutContext)
  const { value, field, onChange: setValue } = props
  const [selected, setSelected] = useState<number>(-1)

  const getLabel = (x: any) => {
    if (!field.listField) return "NO LIS TYPE"
    if (field.listField?.type == FieldType.entity_id) {
      const category = EntityCategory[field.listField?.entityCategory ?? -1]
      const item =
        categories[field.listField.entityCategory ?? -1].items?.[x] ?? null
      if (item) return item.displayName
      else return category
    }
    if (field.listField?.type == FieldType.entity_quantity) {
      const category = categories[field.listField.entityCategory ?? -1]
      const item = category.items?.[x.code] ?? null
      if (item) return item.displayName + " " + x.quantity
      else return "None"
    }
    if (field.listField?.type == FieldType.entity_quantity_gain) {
      const category = categories[field.listField.entityCategory ?? -1]
      const item = category.items?.[x.code] ?? null
      if (item) return item.displayName
      else return "None"
    }
    return "hmm..."
  }

  return (
    <Box>
      <FormLabel>{field.label}</FormLabel>
      <Paper sx={{ p: 1 }} variant="outlined">
        <Box>
          <Button
            onClick={() => {
              const newValue = [...value]
              newValue.push({})
              setValue(newValue)
            }}
          >
            Add
          </Button>
          <IconButton
            disabled={selected < 0 || selected >= value.length}
            color="error"
            onClick={() => {
              if (selected < 0 || selected >= value.length) return
              const newValue = [...value]
              newValue.splice(selected, 1)
              setValue(newValue)
              if (newValue.length == 0) setSelected(-1)
            }}
          >
            <Delete></Delete>
          </IconButton>
        </Box>
        <Divider />
        {!value.length ? (
          <Typography>
            <em>List is empty</em>
          </Typography>
        ) : (
          <List
            sx={{
              my: 2,
              bgcolor: "#eee",
              maxHeight: "20rem",
              overflowY: "auto",
            }}
          >
            {value.map((x, i) => (
              <ListItemButton
                onClick={() =>
                  selected == i ? setSelected(-1) : setSelected(i)
                }
                selected={selected == i}
              >
                {getLabel(x)}
              </ListItemButton>
            ))}
          </List>
        )}
        {selected >= 0 ? (
          <Field
            //   value={(value as any[])[]}
            field={field.listField as FieldInfo}
            value={value[selected]}
            onChange={(v) => {
              const newValue = [...value]
              newValue[selected] = v
              setValue(newValue)
            }}
          />
        ) : null}
      </Paper>
      <FormHelperText>{field.help}</FormHelperText>
    </Box>
  )
}
