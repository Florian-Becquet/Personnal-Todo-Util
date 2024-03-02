import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader'

import readNoteRequest from '../../api/notes/readNoteRequest';
// import NoteItem from './NoteItem'
// import NoteItem from './component/notes/NoteItem'
import NoteForm from './NoteForm';
// import { TokenContext } from '../App';
import dayjs from "dayjs";
import { Editor } from './Editor'
import { Preview } from './Preview'
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotePage from './NotePage';
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
    console.log(category);
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
    <div className='container'>
      <div className='btn__category'>
        {buttons &&
          buttons.map((type, index) => (
            <Button key={index} value={type.value} onClick={(e) => setCategory(e.target.value)} variant="contained"> {type.name}</Button>
          ))}
      </div>

      <div className='notes__list'>
        {!isLoading ?

          filterCategory()
          :
          <Loader />
        }
      </div>
      {message &&
        <AlertMessage severity="success" children={message} />
      }
    </div>
  )
}

export default AllNotes;