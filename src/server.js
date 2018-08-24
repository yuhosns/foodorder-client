import fs from "fs"
import path from "path"
import express from "express"
import serveStatic from "serve-static"

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 9090

const app = express()

app
  // serve static files
  .get(["/css/*", "/js/*", "/images/*", "/credits/*", "/directions/*", "/email/*", "/how-it-work/*", "/promotion/*"], (req, res) => {
    const fileName = path.join(__dirname, "../../build", req.originalUrl.split("?")[0])
    fs.readFile(fileName, "utf8", (err, file) => {
      if (err) {
        res.status(404).end()
      }
      res.sendFile(fileName)
    })
  })

  // respond the react app (index.html)
  .get(["/*"], (req, res) => {
    const fileName = path.join(__dirname, "../../build", "index.html")
    fs.readFile(fileName, "utf8", (err, file) => {
      if (err) {
        res.status(404).end()
      }
      res.sendFile(fileName)
    })
  })

  .use(serveStatic(path.join(__dirname, "../../build")))

  .listen(PORT, () => {
    console.log(`server listening on port ${PORT}!`)
  })
