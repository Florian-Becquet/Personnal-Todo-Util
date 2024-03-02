import React, { useEffect, useState } from 'react'
import { Preview } from './Preview'
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom"
import { Editor } from './Editor';
import updateNoteRequest from '../../api/notes/updateNoteRequest';
import { useMutation, useQueryClient } from 'react-query';



const NotePage = () => {
  const queryClient = useQueryClient();
  const { mutate: updateNote } = useMutation(
    // (updatedTodo) => updateTodoRequest(updatedTodo, token),
    (updatedNote) => updateNoteRequest(updatedNote),
    {
      onSettled: () => {
        queryClient.invalidateQueries('notes');
      }

    }
  );

  // const [text, setText] = useState('')
  const location = useLocation();
  const note = location.state.note;

  return (
    <div className='container singleNote'>
      {/* <input autoFocus value={note.title} type="text" onChange={(e) => updateNote({ ...note, title: e.target.value })} />  */}
      <h3> Titre : {note.title} </h3>
      <h3> Catégorie : {note.category} </h3>
      <p> Créé le {dayjs(note.date).format("DD-MM YYYY")} </p>
      <div className='Editor__Preview'>
        <Preview text={note.text} />
      </div>
        {/* <Editor note={note} text={note.text} setText={setText} width='100%'/> */}
    </div>
  )
}

export default NotePage