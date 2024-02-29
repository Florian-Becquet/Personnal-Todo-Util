import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader'

import readNoteRequest from '../../api/notes/readNoteRequest';
// import NoteItem from './NoteItem'
// import NoteItem from './component/notes/NoteItem'
import CreateNoteForm from './CreateNoteForm';
// import { TokenContext } from '../App';
import dayjs from "dayjs";
import { Editor } from './Editor'
import { Preview } from './Preview'

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



export const NotePage = () => {
  const [markdown, setMarkdown] = useState('');
  // const [token] = useContext(TokenContext)
  const { isLoading, data: notes } = useQuery('notes',
    () => readNoteRequest());

  const [filtredCategory, setFiltredCategory] = useState(null);
  useEffect(() => {
    setFiltredCategory(getCategory());
  }, []);

  console.log(filtredCategory);

  function handleCategory(e) {
    let typeCategory = e.target.value;
    typeCategory !== "all" || typeCategory === 'undefined'
      ? setFiltredCategory(filterCategory(typeCategory))
      : setFiltredCategory(getCategory());
  }

  function getCategory() {
    const categoryList = notes;
    return categoryList;
  }

  function filterCategory(categoryType) {
    let filtredCategory = getCategory().filter(note => note.category === categoryType);
    console.log(filtredCategory);
    return filtredCategory;
  }

  return (
    <>
      {buttons &&
        buttons.map((type, index) => (
          <>
            <button key={index} value={type.value} onClick={handleCategory}>
              {type.name}
            </button>
          </>
        ))}
      { }

      {filtredCategory === undefined && !isLoading ?
        notes.map(note => (
          <div key={note._id}>
            <h5> {note.title} </h5>
            <h5> {note.category} </h5>
            <p> créé le {dayjs(note.date).format("DD-MM YYYY")} </p>
            <main className='w-1/2 h-[calc(100vh-50px)] bg-gray-800 text-gray-300'>
              <Preview text={note.text} />
            </main>
          </div>
        ))
        :
        <>
          {filtredCategory &&
            filtredCategory.map(note => (
              <div key={note._id}>
                <h5> {note.title} </h5>
                <h5> {note.category} </h5>
                <p> créé le {dayjs(note.date).format("DD-MM YYYY")} </p>
                <main className='w-1/2 h-[calc(100vh-50px)] bg-gray-800 text-gray-300'>
                  <Preview text={note.text} />
                </main>
              </div>
            ))}
        </>
      }

      {/* <CreateNoteForm /> */}
      {/* <div className='todo__list'>
        {isLoading
          ?
          <ClipLoader size={50} />
          :
          notes
            .map((note) => {
              return (
                <div>
                  <h5> {note.title} </h5>
                  <h5> {note.category} </h5>
                  <p> créé le {dayjs(note.date).format("DD-MM YYYY")} </p>
                  <main className='w-1/2 h-[calc(100vh-50px)] bg-gray-800 text-gray-300'>
                    <Preview text={note.text} />
                  </main>
                </div>
              )
            })
        }

      </div> */}
    </>
  )
}
