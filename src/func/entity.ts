import { MainContextType } from "../components/MainLayout"
import { apiUrl } from "../consts"
import { CategoryItem, EntityCategory } from "../type"

export async function saveEnttiy(
  entity: CategoryItem,
  category: EntityCategory,
  mainContext: MainContextType
) {
  const url =
    apiUrl +
    "info/" +
    EntityCategory[category].toLowerCase() +
    "/" +
    entity.code
  const newCategories = [...mainContext.categories]
  const newCategory = {
    ...newCategories[category],
    items: [...(newCategories[category].items ?? [])],
  }
  if (entity.code >= newCategory.items.length) {
    newCategory.items.push(entity)
  } else {
    newCategory.items[entity.code] = entity
  }
  newCategories[category] = newCategory
  mainContext.setCategories(newCategories)
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(entity),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
