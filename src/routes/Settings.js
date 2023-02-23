import { useState } from "react";
export default function Settings(){
    const [passwdA, setPasswdA] = useState("");
    const [passwdN, setPasswdN] = useState("");
    const [passwdN2, setPasswdN2] = useState("")
    if(localStorage.getItem("token") == null){
        window.location.replace("/");
    } else{

        const fetchChangePasswd = async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:8081/changepassword", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Autoritation" : "Bearer " + localStorage.getItem("token")
                },
                body : JSON.stringify({
                    "oldPassword" : passwdA,
                    "newPassword" : passwdN
                })
            })

            if(response.status === 200){
                alert("La contraseña se ha cambiado correctamente!");
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
                <h1>Cambio de contraseña</h1>

                <form onSubmit={checkPasswd}>
                    <label>Contraseña actual:</label>
                    <input type="password" id="passwdA" onChange={(v) => {
                        setPasswdA(v.target.value);
                    }}></input>
                    <label>Nueva Contraseña:</label>
                    <input type="password" id="passwdN1" onChange={(v) => {
                        setPasswdN(v.target.value);
                    }}></input>
                    <label>Repetir nueva contraseña: </label>
                    <input type="password" id="passwdN2" onChange={(v) => {
                        setPasswdN2(v.target.value);
                    }}></input>
                    <input type="submit" value="Cambiar contraseña"></input>
                </form>
            </div>
        )
    }
}