import { API_URL } from "../config"

export default () => {
  return fetch(`${API_URL}/annexes/repas`, {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  })
    .then(response => response.json())
}

