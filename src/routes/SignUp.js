export default function SignUp(){

    return(
        <div>
            <form>
                <label>Usuario:</label>
                <input type="text" id="username" placeholder="Introduce un nombre de usuario"></input>
                <label>Contraseña:</label>
                <input type="password" id="password1" placeholder="Introduce una contraseña"></input>
                <input type="password" id="password2" placeholder="Vuelve a introducir la contraseña anterior"></input>
                <input type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}