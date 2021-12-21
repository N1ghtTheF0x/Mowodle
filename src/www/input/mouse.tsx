export enum MouseButton
{
    None = -1,
    Left,
    Middle,
    Right,
    Button4,
    Button5
}

export default class Mouse
{
    static instance: Mouse
    x: number
    y: number
    clicked: MouseButton
    constructor()
    {
        this.x = 0
        this.y = 0
        this.clicked = MouseButton.None
        this.init()
    }
    private mouseUp(event: MouseEvent)
    {
        event.preventDefault()
        this.x = event.x
        this.y = event.y
        this.clicked = event.button
    }
    private mouseDown(event: MouseEvent)
    {
        event.preventDefault()
    }
    private init()
    {
        Mouse.instance = this
        window.addEventListener("mouseup",this.mouseUp.bind(this))
        window.addEventListener("mousedown",this.mouseDown.bind(this))
    }
}