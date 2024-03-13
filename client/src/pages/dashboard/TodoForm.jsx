import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import createTodoRequest from '../../api/todos/createTodoRequest';

import dayjs from 'dayjs';
import { fr } from 'date-fns/locale'

import AlertMessage from '../../components/common/AlertMessage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SendIcon from '@mui/icons-material/Send';
import ClipLoader from 'react-spinners/ClipLoader'
import '../../assets/styles/todo/TodoForm.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Loader from '../../components/common/Loader';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


function TodoForm({ showNav, setShowNav }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [currentDate, setCurrendDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const today = dayjs();

  const queryClient = useQueryClient();

  const { isLoading, isSuccess, isError, mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );
    

  return (
    <>
      <div className={showNav ? 'form__wrapper show' : 'form__wrapper'}>
        {/* <button className='close__form' onClick={() => setShowNav(!showNav)}>X</button> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text || !category) return;
            createTodo({
              text,
              date,
              category,
              currentDate
            });
            setText('')
            setCategory('');
            // setShowNav(!showNav)
          }}
        >
          <div className='close__form' onClick={() => setShowNav(!showNav)}><CloseOutlinedIcon /> </div>
          <h1>Ajouter une nouvelle tâche</h1>
          <TextField label="Titre" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} required sx={{ mb: 3 }} />
          <LocalizationProvider locale={fr} dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Saisir une date"
              onChange={(dateLocale) => setDate(dateLocale)}
              ampmInClock={false}
              ampm={false}
              defaultValue={today}
              disablePast
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ mt: 3, zIndex: 11000 }}>

            <InputLabel required id="demo-simple-select-label">Catégorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Catégorie *"
              onChange={(e) => setCategory(e.target.value)}

            >
              <MenuItem value="personnel">Personnel</MenuItem>
              <MenuItem value="travail">Travail</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
              <MenuItem value="anniversaire">Anniversaire</MenuItem>
            </Select>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
              Créér
            </Button>
            <input type="hidden" value={currentDate}></input>
          </FormControl>
          {isSuccess &&
            <AlertMessage severity="success" children="Tâche correctement ajoutée" />
          }
          {isLoading &&
            <Loader/>
          }
          {isError &&
            <AlertMessage severity="error" children="Une erreur est survenue, veuillez réessayer !" />
          }

        </form>
      </div>
    </>
  );
};

export default TodoForm