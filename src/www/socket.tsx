import io, {Socket as SocketIOClient} from "socket.io-client";

export default class Socket
{
    io: SocketIOClient = io()
    constructor()
    {

    }
}


