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
  Grow,
  Collapse,
  ButtonBase,
} from "@mui/material"
import { useContext, useRef, useState } from "react"
import { FieldInfo, FieldType, EntityCategory } from "../type"
import { CategoryItemContext } from "./Details"
import { MainLayoutContext } from "./MainLayout"
import {
  Add,
  Category,
  ContentCopy,
  Delete,
  Expand,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material"
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
        <Typography textAlign={"center"}>
          <em>Code </em> {value}
        </Typography>
      )
    // return (
    //   <TextField
    //     label={label}
    //     helperText={field.help}
    //     disabled
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //   />
    // )
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
          fullWidth
          label={label}
          helperText={field.help}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )

    case FieldType.textarea:
      return (
        <TextField
          fullWidth
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
          fullWidth
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
          fullWidth
          label={label}
          helperText={field.help}
          type="number"
          value={value + ""}
          onChange={(e) =>
            setValue(
              Math.max(
                Math.min(parseInt(e.target.value), 9007199254740991),
                -9007199254740991
              )
            )
          }
        />
      )

    case FieldType.toggle:
      return (
        <Box sx={{}}>
          <FormControlLabel
            labelPlacement="top"
            label={<InputLabel>{label}</InputLabel>}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputLabel>{label}</InputLabel>
          <Box flexGrow={1} />
          <Box>
            <Box
              sx={{
                mt: 1,
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
          fullWidth
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
              gap: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Field
              value={value?.code ?? -1}
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
              value={value?.rate * 60 ?? 10}
              onChange={(v) => setValue({ ...value, rate: v / 60 })}
              field={{
                name: "",
                label: "Rate (per minute)",
                type: FieldType.rate,
              }}
            />
          </Box>
          <Box
            sx={{
              mt: 1,
              gap: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Field
              value={value?.limit ?? 9007199254740991}
              onChange={(v) => setValue({ ...value, limit: v })}
              field={{
                label: "Limit",
                name: "",
                type: FieldType.integer,
              }}
            />

            <Field
              value={value.initialValue ?? 0}
              onChange={(v) => setValue({ ...value, initialValue: v })}
              field={{
                label: "Initial value",
                name: "",
                type: FieldType.integer,
              }}
            />
          </Box>
        </Box>
      )

    case FieldType.select: {
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
            {field.selectItems?.map((x, i) => (
              <MenuItem value={field.selectValues?.[i]}>{x}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.help}</FormHelperText>
        </FormControl>
      )
    }

    case FieldType.multiselect: {
      const inputId = randomString(10)

      const array = [] as number[]

      //check on all the flags of 'value', and add the checked flag to the array

      for (let i = 0; i < 32; i++) {
        const flag = 1 << i
        if (value & flag) {
          array.push(flag)
        }
      }

      return (
        <FormControl sx={{ width: 1 }}>
          <InputLabel id={inputId}>{label}</InputLabel>
          <Select
            multiple
            label={field.label}
            labelId={inputId}
            fullWidth
            onChange={(e) => {
              const intArray = e.target.value as number[]
              console.log(intArray)
              //convert 'value' to flags made of its elements, the combinging of all the flags will be the new value
              let newValue = 0
              for (let i = 0; i < intArray.length; i++) {
                newValue |= intArray[i]
              }
              console.log(newValue)
              setValue(newValue)
            }}
            value={array}
          >
            {field.selectItems?.map((x, i) => (
              <MenuItem value={field.selectValues?.[i]}>{x}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.help}</FormHelperText>
        </FormControl>
      )
    }

    case FieldType.img: {
      return (
        <Box
          sx={{
            disaply: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputLabel>{label}</InputLabel>
          <ImageField value={value} onChange={(v) => setValue(v)} />
          <FormHelperText>{field.help}</FormHelperText>
        </Box>
      )
    }

    case FieldType.fighting_stats: {
      type FightingProps = {
        offense: number
        spy: number
      }
      const attack = value.attack ?? ({} as FightingProps)
      const defense = value.defense ?? ({} as FightingProps)
      return (
        <Box>
          <InputLabel>{label}</InputLabel>
          {[""]}

          <Box
            sx={{
              mt: 2,
              gap: 1,
              display: "flex",
              justifyContent: "center",
              aligntItems: "center",
              flexDirection: "column",
            }}
          >
            {["offense", "spy"].map((cat: string) => {
              return (
                <Box
                  sx={{
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    aligntItems: "center",
                  }}
                >
                  <Field
                    field={{
                      name: "",
                      label: cat + " attack",
                      type: FieldType.integer,
                    }}
                    onChange={(v) =>
                      setValue({
                        ...value,
                        attack: { ...attack, [cat]: v },
                      })
                    }
                    value={attack[cat]}
                  />

                  <Field
                    field={{
                      name: "",
                      label: cat + " Defense",
                      type: FieldType.integer,
                    }}
                    onChange={(v) =>
                      setValue({
                        ...value,
                        defense: { ...defense, [cat]: v },
                      })
                    }
                    value={defense[cat]}
                  />
                </Box>
              )
            })}
          </Box>
          <FormHelperText>{field.help}</FormHelperText>
        </Box>
      )
    }

    case FieldType.resource_effect:
      return (
        <Box
          sx={{
            display: "flex",
            w: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Field
            field={{
              name: "",
              label: "Resource",
              type: FieldType.entity_id,
              entityCategory: EntityCategory.Resource,
            }}
            value={value?.resource ?? 0}
            onChange={(v) => setValue({ ...value, code: v })}
          />
          <Field
            field={{
              name: "",
              label: "Operation",
              type: FieldType.select,
              selectItems: ["Add", "Multiply", "Set"],
              selectValues: [0, 1, 2],
            }}
            onChange={(v) => setValue({ ...value, op: v })}
            value={value?.op ?? 0}
          />
          <Field
            field={{
              name: "",
              label: "Amount",
              type: FieldType.number,
            }}
            value={value?.amount ?? 0}
            onChange={(v) => setValue({ ...value, amount: v })}
          />
        </Box>
      )
      break

    case FieldType.time_duration: {
      const [timeUnit, setTimeUnit] = useState<number>(3600)
      return (
        <Box>
          <InputLabel>{label}</InputLabel>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Field
                field={{
                  name: "",
                  type: FieldType.rate,
                }}
                value={value / timeUnit}
                onChange={(v) => setValue(v * timeUnit)}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Field
                field={{
                  name: "",
                  label: "Time Unit",
                  type: FieldType.select,
                  selectItems: [
                    "Second",
                    "Minute",
                    "Hour",
                    "Day",
                    "Week",
                    "Month",
                    "Year",
                  ],

                  selectValues: [1, 60, 3600, 86400, 604800, 2592000, 31536000],
                }}
                value={timeUnit}
                onChange={(v) => setTimeUnit(v)}
              />
            </Box>
          </Box>
          <FormHelperText>{field.help}</FormHelperText>
        </Box>
      )
    }
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
  const [expanded, setExpanded] = useState<boolean>(true)

  const getLabel = (x: any) => {
    if (!field.listField) return "NO LIS TYPE"
    if (field.listField?.type == FieldType.entity_id) {
      const category = EntityCategory[field.listField?.entityCategory ?? -1]
      const item =
        categories[field.listField.entityCategory ?? -1].items?.[x] ?? null
      if (item) return item.displayName
      else return "None"
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
    if (field.listField?.type == FieldType.resource_effect) {
      const category = categories[field.listField.entityCategory ?? -1]
      const item = category.items?.[x.code] ?? null
      if (item) {
        const op = ["+", "*", "="]
        return item.displayName + " " + op[x.op] + " " + x.amount
      } else return "None"
    }
    return "hmm..."
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <InputLabel>{field.label}</InputLabel>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {!expanded ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Paper sx={{ p: 1 }} variant="outlined">
          <Box>
            <Button
              onClick={() => {
                const newValue = [...value]
                if (value.length > 0) newValue.push(value[value.length - 1])
                else newValue.push({})
                setValue(newValue)
              }}
              startIcon={<Add />}
            >
              Add
            </Button>
            <Button
              disabled={selected < 0 || selected >= value.length}
              onClick={() => {
                const newValue = [...value]
                newValue.push(value[selected])
                setValue(newValue)
              }}
              startIcon={<ContentCopy />}
            >
              Duplicate
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
                    selected == i ? setSelected(i) : setSelected(i)
                  }
                  selected={selected == i}
                >
                  {getLabel(x)}
                </ListItemButton>
              ))}
            </List>
          )}
          {selected >= 0 && value.length > 0 ? (
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
      </Collapse>
      <FormHelperText>{field.help}</FormHelperText>
    </Box>
  )
}

function ImageField(props: { value: string; onChange: (v: string) => void }) {
  const categoryItemContext = useContext(CategoryItemContext)
  const onFileChange = (file: File | null) => {
    if (!file) categoryItemContext.setFiles([])
    else categoryItemContext.setFiles([file])
  }
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePickClick = () => {
    inputRef.current?.click()
  }

  return (
    <Box sx={{ display: "flex" }}>
      <input
        onChange={(e) => {
          if (e.target.files) {
            if (e.target.files.length) {
              onFileChange(e.target.files[0])
            }
            e.target.files.length &&
              props.onChange(URL.createObjectURL(e.target.files[0]))
          }
        }}
        ref={inputRef}
        type="file"
        hidden
        accept="image/*.png"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonBase onClick={handlePickClick}>
          <Box sx={{ height: "10rem", width: "10rem", bgcolor: "#eee" }}>
            {props.value ? (
              <Box sx={{ h: 1, w: 1, height: 1, width: 1 }}>
                <img
                  src={props.value}
                  height={"100%"}
                  width={"100%"}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  w: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            )}
          </Box>
        </ButtonBase>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handlePickClick}>Pick Image</Button>
          <IconButton
            onClick={() => {
              onFileChange(null)
              props.onChange("")
            }}
            color="error"
          >
            <Delete></Delete>
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
