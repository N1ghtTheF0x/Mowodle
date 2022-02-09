import { TokenRespond, MoodleError, Siteinfo } from "./responds"

namespace Moodle
{
    export class Client
    {
        wwwroot: URL
        private token: string
        private privatetoken: string
        constructor(url: string = "https://bws.mtk.hessencampus.studiumdigitale.uni-frankfurt.de/moodle/")
        {
            this.wwwroot = new URL(url)
        }
        login(username: string,password: string)
        {
            this.getToken(username,password,this.setToken.bind(this))
        }
        static isMoodleError(respond: any)
        {
            return ("errorcode" in respond && "error" in respond)
        }
        private getToken(username: string,password: string,cb: (tokens: TokenRespond) => void)
        {
            const form = new FormData()
            form.append("username",username)
            form.append("password",password)
            form.append("service","moodle_mobile_app")
            fetch(`${this.wwwroot}login/token.php`,{method:"POST",body:form})
            .then(function(res)
            {
                res.json()
                .then(function(token_res: TokenRespond)
                {
                    if(Client.isMoodleError(token_res))
                    {
                        console.dir(token_res)
                        return
                    }
                    cb(token_res)
                })
                .catch(console.error)
            })
            .catch(console.error)
        }
        private setToken(tokens: TokenRespond)
        {
            this.token = tokens.token
            this.privatetoken = tokens.privatetoken
        }
        private wsFunction<Respond>(name: string,cb: (res: Respond) => void,params: URLSearchParams = new URLSearchParams())
        {
            params.append("wstoken",this.token)
            params.append("wsfunction",name)
            params.append("moodlewsrestformat","json")
            fetch(`${this.wwwroot}webservice/rest/server.php?${params.toString()}`,{method:"GET"})
            .then(function(res)
            {
                res.json()
                .then(cb)
                .catch(console.error)
            })
            .catch(console.error)
        }
        getSiteinfo(cb: (info: Siteinfo.Respond) => void)
        {
            this.wsFunction("core_webservice_get_site_info",cb)
        }
    }
}

export default Moodle