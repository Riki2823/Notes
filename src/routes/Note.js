export default function Item({ id, userId, createdAD, modifiedAt, title, body, isVoiceNote, isPublic}) {
    return (
        <article key={id}>
            <h1>{title}</h1>
        </article>
    );
  }
  