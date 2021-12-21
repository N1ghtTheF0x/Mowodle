export interface TokenRespond
{
    token: string
    privatetoken: string
}
export interface MoodleError
{
    debuginfo: string
    error: string
    errorcode: string
    reproductionlink: string
    stacktrace: string
}
export namespace Siteinfo
{
    export interface AdvancedFeature
    {
        name: string
        value: number
    }
    export interface Function
    {
        name: string
        version: string
    }
    export interface Respond
    {
        advancedfeatures: Siteinfo.AdvancedFeature[]
        downloadfiles: number
        firstname: string
        fullname: string
        functions: Siteinfo.Function
        lang: string
        lastname: string
        mobilecssurl: string
        release: string
        sitecalendartype: string
        siteid: number
        sitename: string
        siteurl: string
        theme: string
        uploadfiles: number
        usercalendartype: string
        usercanmanageownfiles: boolean
        userhomepage: number
        userid: number
        userissiteadmin: boolean
        usermaxuploadfilesize: number
        username: string
        userpictureurl: string
        userprivateacceskey: string
        userquota: number
        version: string
    }
}