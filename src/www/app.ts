import Socket from "./socket"
import Renderer from "./renderer"
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
        Utils.defineInWindow("app",this)
    }
}