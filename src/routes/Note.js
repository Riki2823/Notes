export default function Item({ id, userId, createdAt, modifiedAt, title, body, isVoiceNote, isPublic}) {
    
    createdAt = formatDate(createdAt);
    modifiedAt = formatDate(modifiedAt);

    function formatDate(date){
        const dateAux = new Date(date);
        const day = dateAux.getDate();
        const month = dateAux.getMonth() + 1;
        const year = dateAux.getFullYear(); 
        return day + "/" + month + "/" + year;
    }

    const deleteNote = async (idNote, e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8081/notes/${id}", {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        });

        if(response.status === 200){
            
        }
    }
    return (
        <article key={id} class="note">
            <h1>{title}</h1>
            <p>{body}</p>
            <h2>{createdAt}</h2>
            <button onClick={deleteNote(id)}>Eliminar nota</button>
        </article>
    );
  }
  