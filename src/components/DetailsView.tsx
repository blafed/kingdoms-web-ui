// import {
//   Box,
//   Divider,
//   Grid,
//   List,
//   ListItemButton,
//   Paper,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Stack,
//   Breadcrumbs,
//   TextField,
//   FormLabel,
//   ButtonBase,
//   Switch,
//   FormControl,
//   FormControlLabel,
// } from "@mui/material"
// import FormGroup from "@mui/material"
// import { CategoryData, CategoryItem, EntityInfo, ResourceInfo } from "../type"
// import { useContext, useEffect, useRef, useState } from "react"
// import { apiUrl } from "../consts"
// import { Add, Delete, Lock } from "@mui/icons-material"
// import { randomString, snake_case_string } from "../utils/stringUtils"
// import { storage } from "../firebase-app"
// import {
//   getDownloadURL,
//   ref,
//   uploadBytes,
//   uploadString,
// } from "firebase/storage"
// import { createContext } from "vm"
// async function saveEntityChanges(
//   category: CategoryData,
//   item: EntityInfo,
//   img: File | null
// ) {
//   if (img) {
//     const storageRef = ref(
//       storage,
//       "images/" +
//         category.header.name +
//         "/" +
//         item.code +
//         randomString(6) +
//         ".png"
//     )
//     await uploadBytes(storageRef, img)
//     const downloadUrl = await getDownloadURL(storageRef)
//     item.img = downloadUrl
//   }
//   fetch(apiUrl + "info/" + category.header.name + "/" + item.code, {
//     method: "PUT",
//     body: JSON.stringify(item),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// }

// function Toggle(props: {
//   label: string
//   value: boolean
//   onChange: (value: boolean) => void
// }) {
//   return (
//     <FormControlLabel
//       control={
//         <Switch
//           value={props.value}
//           onChange={(e) => props.onChange(e.target.checked)}
//         />
//       }
//       label={props.label}
//     />
//   )
// }
// export default function DetailsView(props: {
//   category: CategoryData
//   item: CategoryItem
//   onItemsChange: (items: CategoryItem[]) => void
// }) {
//   const [item, setItem] = useState(props.item)
//   const [lockUniqueName, setLockUniqueName] = useState(true)
//   const [imageFile, setImageFile] = useState<File | null>(null)

//   useEffect(() => {
//     setItem(props.item)
//     setImageFile(null)
//   }, [props.item])

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     saveEntityChanges(props.category, item, imageFile)
//   }
//   if (!item) return <></>

//   let AdditionalFields = <></>

//   switch (props.category.header.name) {
//     case "resource":
//       {
//         const resource = item as ResourceInfo
//         AdditionalFields = (
//           <>
//             <Toggle
//               label="Is Decimal"
//               value={resource.isDecimal}
//               onChange={(v) =>
//                 setItem({ ...item, isDecimal: v } as ResourceInfo)
//               }
//             />
//             <Toggle
//               label="Is Percentage"
//               value={resource.isPercent}
//               onChange={(v) =>
//                 setItem({ ...item, isPercent: v } as ResourceInfo)
//               }
//             />

//             <Toggle
//               label="Use Limits"
//               value={resource.useLimits}
//               onChange={(v) =>
//                 setItem({ ...item, useLimits: v } as ResourceInfo)
//               }
//             />
//           </>
//         )
//       }
//       break
//   }

//   return (
//     <Paper sx={{ w: 1, minHeight: "100vh" }}>
//       <Box sx={{ w: 1, display: "flex", justifyContent: "center" }}>
//         <Stack spacing={3} sx={{ width: "40rem" }}>
//           <Typography variant="h1" textAlign={"center"}>
//             {item.displayName}
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Stack spacing={2}>
//               <TextField
//                 disabled
//                 value={item.code}
//                 label="Code"
//                 helperText="Code Is Unique number that assigned Automatically"
//               />
//               <TextField
//                 error={!item.displayName.length}
//                 required
//                 onChange={(e) => {
//                   setItem({
//                     ...item,
//                     name: lockUniqueName
//                       ? snake_case_string(e.target.value)
//                       : item.name,
//                     displayName: e.target.value,
//                   })
//                 }}
//                 value={item.displayName}
//                 label="Display Name"
//                 helperText="The name which be displayed to users"
//               />
//               <Box sx={{ width: "100%", position: "relative" }}>
//                 <TextField
//                   onChange={(e) => {
//                     setItem({
//                       ...item,
//                       name: e.target.value,
//                     })
//                   }}
//                   fullWidth
//                   disabled={lockUniqueName}
//                   value={item.name}
//                   label="Unique Name"
//                   helperText="Unique Name won't be shown to users"
//                 />
//                 <IconButton
//                   disabled
//                   onClick={() => setLockUniqueName(!lockUniqueName)}
//                   sx={{ position: "absolute", right: 0 }}
//                 >
//                   <Lock></Lock>
//                 </IconButton>
//               </Box>

//               <TextField
//                 onChange={(e) => {
//                   setItem({ ...item, description: e.target.value })
//                 }}
//                 value={item.description}
//                 label="Description"
//                 multiline
//                 minRows={3}
//                 helperText="Description of this entity, which can be shown to users"
//               />
//               <ImageField
//                 value={item.img}
//                 onChange={(v) => setItem({ ...item, img: v })}
//                 onFileChange={(v) => setImageFile(v)}
//               />
//               <Divider />
//               {AdditionalFields}
//               <Divider />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{ width: "fit-content" }}
//               >
//                 Save Changes
//               </Button>
//             </Stack>
//           </form>
//         </Stack>
//       </Box>
//     </Paper>
//   )
// }

// function ImageField(props: {
//   value: string
//   onChange: (v: string) => void
//   onFileChange: (v: File | null) => void
// }) {
//   const inputRef = useRef<HTMLInputElement>(null)

//   const handlePickClick = () => {
//     inputRef.current?.click()
//   }

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center" }}>
//       <input
//         onChange={(e) => {
//           if (e.target.files) {
//             if (e.target.files.length) {
//               props.onFileChange(e.target.files[0])
//             }
//             e.target.files.length &&
//               props.onChange(URL.createObjectURL(e.target.files[0]))
//           }
//         }}
//         ref={inputRef}
//         type="file"
//         hidden
//         accept="image/*.png"
//       />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <FormLabel>Image</FormLabel>

//         <ButtonBase onClick={handlePickClick}>
//           <Box sx={{ height: "10rem", width: "10rem", bgcolor: "#eee" }}>
//             {props.value ? (
//               <Box sx={{ h: 1, w: 1, height: 1, width: 1 }}>
//                 <img
//                   src={props.value}
//                   height={"100%"}
//                   width={"100%"}
//                   style={{ objectFit: "contain" }}
//                 />
//               </Box>
//             ) : (
//               <Box
//                 sx={{
//                   height: "100%",
//                   w: 1,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               ></Box>
//             )}
//           </Box>
//         </ButtonBase>
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Button onClick={handlePickClick}>Pick Image</Button>
//           <IconButton
//             onClick={() => {
//               props.onFileChange(null)
//               props.onChange("")
//             }}
//             color="error"
//           >
//             <Delete></Delete>
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   )
// }
