import express = require("express")
import { resolve } from "path"
import { createServer } from "http"
import { Server as ServerIO, Socket } from "socket.io"
import MD5 from "./md5"

export default class Server
{
    readonly app: express.Application = express()
    readonly server = createServer(this.app)
    readonly io = new ServerIO(this.server)
    constructor()
    {
        this.app.use(express.static(resolve(__dirname,"www")))
        this.app.get("/md5",this._md5_get.bind(this))
        this.io.on("connection",this._io_connection.bind(this))
    }
    private _io_connection(socket: Socket)
    {
        console.info(`Socket ${socket.id} connected!`)
    }
    private _md5_get(req: express.Request,res: express.Response,next: express.NextFunction)
    {
        if("str" in req.query && typeof req.query["str"] == "string")
        {
            const str: string = req.query["str"].toString()
            const str_md5 = MD5(str)
            res.send(str_md5)
            res.end()
            return
        }
        res.sendStatus(500)
        res.end()
    }
    start()
    {
        this.server.listen(8080,function()
        {
            console.info("Server online!")
        })
    }
}