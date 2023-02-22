export default function Nav(){
    const logOut = () => {
        localStorage.removeItem("token");
    }
    
    return(
        <div>
            <nav>
                <a href="/home">Home</a>
                <a href="/settings">Cambiar Contraseña</a>
                <a onClick={logOut} href="/">Cerrar Sessión</a>
            

            </nav>
        </div>
    )
}