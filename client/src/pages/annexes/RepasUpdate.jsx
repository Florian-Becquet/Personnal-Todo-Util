import React, { useState } from 'react'
import vege from '../../assets/images/vege.png'
import '../../assets/styles/annexes/Repas.css'

import { useMutation } from 'react-query'

import updateRepasRequest from '../../api/repas/updateRepasRequest';
import { Button } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Repas = () => {
    const location = useLocation();
    const repas = location.state.repas

    const [values, setValues] = useState({
        id: repas[0]._id,
        lundiMidi: repas[0].lundiMidi,
        lundiSoir: repas[0].lundiSoir,
        mardiMidi: repas[0].mardiMidi,
        mardiSoir: repas[0].mardiSoir,
        mercrediMidi: repas[0].mercrediMidi,
        mercrediSoir: repas[0].mercrediSoir,
        jeudiMidi: repas[0].jeudiMidi,
        jeudiSoir: repas[0].jeudiSoir,
        vendrediMidi: repas[0].vendrediMidi,
        vendrediSoir: repas[0].vendrediSoir,
        samediMidi: repas[0].samediMidi,
        samediSoir: repas[0].samediSoir,
        dimancheMidi: repas[0].dimancheMidi,
        dimancheSoir: repas[0].dimancheSoir,
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`https://personnal-todo-util.onrender.com/annexes/repas/${repas[0]._id}`, values)
            .then(res => {
                navigate('/annexes/repas', { message: 'Tâche correctement modifiée' });
            })
            .catch(err => console.log(err))
    }

    return (
        <>
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <div className='food'>
                            <div>
                                <h1>Repas de la semaine</h1>
                                <img src={vege} alt="" />
                            </div>

                                <Button variant="contained" type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
                                    Sauvegarder
                                </Button>

                            <div className='jours'>
                                <div className='lundi'>
                                    <p>Lundi</p>
                                        <>
                                            <textarea type='text' value={values.lundiMidi} onChange={(e) => setValues({ ...values, lundiMidi: e.target.value })} />
                                            <textarea type='text' value={values.lundiSoir} onChange={(e) => setValues({ ...values, lundiSoir: e.target.value })} />
                                        </>

                                </div>
                                <div className='mardi'>
                                    <p>mardi</p>
                                        <>
                                            <textarea type='text' value={values.mardiMidi} onChange={(e) => setValues({ ...values, mardiMidi: e.target.value })} />
                                            <textarea type='text' value={values.mardiSoir} onChange={(e) => setValues({ ...values, mardiSoir: e.target.value })} />
                                        </>

                                </div>
                                <div className='mercredi'>
                                    <p>mercredi</p>
                                        <>
                                            <textarea type='text' value={values.mercrediMidi} onChange={(e) => setValues({ ...values, mercrediMidi: e.target.value })} />
                                            <textarea type='text' value={values.mercrediSoir} onChange={(e) => setValues({ ...values, mercrediSoir: e.target.value })} />
                                        </>

                                </div>
                                <div className='jeudi'>
                                    <p>jeudi</p>
                                        <>
                                            <textarea type='text' value={values.jeudiMidi} onChange={(e) => setValues({ ...values, jeudiMidi: e.target.value })} />
                                            <textarea type='text' value={values.jeudiSoir} onChange={(e) => setValues({ ...values, jeudiSoir: e.target.value })} />
                                        </>
                                </div>
                                <div className='vendredi'>
                                    <p>vendredi</p>
                                        <>
                                            <textarea type='text' value={values.vendrediMidi} onChange={(e) => setValues({ ...values, vendrediMidi: e.target.value })} />
                                            <textarea type='text' value={values.vendrediSoir} onChange={(e) => setValues({ ...values, vendrediSoir: e.target.value })} />
                                        </>

                                </div>
                                <div className='samedi'>
                                    <p>samedi</p>
                                        <>
                                            <textarea type='text' value={values.samediMidi} onChange={(e) => setValues({ ...values, samediMidi: e.target.value })} />
                                            <textarea type='text' value={values.samediSoir} onChange={(e) => setValues({ ...values, samediSoir: e.target.value })} />
                                        </>

                                </div>
                                <div className='dimanche'>
                                    <p>Dimanche</p>

                                        <>
                                            <textarea type='text' value={values.dimancheMidi} onChange={(e) => setValues({ ...values, dimancheMidi: e.target.value })} />
                                            <textarea type='text' value={values.dimancheSoir} onChange={(e) => setValues({ ...values, dimancheSoir: e.target.value })} />

                                        </>

                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                        {/* <Checkbox checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })}/> */}
                    </form>

                    {/* <button onClick={() => setUpdate(!update)}>Modifier</button> */}
                </div>
        </>
    )
}

export default Repas