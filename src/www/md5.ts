export default function MD5(str: string,cb: (res: string) => void)
{
    const req_url = `${location.href}md5?str=${str}`
    fetch(req_url)
    .then(function(res)
    {
        res.text()
        .then(function(txt)
        {
            cb(txt)
        })
        .catch(console.error)
    })
    .catch(console.error)
}