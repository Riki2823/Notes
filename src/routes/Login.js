import { useState } from "react";

export default function Login(){
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    
    const actualDate = new Date();
    const expirationDate = new Date(localStorage.getItem("expiration"));

    if(localStorage.getItem("token") != null && expirationDate.getTime() > actualDate.getTime()){
        
        window.location.replace("/home"); 
    } else{
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
                const expiration = result.expiration;
                console.log(expiration);
                localStorage.setItem("expiration", expiration);
                localStorage.setItem("token", token);
                alert("Login correcto");
                window.location.replace("/home");
            }
        }
        
        const goSignUp = () => {
            window.location.replace("/signup");
        }
        return(
            <div class="loginSingupContainer">
                <form onSubmit={fetchLogin}>
                    <label>Usuario:</label>
                    <br/>
                    <br/>
                    <input type="text" id="username" placeholder="Introduce el nombre de usuario" onChange={(v) => {
                        setUsername(v.target.value.toLowerCase().trim());
                    }} required></input>
                    <br/>
                    <br/>
                    <label>Contraseña:</label>
                    <br/>
                    <br/>
                    <input type="password" id="passwd" placeholder="Introduce tu contraseña" onChange={(v) => {
                        setPasswd(v.target.value.toLowerCase().trim());
                    }} required></input>
                    <br/>
                    <br/>
                    <input type="submit" value="Login"></input>
                    <button onClick={goSignUp}>Sign Up</button>
                </form>
    
                
            </div>
        );
    }
    
}