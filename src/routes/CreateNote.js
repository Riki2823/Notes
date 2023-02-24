import {useState} from "react";

export default function CreateNote(){
    const [title, setTitle] = useState("");

    if(localStorage.getItem("token") == null){
        window.location.replace("/");
    } else{
    
        const checkInputs = (e) => {
            if(title.length() <= 3 ){
                alert("El titulo debe de contener mas de 3 caracteres");
            }
        }
        return(
            <div>
                <h1>Crear una nueva nota</h1>

                <form onSubmit={checkInputs} id="createNoteForm">
                    <label>Titulo: </label>
                    <input type="text" id="title" onChange={ (v) => {
                        setTitle(v.target.value);
                    }}></input>
                    <label>Publico: </label>
                    <input type="checkbox"></input>
                </form>

                <textarea rows="7" cols="50" forum="createNoteForm" placeholder="Introduce el contenido de tu nota aqui..."></textarea>
            </div>
        )
    
    }
} 