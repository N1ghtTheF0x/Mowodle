import express from "express"
import { resolve } from "path"
import { createServer } from "http"
import { Server as ServerIO } from "socket.io"

const app = express()
const server = createServer(app)
const io = new ServerIO(server)

app.use(express.static(resolve(__dirname,"www")))

io.on("connection",function(socket)
{
    console.info(`Socket ${socket.id} connected!`)
})

server.listen(8080,function()
{
    console.info("Server online!")
})