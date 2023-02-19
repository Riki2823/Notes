import { useState, useEffect } from "react";


export default function Login(){
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    
    const loginRequestOptions = {
        method : 'POST',
        body: JSON.stringify({username: username, password: passwd})
    }
    const login = () => {
        const response = fetch("http://localhost:8081/login", loginRequestOptions);
        localStorage.setItem("token", response.json()[0]);
    }   
    
    return(
        <div id="loginContainer">
            <form onSubmit={login} action="/menu">
                <label for="username">Usuario:</label>
                <input type="text" id="username" placeholder="Introduce el nombre de usuario" onChange={(v) => {
                    setUsername(v.target.value);
                }}></input>
                <label for="passwd">Contraseña:</label>
                <input type="password" id="passwd" placeholder="Introduce tu contraseña" onChange={(v) => {
                    setPasswd(v.target.value);
                }}></input>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    );
}