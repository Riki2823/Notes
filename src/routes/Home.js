import Nav from "./Nav";
import {useEffect, useState} from 'react';
import Note from "./Note";


export default function Home(){
    
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderByN, setOrderByN] = useState("byTitle")
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
                orderBy(orderByN, responseBody);
                
                setIsLoading(false);
            }
        }
        loadNotes();

        
    }, [])


    
    function orderBy(value, notesToOrder){
        if(value === "byTitle"){
            console.log("hola");
            const sortedNotes = [...notesToOrder].sort((a, b) => {
                a.title = a.title.toLowerCase(); 
                b.title = b.title.toLowerCase();
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            console.log(sortedNotes);
            setNotes(sortedNotes);
        }else if(value === "byCreated"){
            const sortedNotes = notes.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
            setNotes(sortedNotes);
        }else if(value === "byUpdated"){
            const sortedNotes = notes.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
            });
            setNotes(sortedNotes);
        }
    }
    return(
        <div>
            <Nav/>
            <section id="homeContainer">
                <h1 id="titleNotes">
                    Lista de notas: 
                </h1>
                <select
                    id="story-type"
                    value={orderByN}
                    onChange={(v) => {
                        orderBy(v.target.value, notes)
                        setOrderByN(v.target.value)
                    }}
                >            
                    <option value="byTitle">Por titulo</option>
                    <option value="byCreated">Por fecha de creacion</option>
                    <option value="byUpdated">Por fecha de modificacion</option>
                </select>
                <button onClick={goCreateNote}>Crear una nueva nota. </button>
                
               
                {notes.map(Note)}
                
                {
                    isLoading && <p>Loading...</p>
                }
                
            </section>
        </div>
    )
}
    