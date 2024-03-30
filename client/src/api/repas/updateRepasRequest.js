import { API_URL} from "../config"

export default (repas) => {
    return fetch(`${API_URL}/annexes/repas/${repas._id}`, {
        method: 'PUT',
        headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            lundiMidi: repas.lundiMidi,
            lundiSoir: repas.lundiSoir,
            mardiMidi: repas.mardiMidi,
            mardiSoir: repas.mardiSoir,
            mercrediMidi: repas.mercrediMidi,
            mercrediSoir: repas.mercrediSoir,
            jeudiMidi: repas.jeudiMidi,
            jeudiSoir: repas.jeudiSoir,
            vendrediMidi: repas.vendrediMidi,
            vendrediSoir: repas.vendrediSoir,
            samediMidi: repas.samediMidi,
            samediSoir: repas.samediSoir,
            dimancheMidi: repas.dimancheMidi,
            dimancheSoir: repas.dimancheSoir
        })
    })
    .then(response => response.json())
}

