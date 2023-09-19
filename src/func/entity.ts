import { MainContextType } from "../components/MainLayout"
import { apiUrl } from "../consts"
import { CategoryItem, EntityCategory } from "../type"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase-app"
import { randomString } from "../utils/stringUtils"
export async function saveEnttiy(
  entity: CategoryItem,
  category: EntityCategory,
  mainContext: MainContextType,
  files: File[] = []
) {
  if (files.length) {
    console.log("will upload files")
    const storageRef = ref(
      storage,
      "images/" +
        mainContext.categories[category].header.name +
        "/" +
        entity.code +
        "-" +
        randomString(16) +
        ".png"
    )

    await uploadBytes(storageRef, files[0])
    const downloadUrl = await getDownloadURL(storageRef)
    entity.img = downloadUrl
  }
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
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(entity),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function deleteEntity(
  category: EntityCategory,
  mainContext: MainContextType
) {
  const newCategories = [...mainContext.categories]
  const newCategory = {
    ...newCategories[category],
    items: [...(newCategories[category].items ?? [])],
  }
  newCategory.items.pop()

  //remove the entity from newCategory
  const url =
    apiUrl +
    "info/" +
    EntityCategory[category].toLowerCase() +
    "/" +
    newCategory.items.length

  newCategories[category] = newCategory
  mainContext.setCategories(newCategories)
  await fetch(url, {
    method: "DELETE",
  })
}
