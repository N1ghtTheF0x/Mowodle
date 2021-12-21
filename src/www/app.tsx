import MoodleClient from "./moodle/client"
import Socket from "./socket"
import Renderer from "./renderer"
import { create_form } from "./temp"
import Utils from "./utils"

export default class App
{
    static readonly instance: App = new App()
    socket: Socket
    moodle: MoodleClient
    constructor()
    {

    }
    init()
    {
        this.socket = new Socket()
        this.moodle = new MoodleClient()
        Renderer.instance.canvas = create_form()
        Utils.defineInWindow("app",this)
    }
}