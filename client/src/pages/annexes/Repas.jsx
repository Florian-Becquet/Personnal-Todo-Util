import React, { useEffect, useState } from 'react'
import vege from '../../assets/images/vege.png'
import '../../assets/styles/annexes/Repas.css'

// import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useQueryClient, useMutation, QueryClient, useQuery } from 'react-query'
import Loader from '../../components/common/Loader';

import updateRepasRequest from '../../api/repas/updateRepasRequest';
import readRepasRequest from '../../api/repas/readRepasRequest';
import { Button } from '@mui/material';
import { is } from 'date-fns/locale';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Repas = () => {
    const { isLoading, data: repas } = useQuery('repas',
        () => readRepasRequest());

    const queryClient = useQueryClient();

    const [update, setUpdate] = useState(false);

    const [text, setText] = useState('');
    const [refresh, setRefresh] = useState(false)

    //    



    const [values, setValues] = useState({
        id: '',
        lundiMidi: 'flageolets',
        lundiSoir: '',
        mardiMidi: '',
        mardiSoir: '',
        mercrediMidi: '',
        mercrediSoir: '',
        jeudiMidi: '',
        jeudiSoir: '',
        vendrediMidi: '',
        vendrediSoir: '',
        samediMidi: '',
        samediSoir: '',
        dimancheMidi: '',
        dimancheSoir: '',
        // id: repas[0]._id,
        // lundiMidi: repas[0].lundiMidi,
        // lundiSoir: repas[0].lundiSoir,
        // mardiMidi: repas[0].mardiMidi,
        // mardiSoir: repas[0].mardiSoir,
        // mercrediMidi: repas[0].mercrediMidi,
        // mercrediSoir: repas[0].mercrediSoir,
        // jeudiMidi: repas[0].jeudiMidi,
        // jeudiSoir: repas[0].jeudiSoir,
        // vendrediMidi: repas[0].vendrediMidi,
        // vendrediSoir: repas[0].vendrediSoir,
        // samediMidi: repas[0].samediMidi,
        // samediSoir: repas[0].samediSoir,
        // dimancheMidi: repas[0].dimancheMidi,
        // dimancheSoir: repas[0].dimancheSoir,
    })

    // useEffect(() => {

    // }, [values])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/annexes/repas/${repas[0]._id}`, values)
            .then(res => {
                setValues(res.data);
                setRefresh(!refresh);
                // message = 'Tâche correctement modifiée'
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        readRepasRequest()
    }, [repas])

    const { mutate: updateRepas } = useMutation(
        // (updatedTodo) => updateTodoRequest(updatedTodo, token),
        (updatedRepas) => updateRepasRequest(updatedRepas),
        {
            onSettled: () => {


                queryClient.invalidateQueries('repas');

            },
        }
    );


    return (
        <>
            {isLoading ?
                <Loader message="Un peu de patience s'il vous plaît" />
                :
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <div className='food'>
                            <div>
                                <h1>Repas de la semaine</h1>
                                <img src={vege} alt="" />
                            </div>

                                <Link to={`/annexes/repas/update/${repas[0]._id}`} state={{ repas: repas }}>
                                    <Button variant="contained" type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
                                    Modifier le programme
                                </Button>
                                </Link>


                            <div className='jours'>
                                {/* {repas.map((rp) => {
                                return (
                                    <>
                                    {console.log(rp._id)}
                                    <textarea type='text' value={rp.lundiMidi} onChange={(e) => updateRepas({...rp, lundiMidi: e.target.value})} />
                                    <textarea type='text' value={rp.lundiSoir} onChange={(e) => updateRepas({...rp, lundiSoir: e.target.value})} />
                                    <textarea type='text' value={rp.lundiMidi} onChange={(e) => updateRepas({...rp, lundiMidi: e.target.value})} />
                                    <textarea type='text' value={rp.lundiMidi} onChange={(e) => updateRepas({...rp, lundiMidi: e.target.value})} />
                                    <textarea type='text' value={rp.lundiMidi} onChange={(e) => updateRepas({...rp, lundiMidi: e.target.value})} />
                                    <textarea type='text' value={rp.lundiMidi} onChange={(e) => updateRepas({...rp, lundiMidi: e.target.value})} />
                                    </>
                                )
                            })} */}
                                <div className='lundi'>
                                    <p>Lundi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={values.lundiMidi} onChange={(e) => setValues({ ...values, lundiMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].lundiSoir} onChange={(e) => updateRepas({ ...repas[0], lundiSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].lundiMidi}</div>
                                            <div>{repas[0].lundiSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='mardi'>
                                    <p>mardi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].mardiMidi} onChange={(e) => updateRepas({ ...repas[0], mardiMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].mardiSoir} onChange={(e) => updateRepas({ ...repas[0], mardiSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].mardiMidi}</div>
                                            <div>{repas[0].mardiSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='mercredi'>
                                    <p>mercredi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].mercrediMidi} onChange={(e) => updateRepas({ ...repas[0], mercrediMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].mercrediSoir} onChange={(e) => updateRepas({ ...repas[0], mercrediSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].mercrediMidi}</div>
                                            <div>{repas[0].mercrediSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='jeudi'>
                                    <p>jeudi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].jeudiMidi} onChange={(e) => updateRepas({ ...repas[0], jeudiMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].jeudiSoir} onChange={(e) => updateRepas({ ...repas[0], jeudiSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].jeudiMidi}</div>
                                            <div>{repas[0].jeudiSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='vendredi'>
                                    <p>vendredi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].vendrediMidi} onChange={(e) => updateRepas({ ...repas[0], vendrediMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].vendrediSoir} onChange={(e) => updateRepas({ ...repas[0], vendrediSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].vendrediMidi}</div>
                                            <div>{repas[0].vendrediSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='samedi'>
                                    <p>samedi</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].samediMidi} onChange={(e) => updateRepas({ ...repas[0], samediMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].samediSoir} onChange={(e) => updateRepas({ ...repas[0], samediSoir: e.target.value })} />
                                        </>
                                        :
                                        <>
                                            <div>{repas[0].samediMidi}</div>
                                            <div>{repas[0].samediSoir}</div>
                                        </>
                                    }
                                </div>
                                <div className='dimanche'>
                                    <p>Dimanche</p>
                                    {update ?
                                        <>
                                            <textarea type='text' value={repas[0].dimancheMidi} onChange={(e) => updateRepas({ ...repas[0], dimancheMidi: e.target.value })} />
                                            <textarea type='text' value={repas[0].dimancheSoir} onChange={(e) => updateRepas({ ...repas[0], dimancheSoir: e.target.value })} />

                                        </>
                                        :
                                        <>
                                            <div>{repas[0].dimancheMidi}</div>
                                            <div>{repas[0].dimancheSoir}</div>
                                        </>
                                    }
                                </div>
                                {/* </div> */}
                            </div>

                        </div>
                        {/* <Checkbox checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })}/> */}
                    </form>

                    {/* <button onClick={() => setUpdate(!update)}>Modifier</button> */}
                </div>
            }
        </>
    )
}

export default Repas