type FieldInfo = {
  type: "code" | "unique_name" | "text" | "textarea" | "img"
  name: string
  label: string

  defaultValue?: string
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

  [key: string]: string | number
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

export type { FieldInfo, CategoryData, CategoryItem, EntityInfo, ResourceInfo }
