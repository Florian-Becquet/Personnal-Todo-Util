import React, { useState } from 'react';
import { useQuery } from 'react-query';


import readNoteRequest from '../../api/notes/readNoteRequest';

import NoteItem from '../../components/note/NoteItem';
import { Button } from '@mui/material';
import AlertMessage from '../../components/common/AlertMessage';
import '../../assets/styles/note/AllNotes.css'
import Loader from '../../components/common/Loader';

export const buttons = [
  {
    name: "All",
    value: "all"
  },
  {
    name: "Courses",
    value: "courses"
  },
  {
    name: "Personnel",
    value: "personnel"
  },
  {
    name: "Cuisine",
    value: "cuisine"
  },
  {
    name: "Autre",
    value: "autre"
  }
];



const AllNotes = () => {
  const [markdown, setMarkdown] = useState('');
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('all');

  // const [token] = useContext(TokenContext)
  const { isLoading, data: notes } = useQuery('notes',
    () => readNoteRequest());


  const filterCategory = () => {
    if (category === 'all') {
      return (notes.map(note => {
        return (
          <NoteItem key={note._id} note={note} setMessage={setMessage} />
        )
      }))
    } else {
      return (notes.filter((note) => note.category === category)
        .map((note) => {
          return (
            <NoteItem key={note._id} note={note} setMessage={setMessage} />
          )
        }))
    }
  }


  return (
    <>
      {isLoading ?
        <Loader message="Un peu de patience s'il vous plaît" />
        :
        <div className='container'>
          <div className='btn__category'>
            {buttons &&
              buttons.map((type, index) => (
                <Button key={index} value={type.value} onClick={(e) => setCategory(e.target.value)} variant="contained"> {type.name}</Button>
              ))}
          </div>

          <div className='notes__list'>
            {!isLoading ?
              filterCategory().length === 0 ?
                <p>Aucune note pour cette catégorie ! </p>
                :
                filterCategory()
              :
              <Loader />
            }
          </div>
          {message &&
            <AlertMessage severity="success" children={message} />
          }
        </div>
      }
    </>

  )
}

export default AllNotes;