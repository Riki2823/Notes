import { useState } from "react";

export default function SignUp(){

    const [username, setUsername] = useState("");
    const [passwd1, setPasswd1] = useState("");
    const [passwd2, setPasswd2] = useState("");

    const fetchSignUp = () => {

    }
    return(
        <div>
            <form action="/login" onSubmit={fetchSignUp}>
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
                <input type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}