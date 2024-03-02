import { API_URL} from "../config"

export default (note) => {
    return fetch(`${API_URL}/notes/${note._id}`, {
        method: 'PUT',
        headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            text: note.text,
            title: note.title,
            category: note.category,
            date: note.date,
        })
    })
    .then(response => response.json())
}

