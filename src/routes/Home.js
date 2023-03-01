import Nav from "./Nav";
import {useEffect, useState} from 'react';
import Note from "./Note";


export default function Home(){
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");    
    
    
    const goCreateNote = () =>{
        window.location.replace("/createNote");
    }
    
    useEffect(() => {
        if(token == null){
            window.location.replace("/");
        } 
        let ignore = false;
        const loadNotes = async() =>{
            setIsLoading(true);
            const response = await fetch("http://localhost:8081/notes", {
                method: "GET",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            if(!ignore) {
                const responseBody = await response.json()
                setNotes(responseBody);
                setIsLoading(false);
            }
        }
        loadNotes();
        console.log(notes);
        return () => {
            ignore = true;
        }
    }, [])
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
            {
                isLoading && <p>Loading...</p>
            }
        </div>
    )
}
    