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

    const deleteNote = async () => {
        const response = await fetch(`http://localhost:8081/notes/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        });

        if(response.status === 204){
            window.location.reload();
        }
    }

    const goUpdateNote = () => {
        window.location.replace(`/edit/${id}`);
    }
    return (
        <article key={id} className="note">
            <h1>{title}</h1>
            <p>{body}</p>
            <h2>{createdAt}</h2>
            <button onClick={deleteNote}>Eliminar nota</button>
            <button onClick={goUpdateNote}>Editar Nota</button>
        </article>
    );
  }
  