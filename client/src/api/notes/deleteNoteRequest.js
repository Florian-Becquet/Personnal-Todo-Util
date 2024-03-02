import { API_URL } from "../config"

export default (note) => {
  return fetch(`${API_URL}/notes/${note._id}`, {
    method: 'DELETE',
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
  })
}