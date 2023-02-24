import Nav from "./Nav"


export default function Home(){
    const token = localStorage.getItem("token");
    if(token == null){
        window.location.replace("/");
    } else{
        const goCreateNote = () =>{
            window.location.replace("/createNote");
        }

        return(
            <div>
                <Nav/>
                <button onClick={goCreateNote}>Crear una nueva nota: </button>
                <h1>
                    TestHome
                </h1>
            </div>
        )
    }
    
}