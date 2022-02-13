import Shader from "./shader"

export default class WebGLContext
{
    readonly gl: WebGL2RenderingContext
    shader: Shader
    constructor(canvas: HTMLCanvasElement)
    {
        this.gl = canvas.getContext("webgl2")

        if(this.gl == null)
        {
            alert("Your Browser is not supported! Chrome is Recommended.")
            throw new Error("Unsupported Browser in use!")
        }

        this.shader = new Shader(this.gl)
    }
}