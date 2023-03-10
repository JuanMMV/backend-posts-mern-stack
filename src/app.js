import express from "express";
import fileUpload from "express-fileupload";
import postsRoutes from "./routes/posts.routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname= dirname(fileURLToPath(import.meta.url))

//middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'./upload'
}))
//route
app.use(postsRoutes);

// console.log(__dirname)

// app.use(express.static(join(__dirname, '../client/build')))

// app.get('*',(req, res)=>{
//   res.sendFile(join(__dirname, '../client/build/index.html'))
// })

export default app;

//este archivo configura express


/*
en node package.json
 "build":"npm install --prefix client && npm run build --prefix client && rmdir node_modules",
 si heroku no lo elimina
*/