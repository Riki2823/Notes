import { useState } from "react";

export default function Login(){
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    

    const fetchLogin = async (e) => {
        e.preventDefault();
        console.log(username, passwd)
        const response = await fetch("http://localhost:8081/login", {
            method : "POST",
            headers:  {
                "content-type": "application/json"
            },
            body : JSON.stringify({
                username: username,
                password: passwd
            }),
        });

        if(response.status !== 200){
            alert("La contraseña o usarios introducidos son incorrectos");
        }else{

            const result = await response.json();
            console.log(result);
            const token = result.token;
            console.log(token);
            localStorage.setItem("token", token);
            
            window.location.replace("/menu");
        }
    }
    
    const goSignUp = () => {
        window.location.replace("/signup");
    }
    return(
        <div id="loginContainer">
            <form onSubmit={fetchLogin}>
                <label>Usuario:</label>
                <input type="text" id="username" placeholder="Introduce el nombre de usuario" onChange={(v) => {
                    setUsername(v.target.value);
                }}></input>
                <label>Contraseña:</label>
                <input type="password" id="passwd" placeholder="Introduce tu contraseña" onChange={(v) => {
                    setPasswd(v.target.value);
                }}></input>
                <input type="submit" value="Login"></input>
            </form>

            <button onClick={goSignUp}>Sign Up</button>
        </div>
    );
}