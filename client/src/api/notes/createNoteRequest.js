import { API_URL } from "../config"

export default (note) => {
  return fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      text: note.text,
      date: note.date,
      title: note.title,
      category: note.category
    })
  })
    .then(response => response.json())
}