import { useState } from "react";

export default function SignUp(){

    const [username, setUsername] = useState("");
    const [passwd1, setPasswd1] = useState("");
    const [passwd2, setPasswd2] = useState("");

    if(localStorage.getItem("token") != null){
        window.location.replace("/home");
    }else{
        const fetchSignUp = async (e) => {
            e.preventDefault();
            console.log(passwd1, passwd2, username);
            
            const response = await fetch("http://localhost:8081/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: passwd1
                }),
            });
    
            if(response.status === 409){
                alert("El usuario introducido ya existe");
            }else if(response.status === 200){
                alert("Se ha realizado el registro correctamente, haga login con sus credenciales");
                window.location.replace("/");
            }
    
        }
    
        const goLogin = () => {
            window.location.replace("/");
        }
        const checkPasswd = (e) => {
            if(passwd1 !== passwd2){
                alert("Las contraseñas introducidas deben coincidir");
            }else{
                fetchSignUp(e);
            }
        }
        return(
            <div class="loginSingupContainer">
                <form onSubmit={checkPasswd}>
                    <label>Usuario:</label>
                    <br/>
                    <br/>
                    <input type="text" id="username" placeholder="Introduce un nombre de usuario" onChange={ (input) => {
                        setUsername(input.target.value.toLowerCase());
                    }}></input>
                    <br/>
                    <br/>
                    <label>Contraseña:</label>
                    <br/>
                    <br/>
                    <input type="password" id="password1" placeholder="Introduce una contraseña" onChange={(input) =>{
                        setPasswd1(input.target.value);
                    }}></input>
                    <br/>
                    <br/>
                    <input type="password" id="password2" placeholder="Vuelve a introducir la contraseña anterior" onChange={(input) => {
                            setPasswd2(input.target.value);
                    }}></input>
                    <br/>
                    <br/>
                    <input type="submit" value="Registrarse"></input>
                    <button onClick={goLogin}>Log In</button>
                </form>
            </div>
        )
    }

}