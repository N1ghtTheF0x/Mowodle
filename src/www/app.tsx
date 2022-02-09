import Socket from "./socket"
import Renderer from "./renderer"
import { create_form } from "./temp"
import Utils from "./utils"
import Davinci from "./davinci/davinci"
import Moodle from "./moodle/client"

export default class App
{
    static readonly instance: App = new App()
    socket: Socket
    moodle: Moodle.Client
    davinci: Davinci.Client
    constructor()
    {

    }
    init()
    {
        this.socket = new Socket()
        this.moodle = new Moodle.Client()
        this.davinci = new Davinci.Client("https://stundenplan.bwshofheim.de")
        Renderer.instance.canvas = create_form()
        Utils.defineInWindow("app",this)
    }
}