import React, { useEffect, useState } from 'react'
import vege from '../../assets/images/vege.png'
import '../../assets/styles/annexes/Repas.css'

import {  useQuery } from 'react-query'
import Loader from '../../components/common/Loader';

import readRepasRequest from '../../api/repas/readRepasRequest';
import { Button } from '@mui/material';

import { Link } from 'react-router-dom';


const Repas = () => {
    const { isLoading, data: repas } = useQuery('repas',
        () => readRepasRequest());

    return (
        <>
            {isLoading ?
                <Loader message="Un peu de patience s'il vous plaît" />
                :
                <div className='container'>
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

                                <div className='lundi'>
                                    <p>Lundi</p>
                                        <>
                                            <div>{repas[0].lundiMidi}</div>
                                            <div>{repas[0].lundiSoir}</div>
                                        </>
                                </div>
                                <div className='mardi'>
                                    <p>mardi</p>
                                        <>
                                            <div>{repas[0].mardiMidi}</div>
                                            <div>{repas[0].mardiSoir}</div>
                                        </>
                                </div>
                                <div className='mercredi'>
                                    <p>mercredi</p>
                                        <>
                                            <div>{repas[0].mercrediMidi}</div>
                                            <div>{repas[0].mercrediSoir}</div>
                                        </>
                                </div>
                                <div className='jeudi'>
                                    <p>jeudi</p>
                                        <>
                                            <div>{repas[0].jeudiMidi}</div>
                                            <div>{repas[0].jeudiSoir}</div>
                                        </>
                                </div>
                                <div className='vendredi'>
                                    <p>vendredi</p>
                                        <>
                                            <div>{repas[0].vendrediMidi}</div>
                                            <div>{repas[0].vendrediSoir}</div>
                                        </>
                                </div>
                                <div className='samedi'>
                                    <p>samedi</p>
                                        <>
                                            <div>{repas[0].samediMidi}</div>
                                            <div>{repas[0].samediSoir}</div>
                                        </>
                                </div>
                                <div className='dimanche'>
                                    <p>Dimanche</p>
                                        <>
                                            <div>{repas[0].dimancheMidi}</div>
                                            <div>{repas[0].dimancheSoir}</div>
                                        </>
                                </div>
                            </div>
                        </div>
                </div>
            }
        </>
    )
}

export default Repas