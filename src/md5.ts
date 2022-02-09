import { createHash } from "crypto"

export default function MD5(str: string)
{
    const md5 = createHash("md5")
    md5.update(str)
    return md5.digest("hex")
}