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
function TodoItem({ todo }) {
    // const [token] = useContext(TokenContext)
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);


    const { mutate: updateTodo } = useMutation(
        // (updatedTodo) => updateTodoRequest(updatedTodo, token),
        (updatedTodo) => updateTodoRequest(updatedTodo),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    const { mutate: deleteTodo } = useMutation(
        (updatedTodo) => deleteTodoRequest(updatedTodo),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    const completed = todo.completed ? 'done' : ''
    const datePast = dayjs(todo.date).format("YYYY-MM-DD") < dayjs(new Date()).format("YYYY-MM-DD") ? 'past' : '';

    //     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // const firstDate = dayjs(todo.date).format("YYYY,MM,DD");
    // const secondDate = dayjs(new Date()).format("YYYY,MM,DD");
    // console.log(firstDate, secondDate);
    // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    // console.log(diffDays);
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
        } else {
            return <p>jour J !</p>;
        }
    }






    return (
        <div className={`todo__item ${todo.category} ${completed} ${datePast}`}>
            <div className='todo__header'>
                {/* {datePast ?
                    <p>Date expirée</p>
                    : */}
                {isEditing ?
                    <LocalizationProvider locale={fr} dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Saisir une date"
                            onChange={(dateLocale) => updateTodo({ ...todo, date: dateLocale })}
                            ampmInClock={false}
                            ampm={false}
                            // defaultValue={dayjs(todo.date).format("MM/DD/YYYY HH:mm")}
                            disablePast
                        />
                    </LocalizationProvider>
                    :
                    <p><AccessTimeOutlinedIcon/>{dayjs(todo.date).format("HH:mm")}</p>
                }
                {/* // <input onChange={(e) => console.log(e.target.value)} value={dayjs(todo.date).format("HH:mm")}/> */}

                {/* // <AccessTimeOutlinedIcon/> */}
                {/* } */}
                <Checkbox className="checkbox" checked={todo.completed} color="success" onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
            </div>
            <div className='todo__main'>
                {isEditing ?
                    <input autoFocus value={todo.text} type="text" onChange={(e) => updateTodo({ ...todo, text: e.target.value })} />
                    :
                    <h3>{todo.text}</h3>
                }
                <Chip className={`todo__category ${todo.category}`} label={todo.category} />
            </div>
            <div className='todo__footer'>
                {readDate(todo.date)}

                <hr />
                <div className='todo__options'>
                    {datePast ?
                        ''
                        :
                        <Button variant="outlined" color="primary" startIcon={<ModeEditOutlineOutlinedIcon />} onClick={() => setIsEditing(!isEditing)} />
                    }
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo)} />
                </div>
            </div>
        </div>
        // <Grid container >
        //     <Paper className={`todo__wrapper ${completed} ${datePast}`} 
        //         sx={{
        //             height: 100,
        //             width: '80%',
        //             backgroundColor: '#233044',
        //             mx: 'auto',
        //             color: datePast ? 'red' : 'white'
        //         }}
        //     >
        //         <div className='todo__item-left'>
        //             <Checkbox className="checkbox" checked={todo.completed} color="success" onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
        //             {isEditing ?
        //                 <input autoFocus value={todo.text} type="text" onChange={(e) => updateTodo({ ...todo, text: e.target.value })} />
        //                 :
        //                 <div>{todo.text}</div>
        //             }
        //         </div>
        //         <div className='todo__item-center'>
        //             {datePast ? 
        //             <p>Date expirée</p>
        //             :
        //             <p>{dayjs(todo.date).format("HH:mm")}</p>
        //         }
        //             <Chip className={`todo__category ${todo.category}`} label={todo.category} />
        //             {
        //                 todo.completed ?
        //                     <p>{todo.date}</p>
        //                     :
        //                     <p>{''}</p>
        //             }
        //         </div>
        //         <div className='todo__item-right'>
        //             {datePast ? 
        //             ''
        //                 :
        //             <Button variant="outlined" color="primary" startIcon={<ModeEditOutlineOutlinedIcon />} onClick={() => setIsEditing(!isEditing)}>Éditer
        //             </Button>
        //             }

        //             {/* <button onClick={() => deleteTodo(todo)}>Delete</button> */}
        //             <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo)}> Supprimer </Button>
        //         </div>
        //     </Paper>
        // </Grid >
        // <div className="todo__wrapper">
        //     <div className={todo.completed ? 'todo__item done' : 'todo__item'}>
        //         <div className='todo__item-left'>
        //             <Checkbox checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })}/>
        //             {/* <input checked={todo.completed} type="checkbox" onChange={() => updateTodo({ ...todo, completed: !todo.completed })} /> */}
        //             {isEditing ? 
        //             <input value={todo.text} type="text" onChange={(e) => updateTodo({ ...todo, text: e.target.value })} />
        //             :
        //              <div>{todo.text}</div>   
        //         }
        //             <p>{dayjs(todo.date).format("HH:mm")}</p>
        //             <Chip className={`todo__category ${todo.category}`} label={todo.category} />
        //         </div>
        //         {
        //             todo.completed ?
        //                 <p>{todo.date}</p>
        //                 :
        //                 <p>{''}</p>
        //         }
        //         <div className='todo__item-right'>
        //             <Button variant="outlined" color="primary" startIcon={<ModeEditOutlineOutlinedIcon />} onClick={() => setIsEditing(!isEditing)}>
        //                 Éditer
        //             </Button>
        //             {/* <button onClick={() => deleteTodo(todo)}>Delete</button> */}
        //             <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTodo(todo)}> Supprimer </Button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default TodoItem