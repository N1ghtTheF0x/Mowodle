const env = process.env

export default function getEnvironmentVariable(name: string)
{
    return env[name] ?? ""
}