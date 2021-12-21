namespace Utils
{
    const env = process.env
    export function getEnv(index: string)
    {
        return env[index]
    }
    export function defineInWindow(name: string,obj: any)
    {
        if(getEnv("WEBPACK_MODE") == "production") return
        window[name] = obj
    }
}

export default Utils