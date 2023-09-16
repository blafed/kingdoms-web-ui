import React from "react"
import MainLayout from "../components/MainLayout"
import EntityList from "../components/EntityList"
import { apiUrl } from "../consts"

export default function ResourcesPage() {
  const resourceItems = fetch(apiUrl + "forms/resources")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  return (
    <>
      <MainLayout>
        <EntityList />
      </MainLayout>
    </>
  )
}
