import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import readTodosRequest from '../../api/todos/readTodosRequest';

import TodoItem from '../../components/todo/TodoItem';

import dayjs from "dayjs";

import 'dayjs/locale/fr'
import TodoForm from './TodoForm';
import AlertMessage from '../../components/common/AlertMessage';
import {LinearProgress} from '@mui/material';
import Loader from '../../components/common/Loader';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { setGlobalState } from '../../redux/store';

const TodayTodos = () => {
  // const [token] = useContext(TokenContext)

  const { isLoading, data: todos } = useQuery('todos',
    () => readTodosRequest());

    useEffect(() => {
      
      setGlobalState("todos", todos);
      setGlobalState('loading', isLoading)
    }, [isLoading])


    if(!isLoading) {
    }

   
  const [showNav, setShowNav] = useState(false);

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
    todos.filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed === true && Math.round(((dayjs(todo.date) - dayjs(new Date())) / 3_600_000) * 60) > 0)
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
                <p>Tâche(s) en cours - {TaskToDo.length} </p>
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
                  .filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed === true && Math.round(((dayjs(todo.date) - dayjs(new Date())) / 3_600_000) * 60) > 0)
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