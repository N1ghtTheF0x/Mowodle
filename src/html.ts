import { resolve } from "path"
import { readFileSync, writeFileSync } from "fs"

export function tag(name: string = "div",inside: string = "",props: [string,string][] = [])
{
    var _props = ""
    for(const [prop,value] of props)
    {
        _props += ` ${prop}="${value}"`
    }
    return `<${name}${_props}>${inside}</${name}>`
}

const content = readFileSync(resolve(__dirname,"sauce.js"),"utf-8")

const html = "<!DOCTYPE html>"+tag("html",tag("head",tag("script",content)+tag("body",tag("div","",[["id","app"]]))))

//writeFileSync(resolve(__dirname,"index.html"),html,"utf-8")

export default html