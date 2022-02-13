import App from "./app";
import Renderer from "./renderer";

window.addEventListener("load",function()
{
    Renderer.instance.init()
    App.instance.init()
})