import Nav from "./Nav";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";


export default function Editor(){
    const {noteId} = useParams();
    const [note, setNote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let newTitle = "";
    let newBodyC ="";
    const [isPrivate, setIsPrivtate] = useState(false);

    const actualDate = new Date();
    const expirationDate = new Date(localStorage.getItem("expiration"));

    if(localStorage.getItem("token") == null  || expirationDate.getTime() < actualDate.getTime()){
        window.location.replace("/");
    }
    useEffect(() =>{
        let ignore = false;
        const getNote = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8081/notes/${noteId}` , {
                method: "GET",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
    
            });
            if(!ignore) {
                setNote( await response.json());
                setIsLoading(false);
            }
            if(response.status === 401){
                alert("No puedes editar esta nota");
                window.location.replace("/home");
            }
        }
    
        getNote();
        return () => {
            ignore = true;
        }
    }, [])

    const fetchUpdateNote = async () => {
        const response = await fetch(`http://localhost:8081/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "title" : newTitle,
                "body" : newBodyC,
                "isPublic" : isPrivate,
                "isVoiceNote" : false
            }),
        })

        if(response.status === 200){
            window.location.replace("/home");
        }
    }

    if(note.isPublic){
        document.getElementById("private").checked = true;
    }

    const checkInputs = (e) => {
        e.preventDefault();
        if(newTitle.length <= 3 ){
            newTitle = note.title;
        }else{
            fetchUpdateNote();
        }
    }
    const changeChecked = () => {
        setIsPrivtate(document.getElementById("private").checked);
    }
    
    


    return(
        <div>
            <Nav></Nav>
            <h1 class="formT">Editar Nota</h1>

            <form class="formCustom">
                <label>Titulo: {note.title}</label>
                <input type="text" id="title" onChange={ (v) => {
                    newTitle = v.target.value;
                }}></input>
                <label>Contenido:</label>
                <p id="contentEdit">{note.body}</p>
                <textarea rows="7" cols="50" forum="createNoteForm" onChange={(v) => {
                        newBodyC = v.target.value;
                }}></textarea>
                <label>Publico: </label>
                <input type="checkbox" id="private" onChange={changeChecked}></input>
                <input type="submit" value="Guardar" onClick={checkInputs}></input>
            </form>

            {isLoading && <p>Loading...</p>}
        </div>
    )
}