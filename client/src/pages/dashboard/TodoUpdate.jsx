import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { QueryClient, useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom'
import updateTodoRequest from '../../api/todos/updateTodoRequest';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fr } from 'date-fns/locale'
import SendIcon from '@mui/icons-material/Send';

const TodoUpdate = () => {
    const location = useLocation();
    const todo = location.state.todo
    const message = location.state.messageUpdate
    console.log(message);

    const [values, setValues] = useState({
        id: todo._id,
        text: todo.text,
        date: todo.date,
        category: todo.category,
        currentDate: todo.currentDate
    })
    console.log(values);

    // const { mutate: updateTodo } = useMutation(
    //     // (updatedTodo) => updateTodoRequest(updatedTodo, token),
    //     (updatedTodo) => updateTodoRequest(updatedTodo),
    //     {
    //         onSettled: () => {
    //             QueryClient.invalidateQueries('todos');
    //         },
    //     }
    // );

    const today = dayjs();

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/todos/${todo._id}`, values)
            .then(res => {
                navigate('/todos/allTasks', { message: 'Tâche correctement modifiée' });
                // message = 'Tâche correctement modifiée'
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='form__update container  '>
            <form onSubmit={handleSubmit}>
                {/* <input type='text' name="title" value={values.text} onChange={e => setValues({...values, text: e.target.value})}/> */}
                {/* <input type='text' name="category" value={values.category} onChange={e => setValues({...values, category: e.target.value})}/> */}
                {/* {text} */}
                <h1>Editer la tâche</h1>
                <TextField label="Titre" variant="outlined" value={values.text} onChange={e => setValues({ ...values, text: e.target.value })} required sx={{ mb: 3 }} />
                <LocalizationProvider locale={fr} dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Saisir une date"
                        onChange={(dateLocale) => setValues({ ...values, date: dateLocale })}
                        ampmInClock={false}
                        ampm={false}
                        defaultValue={today}
                        disablePast
                    />
                </LocalizationProvider>
                <FormControl fullWidth sx={{ mt: 3 }}>

                    <InputLabel required id="demo-simple-select-label">Catégorie</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.category}
                        label="Catégorie *"
                        onChange={e => setValues({ ...values, category: e.target.value })}

                    >
                        <MenuItem value="personnel">Personnel</MenuItem>
                        <MenuItem value="travail">Travail</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                        <MenuItem value="anniversaire">Anniversaire</MenuItem>
                    </Select>
                    <Button variant="contained" endIcon={<SendIcon />} type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
                        Sauvegarder
                    </Button>
                    {/* <input type="hidden" value={currentDate}></input> */}
                </FormControl>
            </form>
        </div>
    )
}

export default TodoUpdate