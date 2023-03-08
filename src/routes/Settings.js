import { useState } from "react";
import Nav from "./Nav";

export default function Settings(){
    const [passwdA, setPasswdA] = useState("");
    const [passwdN, setPasswdN] = useState("");
    const [passwdN2, setPasswdN2] = useState("");

    const actualDate = new Date();
    const expirationDate = new Date(localStorage.getItem("expiration"));
    if(localStorage.getItem("token") == null || expirationDate.getTime() < actualDate.getTime()){
        window.location.replace("/");
    } else{

        const fetchChangePasswd = async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:8081/changepassword", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                },
                body : JSON.stringify({
                    "oldPassword" : passwdA,
                    "newPassword" : passwdN
                })
            });

            if(response.status === 200){
                alert("La contraseña se ha cambiado correctamente!");
                window.location.replace("/settings")
            }else{
                alert("Ha ocurrido un error y la contraseña no ha podido ser cambiada");
            }
        };

        const checkPasswd = (e) => {
            if(passwdN !== passwdN2){
                alert("Las contraseñas introducidas deben coincidir");
            }else{
                fetchChangePasswd(e);
            }
        }
        return(
            <div>
                <Nav/>
                
                <h1 class="formT">Cambio de contraseña</h1>

                <form onSubmit={checkPasswd} class="formCustom">
                    <label>Contraseña actual:</label>
                    <input type="password" id="passwdA" onChange={(v) => {
                        setPasswdA(v.target.value.trim());
                    }}></input>
                    <label>Nueva Contraseña:</label>
                    <input type="password" id="passwdN1" onChange={(v) => {
                        setPasswdN(v.target.value.trim());
                    }}></input>
                    <label>Repetir nueva contraseña: </label>
                    <input type="password" id="passwdN2" onChange={(v) => {
                        setPasswdN2(v.target.value.trim());
                    }}></input>
                    <input type="submit" value="Cambiar contraseña"></input>
                </form>
            </div>
        )
    }
}