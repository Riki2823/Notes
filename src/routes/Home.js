import Nav from "./Nav";
import {useEffect, useState} from 'react';
import Note from "./Note";


export default function Home(){
    
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");    

    const actualDate = new Date();
    const expirationDate = new Date(localStorage.getItem("expiration"));
    
    if(token == null  || expirationDate.getTime() < actualDate.getTime()){
        window.location.replace("/");
    }

    const goCreateNote = () =>{
        window.location.replace("/createNote");
    }

    
    useEffect(() => {
  
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
            <section id="homeContainer">
                <h1 id="titleNotes">
                    Lista de notas: 
                </h1>
                <button onClick={goCreateNote}>Crear una nueva nota. </button>

               
                    {notes.map(Note)}
                
                {
                    isLoading && <p>Loading...</p>
                }
            </section>
            
        </div>
    )
}
    