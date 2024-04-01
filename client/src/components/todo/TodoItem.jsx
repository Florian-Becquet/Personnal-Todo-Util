import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient, useMutation, QueryClient } from 'react-query'
import updateTodoRequest from '../../api/todos/updateTodoRequest';
import deleteTodoRequest from '../../api/todos/deleteTodoRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import { TokenContext } from '../../App';
import dayjs from "dayjs";
import 'dayjs/locale/fr'
import { Button, Checkbox, Chip, Grid, Paper } from '@mui/material';
import '../../assets/styles/todo/TodoItem.css'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AlertMessage from '../common/AlertMessage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Loader from '../common/Loader';
import { setGlobalState } from '../../redux/store';
import { pink } from '@mui/material/colors';
function TodoItem({ todo, setMessage }) {
    // const [token] = useContext(TokenContext)
    const queryClient = useQueryClient();
    // const [isEditing, setIsEditing] = useState(false);

    // const [showMsg, setShowMsg] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);


    const { isLoading: updateIsLoading, mutate: updateTodo } = useMutation(
        // (updatedTodo) => updateTodoRequest(updatedTodo, token),
        (updatedTodo) => updateTodoRequest(updatedTodo),
        {
            onSettled: () => {


                queryClient.invalidateQueries('todos');
                // setMessage('Tâche modifiée')
                // setTimeout(() => {
                //     setShowMsg(false);
                // }, 3000)
                setMessage('Tâche modifiée')
                setTimeout(() => {
                    setMessage('')
                }, 300000)
            },
        }
    );

    dayjs.locale('fr')


    const { isLoading: deleteIsLoading, mutate: deleteTodo } = useMutation(
        (deletedTodo) => deleteTodoRequest(deletedTodo),
        {
            onSettled: () => {
                // setIsDeleting(true);
                // setTimeout(() => {
                //     setIsDeleting(false)
                // }, 500)
                queryClient.invalidateQueries('todos');
                setMessage('Tâche supprimée')
                setTimeout(() => {
                    setMessage('')
                }, 3001)
            },
        }
    );
    const hours = Math.round(((dayjs(todo.date) - dayjs(new Date())) / 3_600_000) * 60);

    setGlobalState('hours', hours)

    const completed = todo.completed ? 'done' : '';
    // const datePast = dayjs(todo.date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD") ? 'past' : '';
    const datePast = hours < 0 ? 'past' : '';
    const isUpdating = updateIsLoading ? 'updating'  : ''
    const isDeleting = deleteIsLoading ? 'deleting'  : ''
    // const deleting = isDeleting ? 'deleting' : '';


    const daysLeft = (date) => {
        const date1 = dayjs(date);
        const date2 = dayjs(new Date()).format("YYYY-MM-DD");
        let days = Math.floor(date1.diff(date2, 'day', true));
        // const days = Math.floor(hours / 24);



        return days
    }




    // const hoursLeft = () => {
    //     let arrayHours = [];
    //     if(hours > 0 && hours < 60) {
    //         arrayHours.push(hours);
    //     }
    //     return arrayHours
    //   }
    //   const ldld = hoursLeft();
    //   console.log(ldld);



    // console.log(hours);
    // setGlobalState("hours", hours);

    const readDate = (date) => {
        if (daysLeft(date) === 1) {
            return <p><EventAvailableOutlinedIcon />demain</p>
        } else if (daysLeft(date) > 1) {
            return <p><EventAvailableOutlinedIcon /> {daysLeft(date)} jours restants</p>
        } else if (daysLeft(date) === 0) {
            return <p><EventAvailableOutlinedIcon /> aujourd'hui</p>;
        } else {
            return ''
            // return <p><EventBusyOutlinedIcon /></p>
        }
    }




    return (

        <>
            {confirmDelete ?
                <div className='deletePopup'>
                    <div className='deleteModal'>
                        <p>Supprimer "{todo.text}"</p>
                        <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
                        <div>
                            <p onClick={() => setConfirmDelete(!confirmDelete)}> Non </p>
                            <p onClick={() => deleteTodo(todo)}> Oui </p>
                        </div>
                    </div>
                    {deleteIsLoading &&
                        <Loader message="" />
                    }
                </div>
                :
                ''

            }
            <div className={`todo__item ${todo.category} ${completed} ${datePast} ${isUpdating} ${isDeleting}`}>
                <div className='todo__top'>
                    <div className='todo__main'>
                        {hours < 0 ?
                            <Checkbox sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
                            :
                            <Checkbox checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
                        }

                        {/* <input type="checkbox" checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} /> */}
                        <p className={datePast}>{todo.text}</p>
                        <p className='hiddenText'> {todo.text} </p>
                    </div>
                    <div className='todo__options'>
                        <Link to={`/todos/update/${todo._id}`} state={{ todo: todo }}>
                            <button><ModeEditOutlineOutlinedIcon /></button>
                        </Link>
                        <button onClick={() => setConfirmDelete(!confirmDelete)}><DeleteIcon /></button>
                        {/* <button onClick={() => deleteTodo(todo)}><DeleteIcon /></button> */}
                    </div>
                </div>

                <div className="todo__bottom">
                    {/* {datePast ?
                        <p> Date expirée </p>
                        :
                        <p>{dayjs(todo.date).format("HH:mm")}</p>
                    } */}
                    {hours < 0 ?
                        <p> {dayjs(todo.date).format("HH:mm")} - Expiré </p>
                        :
                        <p>{dayjs(todo.date).format("HH:mm")}</p>
                    }

                    {readDate(todo.date)}

                    <div className={`todo__category ${todo.category}`}>{todo.category}</div>

                </div>
                {updateIsLoading &&
                    <Loader message="" />
                }



            </div>

        </>
    )
}

export default TodoItem


