import React from "react"
import App from "./app"

export function create_form()
{
    const form = 
    <form action="" name="login_form" id="temp_login_form">
        <label htmlFor="username">Username:</label><br></br>
        <input type="text" name="username" required id="temp_login_form_username"></input><br></br>
        <label htmlFor="password">Password:</label><br></br>
        <input type="password" name="password" required id="temp_login_form_password"></input><br></br>
        <input onClick={function(ev)
        {
            const username_elm = document.getElementById("temp_login_form_username") as HTMLInputElement
            const password_elm = document.getElementById("temp_login_form_password") as HTMLInputElement

            App.instance.moodle.login(username_elm.value,password_elm.value)
        }} type="button" value="Log In"></input>
    </form>
    return form
}