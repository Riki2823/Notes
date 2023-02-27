import Nav from "./Nav";
import {useEffect, useState} from 'React';
import Note from "./Note";


export default function Home(){
    const [notes, setNotes] = useState([]);
    const token = localStorage.getItem("token");    

    if(token == null){
        window.location.replace("/");
    } else{
        const goCreateNote = () =>{
            window.location.replace("/createNote");
        }

        useEffect(() => {
            const loadNotes = async() =>{
                const response = await fetch("http://localhost:8081/notes", {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("token")
                    }
                })
                setNotes = await response
            }
        })

        return(
            <div>
                <Nav/>
                <button onClick={goCreateNote}>Crear una nueva nota: </button>
                <h1>
                    TestHome
                </h1>

                <section>
                    {notes.map(Note)}
                </section>
            </div>
        )
    }
    
}