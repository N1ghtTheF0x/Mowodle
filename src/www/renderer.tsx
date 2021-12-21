import React from "react";
import { render } from "react-dom";
import Utils from "./utils";

export default class Renderer
{
    static readonly instance: Renderer = new Renderer()
    appDiv: HTMLDivElement
    rafID: number
    canvas: React.FunctionComponentElement<any>
    constructor()
    {
        this.appDiv = null
        this.rafID = null
    }
    init()
    {
        this.appDiv = document.getElementById("app") as HTMLDivElement
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
        render(this.canvas,this.appDiv)
    }
} 