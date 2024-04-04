import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../../assets/styles/note/NoteItem.css'
import DeleteIcon from '@mui/icons-material/Delete';

import { useQueryClient, useMutation } from 'react-query'
import deleteNoteRequest from '../../api/notes/deleteNoteRequest';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


const NoteItem = ({ note, setMessage }) => {
  const queryClient = useQueryClient();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { isLoading: deleteIsLoading, mutate: deleteNote } = useMutation(
    (deletedNote) => deleteNoteRequest(deletedNote),
    {
      onSettled: () => {
        queryClient.invalidateQueries('notes');
        setMessage('Note supprimée')
        setTimeout(() => {
          setMessage('')
        }, 3001)
      },
    }
  );

  const isDeleting = deleteIsLoading ? 'deleting'  : ''

  return (
    //  <Link to={`/notes/${note._id}`}>ici</Link> 
    <>
      {confirmDelete ?
        <div className='deletePopup'>
          <div className='deleteModal'>
            <p>Supprimer "{note.title}"</p>
            <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
            <div>
              <p onClick={() => setConfirmDelete(!confirmDelete)}> Non </p>
              <p onClick={() => deleteNote(note)}> Oui </p>
            </div>
          </div>
        </div>
        :
        ''

      }

      <div className={`note__item ${isDeleting}`}>
        <h4> {note.title} </h4>
        <h4 className='hiddenText'> {note.title} </h4>
        <div className='note__option'>
          <Link to={`/notes/${note._id}`} state={{ note: note }}>
            <Button variant="outlined" color="primary" startIcon={<VisibilityIcon />} />
          </Link>
          <button onClick={() => setConfirmDelete(!confirmDelete)}><DeleteIcon /></button>
        </div>
      </div>
    </>
  )
}

export default NoteItem