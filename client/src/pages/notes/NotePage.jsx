import React, { useEffect, useState } from 'react'
import { Preview } from './Preview'
import dayjs from "dayjs";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Editor } from './Editor';
import updateNoteRequest from '../../api/notes/updateNoteRequest';
import { useMutation, useQueryClient } from 'react-query';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const NotePage = () => {

  // const [text, setText] = useState('')
  const location = useLocation();
  const note = location.state.note;

  const [values, setValues] = useState({
    id: note._id,
    title: note.title,
    date: note.date,
    text: note.text,
    category: note.category,
})
console.log(values);

const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://personnal-todo-util.onrender.com/notes/${note._id}`, values)
            .then(res => {
                navigate('/notes/allNotes', { message: 'Note correctement modifiée' });
                // message = 'Tâche correctement modifiée'
            })
            .catch(err => console.log(err))
    }

  return (
    // <div className='container singleNote'>
    //   {/* <input autoFocus value={note.title} type="text" onChange={(e) => updateNote({ ...note, title: e.target.value })} />  */}
    //   <h3> Titre : {note.title} </h3>
    //   <h3> Catégorie : {note.category} </h3>
    //   <p> Créé le {dayjs(note.date).format("DD-MM YYYY")} </p>
    //   <div className='Editor__Preview'>
    //     <Preview text={note.text} />
    //   </div>
    //     {/* <Editor note={note} text={note.text} setText={setText} width='100%'/> */}
    // </div>

<div className='singleNote container'>
<form onSubmit={handleSubmit}>
    {/* <input type='text' name="title" value={values.text} onChange={e => setValues({...values, text: e.target.value})}/> */}
    {/* <input type='text' name="category" value={values.category} onChange={e => setValues({...values, category: e.target.value})}/> */}
    {/* {text} */}
    <TextField label="Titre" variant="outlined" value={values.title} onChange={e => setValues({ ...values, title: e.target.value })} required sx={{ mb: 3 }} />
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
            <MenuItem value="courses">Courses</MenuItem>
            <MenuItem value="autre">Autre</MenuItem>
        </Select>
        <div className='Editor__Preview'>
          <Editor text={note.text}  />
          <Preview text={note.text} />
        </div>
        <Button variant="contained" endIcon={<SendIcon />} type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
            Sauvegarder
        </Button>
        {/* <input type="hidden" value={currentDate}></input> */}
    </FormControl>
</form>
</div>
  )
}

export default NotePage