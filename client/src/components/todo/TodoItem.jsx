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
function TodoItem({ todo, setMessage }) {
    // const [token] = useContext(TokenContext)
    const queryClient = useQueryClient();
    // const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState('');


    const { mutate: updateTodo } = useMutation(
        // (updatedTodo) => updateTodoRequest(updatedTodo, token),
        (updatedTodo) => updateTodoRequest(updatedTodo),
        {
            onSettled: () => {
                setIsDeleting(true);
                setTimeout(() => {
                    setIsDeleting(false)
                    queryClient.invalidateQueries('todos');
                }, 500)
                setMessage('Tâche modifiée')
                setTimeout(() => {
                    setMessage('')
                }, 3001)
            },
        }
    );

    const { mutate: deleteTodo } = useMutation(
        (deletedTodo) => deleteTodoRequest(deletedTodo),
        {
            onSettled: () => {
                setIsDeleting(true);
                setTimeout(() => {
                    setIsDeleting(false)
                    queryClient.invalidateQueries('todos');
                }, 500)
                setMessage('Tâche supprimée')
                setTimeout(() => {
                    setMessage('')
                }, 3001)
            },
        }
    );


    const completed = todo.completed ? 'done' : '';
    const datePast = dayjs(todo.date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD") ? 'past' : '';
    const deleting = isDeleting ? 'deleting' : '';

    const daysLeft = (date) => {
        const date1 = dayjs(date);
        const date2 = dayjs(new Date()).format("YYYY-MM-DD");
        let days = Math.floor(date1.diff(date2, 'day', true));
        // const days = Math.floor(hours / 24);
        return days
    }

    const readDate = (date) => {
        if (daysLeft(date) === 1) {
            return <p>{daysLeft(date)} jour restant</p>
        } else if (daysLeft(date) > 1) {
            return <p>{daysLeft(date)} jours restants</p>
        } else if (daysLeft(date) === 0){
            return <p>jour J !</p>;
        } else {
            return <p>&nbsp;</p>
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

        <div className={`todo__item ${todo.category} ${completed} ${datePast} ${deleting}`}>
            <div className='todo__header'>
                {datePast ?
                    <p> Date expirée </p>
                    :
                    <p><AccessTimeOutlinedIcon />{dayjs(todo.date).format("HH:mm")}</p>
                }
                <Checkbox className="checkbox" checked={todo.completed} color="primary" onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
            </div>
            <div className='todo__main'>

                <h3>{todo.text}</h3>
                <Chip className={`todo__category ${todo.category}`} label={todo.category} />
            </div>
            <div className='todo__footer'>
                {readDate(todo.date)}

                <hr />
                <div className='todo__options'>
                    {/* <Button variant="outlined" color="primary" startIcon={<ModeEditOutlineOutlinedIcon />} onClick={() => setIsEditing(!isEditing)} /> */}
                    <Link to={`/dashboard/todosUpdate/${todo._id}`} state={{ todo: todo }}>
                        <Button variant="outlined" color="primary" startIcon={<ModeEditOutlineOutlinedIcon />} />
                    </Link>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo)} />
                </div>
            </div>

            {/* {alertMessage()} */}
        </div>

    )
}

export default TodoItem


