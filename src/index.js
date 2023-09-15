import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BuildingsPage from "./pages/BuildingsPage"
import ArtifactsPage from "./pages/ArtifactsPage"
import CommoditiesPage from "./pages/CommoditiesPage"
import ItemsPage from "./pages/ItemsPage"
import TrainablesPage from "./pages/TrainablesPage"
import FactionsPage from "./pages/FactionsPage"
import ResourcesPage from "./pages/ResourcesPage"
const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/buildings",
    element: <BuildingsPage />,
  },

  {
    path: "/artifacts",
    element: <ArtifactsPage />,
  },

  {
    path: "commodities",
    element: <CommoditiesPage />,
  },
  {
    path: "items",
    element: <ItemsPage />,
  },

  {
    path: "trainables",
    element: <TrainablesPage />,
  },
  {
    path: "factions",
    element: <FactionsPage />,
  },
  {
    path: "resources",
    element: <ResourcesPage />,
  },
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
