import React, { useState } from 'react'
import dayjs from "dayjs";
// import { Preview } from '../../pages/notes/Preview';
import { Link } from 'react-router-dom';
import { Preview } from '../../pages/notes/Preview';
import NoteIdPage from '../../pages/notes/NotePage';
// import NoteIdPage from '../../pages/notes/NoteIdPage';
import '../../assets/styles/note/NoteItem.css'
import DeleteIcon from '@mui/icons-material/Delete';

import { useQueryClient, useMutation } from 'react-query'
// import updateTodoRequest from '../../api/todos/updateTodoRequest';
import deleteNoteRequest from '../../api/notes/deleteNoteRequest';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


const NoteItem = ({ note, setMessage }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState('');

  const { mutate: deleteNote } = useMutation(
    (deletedNote) => deleteNoteRequest(deletedNote),
    {
      onSettled: () => {
        // setIsDeleting(true);
        // setTimeout(() => {
        //   setIsDeleting(false)
        // }, 500)
        queryClient.invalidateQueries('notes');
        setMessage('Note supprimée')
        setTimeout(() => {
          setMessage('')
        }, 3001)
      },
    }
  );

  const deleting = isDeleting ? 'deleting' : '';
  return (
    //  <Link to={`/notes/${note._id}`}>ici</Link> 

    <div className={`note__item ${deleting}`}>
      <h5> {note.title} </h5>
      <h5 className='hiddenText'> {note.title} </h5>
      <div className='note__option'>
        <Link to={`/notes/${note._id}`} state={{ note: note }}>
          <Button variant="outlined" color="primary" startIcon={<VisibilityIcon />} />
        </Link>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteNote(note)} />
      </div>
    </div>
  )
}

export default NoteItem