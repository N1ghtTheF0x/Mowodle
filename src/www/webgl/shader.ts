import fragmentSource from "./fragment.glsl"
import vertexSource from "./vertex.glsl"

export default class Shader
{
    private readonly gl: WebGL2RenderingContext
    fragment: WebGLShader
    vertex: WebGLShader
    program: WebGLProgram

    error: Error

    pal: number // a_position
    rul: WebGLUniformLocation // u_resolution
    cl: WebGLUniformLocation // u_color
    ml: WebGLUniformLocation // u_matrix
    constructor(gl: WebGL2RenderingContext)
    {
        this.gl = gl
        this.fragment = this.makeShader(this.gl.FRAGMENT_SHADER,fragmentSource)
        this.vertex = this.makeShader(this.gl.VERTEX_SHADER,vertexSource)
        this.program = this.makeProgram()

        this.pal = this.gl.getAttribLocation(this.program,"a_position")
        this.rul = this.gl.getUniformLocation(this.program,"u_resolution")
    }
    private makeShader(type: number,src: string)
    {
        if(this.error) return
        const shader = this.gl.createShader(type)
        this.gl.shaderSource(shader,src)
        this.gl.compileShader(shader)
        const success = this.gl.getShaderParameter(shader,this.gl.COMPILE_STATUS)
        if(success) return shader
        this.error = new Error(this.gl.getShaderInfoLog(shader))
        console.error(this.error)
        this.gl.deleteShader(shader)
    }
    private makeProgram()
    {
        if(this.error) return
        const program = this.gl.createProgram()
        this.gl.attachShader(program,this.fragment)
        this.gl.attachShader(program,this.vertex)
        this.gl.linkProgram(program)
        const success = this.gl.getProgramParameter(program,this.gl.LINK_STATUS)
        if(success) return program
        this.error = new Error(this.gl.getProgramInfoLog(program))
        console.error(this.error)
        this.gl.deleteProgram(program)
    }
}