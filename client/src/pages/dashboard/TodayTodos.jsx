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


// import "../../components/styles/TodoPage.css"
// import Weather from '../../components/Weather';

const TodayTodos = () => {
  // const [token] = useContext(TokenContext)
  const { isLoading, data: todos } = useQuery('todos',
    () => readTodosRequest());
  const [showNav, setShowNav] = useState(false);
  let arrayWithoutDuplon;
  let lengthTodayNoComplete;
  let TaskToDo;
  let TaskCompleted;
  let allTaskToDo;
  dayjs.locale('fr')


  // const config = {
  //   headers: { Authorization: token }
  // };


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

  // function sortUrgent(a) {
  //   if (a.category === "Urgent") {
  //     return -1;
  //   }
  //   return 0;
  // }
  // if (!isLoading) {
  //   todos.sort(sortUrgent);
  // }


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
    console.log(allTaskToDo);
  }




  return (
    <>
      <button onClick={() => setShowNav(!showNav)}>Ajouter une tâche</button>
      <TodoForm showNav={showNav} setShowNav={setShowNav} />
      {isLoading
        ?
        <ClipLoader size={50} />
        :
        <div className='todo__container'>
          <div className='todo__title'>
            <div>
              <h2>Todo</h2>
              <p>{TaskToDo.length} tâches en cours.</p>
            </div>
            {allTaskToDo.length !== 0 ?
              <div className='pourcent'>
                <div style={{ width: `calc(100% / ${allTaskToDo.length} * ${TaskCompleted.length})` }}>
                  <p>{100 / allTaskToDo.length * TaskCompleted.length} % complétées</p>
                </div>
              </div>
              :
              ''
            }
            <h2>{dayjs(new Date()).format("DD MMMM")}</h2>
          </div>
          <div className='todo__wrapper'>
            {lengthTodayNoComplete === 0 ?
              <div style={{ textAlign: 'center' }}>Aucune tâche en cours ! </div>
              :
              todos
                .filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed != true)
                .map((todo) => {
                  {
                    return (
                      <TodoItem todo={todo} key={todo._id} spacing={2} />
                    )
                  }

                })
            }

          </div>
          {console.log(TaskCompleted.length)}
          {TaskCompleted.length !== 0 ?
              <h2 style={{ fontSize: "32px", marginLeft: "8px", margin: "20px 0" }}>Complété</h2>
            :
            ''
          }
          <div className='todo__wrapper'>
            {todos
              .filter((todo) => dayjs(new Date()).format("dddd DD/MM") === dayjs(todo.date).format("dddd DD/MM") && todo.completed === true)
              .map((todo) => {
                return (<TodoItem todo={todo} key={todo._id} />)
              })
            }
          </div>
        </div>
      }
    </>
  )
}

export default TodayTodos