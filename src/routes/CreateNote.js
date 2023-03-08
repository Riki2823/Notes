import {useState} from "react";
import Nav from "./Nav";
export default function CreateNote(){
    const [title, setTitle] = useState("");
    const [bodyC, setBodyC] = useState("");
    const [isPrivate, setIsPrivtate] = useState(true);

    const actualDate = new Date();
    const expirationDate = new Date(localStorage.getItem("expiration"));

    if(localStorage.getItem("token") == null  || expirationDate.getTime() < actualDate.getTime()){
        window.location.replace("/");
    } else{
        
        const fetchCreateNote = async () => {
            const response = await fetch("http://localhost:8081/notes", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "title" : title,
                    "body" : bodyC,
                    "isPublic" : isPrivate,
                    "isVoiceNote" : false
                }),
            })

            if(response.status === 201){
                alert("Nota Creada");
                window.location.replace("/home");
            }
        }
        const checkInputs = (e) => {
            e.preventDefault();
            if(title.length <= 3 ){
                alert("El titulo debe de contener mas de 3 caracteres");
            }else{
                fetchCreateNote();
            }
        }
        const changeChecked = () => {
            setIsPrivtate(document.getElementById("private").checked);
            console.log(isPrivate);
        }

        return(
            <div>

                <Nav></Nav>
                <h1 class="formT">Crear una nueva nota</h1>

                <form class="formCustom">
                    <label>Titulo: </label>
                    <input type="text" id="title" onChange={ (v) => {
                        setTitle(v.target.value);
                    }}></input>
                    <textarea rows="7" cols="50" forum="createNoteForm" placeholder="Introduce el contenido de tu nota aqui..." onChange={(v) => {
                        setBodyC(v.target.value);
                    }}></textarea>
                    <label>Publico: </label>
                    <input type="checkbox" id="private" onChange={changeChecked}></input>
                    <input type="submit" value="Guardar Nota" onClick={checkInputs}></input>
                    
                </form>




                {isPrivate}
                </div>
        )
    
    }
} 