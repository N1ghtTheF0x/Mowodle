import Server from "./server";
import localtunnel = require("localtunnel");

const shouldTunnel = process.argv.includes("--tunnel") || process.argv.includes("-t")

const server: Server = new Server()

if(shouldTunnel)
{
    localtunnel(8080,{subdomain:"mowodle"},function(err,tunnel)
    {
        server.start()
    })
}
else
{
    server.start()
}