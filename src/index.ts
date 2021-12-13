import express = require("express")
import html from "./html"

const app = express()

app.get("/",function(req,res,next)
{
    res.send(html)
    res.end()
})

app.listen(43434,function()
{
    console.info("Server online")
})