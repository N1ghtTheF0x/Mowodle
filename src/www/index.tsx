import "./style.css"
import { render } from "react-dom"
import getEnvironmentVariable from "./env"
const div = <div>{ getEnvironmentVariable("WEBPACK_MODE") }</div>

window.addEventListener("load",function(e)
{
    render(div,document.getElementById("app"))
})