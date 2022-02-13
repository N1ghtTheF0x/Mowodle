import Utils from "./utils";
import WebGLContext from "./webgl/context";

export default class Renderer
{
    static readonly instance: Renderer = new Renderer()
    appDiv: HTMLDivElement
    rafID: number
    canvas: HTMLCanvasElement
    webgl: WebGLContext
    constructor()
    {
        this.appDiv = null
        this.rafID = null
    }
    init()
    {
        this.appDiv = document.getElementById("app") as HTMLDivElement
        this.canvas = document.createElement("canvas")
        this.webgl = new WebGLContext(this.canvas)
        this.appDiv.append(this.canvas)
        this.start()
        Utils.defineInWindow("renderer",this)
    }
    start()
    {
        this.rafID = requestAnimationFrame(this.render.bind(this))
    }
    stop()
    {
        cancelAnimationFrame(this.rafID)
    }
    restart()
    {
        this.stop()
        this.start()
    }
    private render(time: number)
    {
        
    }
} 