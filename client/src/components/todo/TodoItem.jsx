import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient, useMutation, QueryClient } from 'react-query'
import updateTodoRequest from '../../api/todos/updateTodoRequest';
import deleteTodoRequest from '../../api/todos/deleteTodoRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import { TokenContext } from '../../App';
import dayjs from "dayjs";
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
function TodoItem({ todo, setMessage }) {
    // const [token] = useContext(TokenContext)
    const queryClient = useQueryClient();
    // const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState('');

    const [confirmDelete, setConfirmDelete] = useState(false);

    const timeOut = () => {
        const timeId = setTimeout(() => {
            setMessage(null)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }

    const { isLoading: updateIsLoading, mutate: updateTodo } = useMutation(
        // (updatedTodo) => updateTodoRequest(updatedTodo, token),
        (updatedTodo) => updateTodoRequest(updatedTodo),
        {
            onSettled: () => {
                // setIsDeleting(true);
                // setTimeout(() => {
                //     setIsDeleting(false)
                // }, 300)
                // setMessage('');
                queryClient.invalidateQueries('todos');
                setMessage('Tâche modifiée')
                timeOut()
                // setMessage('Tâche modifiée')
                // setTimeout(() => {
                //     setMessage('')
                // }, 3001)
            },
        }
    );


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


    const completed = todo.completed ? 'done' : '';
    const datePast = dayjs(todo.date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD") ? 'past' : '';
    // const deleting = isDeleting ? 'deleting' : '';

    const daysLeft = (date) => {
        const date1 = dayjs(date);
        const date2 = dayjs(new Date()).format("YYYY-MM-DD");
        let days = Math.floor(date1.diff(date2, 'day', true));
        // const days = Math.floor(hours / 24);
        return days
    }

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

    const alertMessage = () => {
        if (updateSuccess) {
            return <AlertMessage severity="success" children="Tâche correctement modifiée" />
        }
        if (updateError) {
            return <AlertMessage severity="error" children="Une erreur est survenue, veuillez réessayer !" />
        }
    }




    return (

        <>
            {confirmDelete ?
                <div className='deletePopup'>
                    <div className='deleteModal'>
                        <p>Supprimer {todo.text}</p>
                        <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
                        <div>
                            <p onClick={() => setConfirmDelete(!confirmDelete)}> Non </p>
                            <p onClick={() => deleteTodo(todo)}> Oui </p>
                        </div>
                    </div>
                </div>
                :
                ''

            }
            <div className={`todo__item ${todo.category} ${completed} ${datePast}`}>
                <div className='todo__top'>
                    <div className='todo__main'>
                        <input type="checkbox" checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
                        <p>{todo.text}</p>
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
                    {datePast ?
                        <p> Date expirée </p>
                        :
                        <p>{dayjs(todo.date).format("HH:mm")}</p>
                    }

                    {readDate(todo.date)}

                    <div className={`todo__category ${todo.category}`}>{todo.category}</div>

                </div>
                {updateIsLoading &&
                    <Loader message="" />
                }
                {deleteIsLoading &&
                    <Loader message="" />
                }
            </div>
        </>
    )
}

export default TodoItem


