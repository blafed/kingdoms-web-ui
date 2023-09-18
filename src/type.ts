enum EntityCategory {
  Resource,
  Troop,
  Building,
  Commodity,
  Item,
  Faction,
  Ground,
}
enum TimeUnit {
  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
  Year,
}
enum FieldType {
  code,
  unique_name,
  text,
  textarea,
  img,

  toggle,
  number,
  integer,

  entity_id,

  point2,
  list,
  keyvalue,
  rate,

  entity_quantity_gain,
  entity_quantity,

  fighting_stats,

  select,
  multiselect,
  resource_effect,
  time_duration,
}
type FieldInfo = {
  type: FieldType
  name: string
  label?: string
  group?: string
  help?: string
  regex?: string
  selectValues?: number[]
  multiselectValues?: number[]

  minLength?: number
  maxLength?: number

  listField?: FieldInfo | null
  keyField?: FieldInfo | null
  valueField?: FieldInfo | null
  timeUnit?: TimeUnit

  entityCategory?: EntityCategory
}

type CategoryData = {
  header: CategoryItem
  fields: FieldInfo[]
  items?: CategoryItem[]
}

type CategoryItem = {
  code: number
  name: string
  displayName: string
  description: string
  img: string

  [key: string]: string | number | object | any[]
}

type EntityInfo = {
  code: number
  name: string
  displayName: string
  description: string
  img: string

  [key: string]: string | number
}

type ResourceInfo = EntityInfo & {
  isDecimal: boolean
  isPercent: boolean

  maxValue: number
  limited: boolean
  minValue: number
}

type Point2 = {
  x: number
  y: number
}

type ListPairs<K, V> = {
  items: { key: K; value: V }[]
}

type FightingProps = {
  offense: number
  spy: number
}

type FightingStats = {
  attack: FightingProps
  defense: FightingProps
}

type ResourceCode = number

type TargetQuantity = {
  target: number
  quantity: number
}
type TargetAmount = {
  target: number
  amount: number
}

type ResourceQuantity = {
  code: ResourceCode
  quantity: number
}

type ResourceGain = {
  code: ResourceCode
  rate: number
  limit: number
  initialValue: number
}
type EntityQuantityGain = {
  code: number
  rate: number
  limit: number
  initialValue: number
}

export type {
  FieldInfo,
  CategoryData,
  CategoryItem,
  EntityInfo,
  ResourceInfo,
  Point2,
  ListPairs,
  FightingProps,
  FightingStats,
  ResourceCode,
  TargetQuantity,
  TargetAmount,
  ResourceQuantity,
  ResourceGain,
  EntityQuantityGain,
  TimeUnit,
}

export { FieldType, EntityCategory }
