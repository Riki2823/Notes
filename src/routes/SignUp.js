import { useState } from "react";

export default function SignUp(){

    const [username, setUsername] = useState("");
    const [passwd1, setPasswd1] = useState("");
    const [passwd2, setPasswd2] = useState("");

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
            alert("Las contraseñas introducidas son incorrectas");
        }else{
            fetchSignUp(e);
        }
    }
    return(
        <div>
            <form onSubmit={checkPasswd}>
                <label>Usuario:</label>
                <input type="text" id="username" placeholder="Introduce un nombre de usuario" onChange={ (input) => {
                    setUsername(input.target.value);
                }}></input>
                <label>Contraseña:</label>
                <input type="password" id="password1" placeholder="Introduce una contraseña" onChange={(input) =>{
                    setPasswd1(input.target.value);
                }}></input>
                <input type="password" id="password2" placeholder="Vuelve a introducir la contraseña anterior" onChange={(input) => {
                        setPasswd2(input.target.value);
                }}></input>
                {username} 
                {passwd1} 
                {passwd2}
                <input type="submit" value="Registrarse"></input>
            </form>

            <button onClick={goLogin}>Sign Up</button>

        </div>
    )
}