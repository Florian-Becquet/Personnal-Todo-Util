import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader'

import readTodosRequest from '../../api/todos/readTodosRequest';


import TodoItem from '../../components/todo/TodoItem';

import dayjs from "dayjs";
// import { API_URL } from "../../api/config"
// import axios from 'axios';
import 'dayjs/locale/fr'
import TodoForm from './TodoForm';
import AlertMessage from '../../components/common/AlertMessage';
import { Box, Button, LinearProgress, TextField } from '@mui/material';
import Loader from '../../components/common/Loader';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// import "../../components/styles/TodoPage.css"
// import Weather from '../../components/Weather';

const TodayTodos = () => {
  // const [token] = useContext(TokenContext)

  const { isLoading, data: todos } = useQuery('todos',
    () => readTodosRequest());
  const [showNav, setShowNav] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('')
  let arrayWithoutDuplon;
  let lengthTodayNoComplete;
  let TaskToDo;
  let TaskCompleted;
  let allTaskToDo;
  dayjs.locale('fr')


  function sortDate(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }
  if (!isLoading) {
    todos.sort(sortDate);
  }

  const lengthTodayNoCompleted = () => {
    const length = todos.filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed != true).length
    return length
  }

  if (!isLoading) {
    lengthTodayNoComplete = lengthTodayNoCompleted();
  }



  function removeDuplicates() {
    let unique = [];
    todos.forEach(todo => {
      let forDate = dayjs(todo.date).format("dddd DD/MM");
      if (!unique.includes(forDate)) {
        unique.push(forDate);
      }

    })
    return unique;
  }
  if (!isLoading) {
    arrayWithoutDuplon = removeDuplicates();
  }


  const TasksToDo = () => {
    let TasksToDoToday = [];
    todos.filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed != true)
      .map((todo) => {
        {
          TasksToDoToday.push(todo)
        }

      })
    return TasksToDoToday
  }
  if (!isLoading) {
    TaskToDo = TasksToDo();
  }

  const TasksCompleted = () => {
    let TasksCompletedToday = [];
    todos.filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed === true)
      .map((todo) => {
        {
          TasksCompletedToday.push(todo)
        }

      })
    return TasksCompletedToday
  }
  if (!isLoading) {
    TaskCompleted = TasksCompleted();
  }

  const TaskToday = () => {
    let allTask = [];
    todos.filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM"))
      .map((todo) => {
        {
          allTask.push(todo)
        }

      })
    return allTask
  }
  if (!isLoading) {
    allTaskToDo = TaskToday();
  }




  return (
    <>
      {/* <TodoForm showNav={showNav} setShowNav={setShowNav} /> */}
      {isLoading
        ?
        <Loader message="Un peu de patience s'il vous plaît"/>
        :
        <div className='container'>
          <TodoForm showNav={showNav} setShowNav={setShowNav} />
          {/* <Button onClick={() => setShowNav(!showNav)} variant="contained">Ajouter une tâche</Button> */}
          <div className='component__title'>
            <h2>Todo - {dayjs(new Date()).format("DD MMMM")}</h2>

          </div>

          <div className='todo'>
            <div className='inProgress'>
              <div className='todo__subtitle'>
                {/* <div> */}
                <p>Tâches en cours - {TaskToDo.length} </p>
                {/* </div> */}
              </div>
              {todos
                .filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed != true)
                .map((todo) => {
                  {
                    return (
                      <TodoItem todo={todo} key={todo._id} spacing={2} setMessage={setMessage} />
                    )
                  }

                })
              }
              <p className="addTask" onClick={() => setShowNav(!showNav)}><AddOutlinedIcon /> Ajouter une tâche</p>
              {/* <Button onClick={() => setShowNav(!showNav)} variant="contained">Ajouter une tâche</Button> */}
            </div>
            {TaskCompleted.length !== 0 ?
              <div className='completed'>
                <div className='todo__subtitle'>

                  {/* <div> */}
                  {allTaskToDo.length !== 0 ?
                    <div className='pourcent'>
                      <p>Complétées - {Math.round(100 / allTaskToDo.length * TaskCompleted.length)}&nbsp;%</p>
                      <div>
                        <LinearProgress variant="determinate" value={Math.round(100 / allTaskToDo.length * TaskCompleted.length)} />
                      </div>
                    </div>
                    :
                    ''
                  }
                  {/* </div> */}

                </div>

                {todos
                  .filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed === true)
                  .map((todo) => {
                    return (<TodoItem todo={todo} key={todo._id} setMessage={setMessage} />)
                  })
                }
                {/* </div> */}
              </div>
              :
              ''
            }
          </div>
        </div>
      }
      {message &&
        <AlertMessage severity="success" children={message} />
      }
    </>
  )
}

export default TodayTodos