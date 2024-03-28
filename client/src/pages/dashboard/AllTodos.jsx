import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader'

import readTodosRequest from '../../api/todos/readTodosRequest';


import TodoItem from '../../components/todo/TodoItem';
// import CreateTodoForm from '../../components/Todo/CreateTodoForm';
// import { TokenContext } from '../App';
import dayjs from "dayjs";
// import { API_URL } from "../../api/config"
// import axios from 'axios';
import 'dayjs/locale/fr'
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';

// import "../../components/styles/TodoPage.css"
// import Weather from '../component/annexes/Weather';
// import Food from '../component/annexes/Food';

const AllTodos = () => {

    const { isLoading, data: todos } = useQuery('todos',
        () => readTodosRequest());
    const [message, setMessage] = useState('')
    let arrayWithoutDuplon;
    let TaskToDo;
    let TaskCompleted;

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

    // function sortUrgent(a) {
    //   if (a.category === "Urgent") {
    //     return -1;
    //   }
    //   return 0;
    // }
    // if (!isLoading) {
    //   todos.sort(sortUrgent);
    // }


    // function removeDuplicates() {
    //     let unique = [];
    //     todos.forEach(todo => {
    //         let forDate = dayjs(todo.date).format("dddd DD/MM");
    //         if (!unique.includes(forDate)) {
    //             unique.push(forDate);
    //         }

    //     })
    //     return unique;
    // }
    function removeDuplicates() {
        let unique = [];
        todos.filter((todo) => dayjs(todo.date).format("dddd DD/MM") && todo.completed != true)
            .map(todo => {
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

    const TasksCompleted = () => {
        let TasksCompletedToday = [];
        todos.filter((todo) => dayjs(todo.date).format("dddd DD/MM") && todo.completed === true)
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




    return (
        <>
            {isLoading
                ?
                <Loader message="Un peu de patience s'il vous plaît"/>
                :
                <div className='container'>
                    <div className='component__title'>
                        <h2>All Todos</h2>
                    </div>
                    {/* <div className='todo__subtitle'>
                        <div>
                            <p>Tâches en cours </p>
                        </div>
                        <div>
                            <p>Tâches complétées </p>
                        </div>
                    </div> */}
                    <div className='todo'>
                        <div className='inProgress'>
                            <div className='todo__subtitle'>
                                <div>
                                    <p>Tâches en cours </p>
                                </div>
                            </div>
                            {arrayWithoutDuplon.length !== 0 ?
                                arrayWithoutDuplon.map((day, index) =>
                                    <div key={index}>
                                        <p>{day}</p>

                                        <div className='todo__wrapper'>
                                            {todos
                                                .filter((todo) => dayjs(todo.date).format("dddd DD/MM") === day && todo.completed != true)
                                                .map((todo) => {
                                                    return (<TodoItem setMessage={setMessage} todo={todo} key={todo._id} />)
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                                :
                                'Aucune tâche en cours'
                            }
                        </div>
                        {TaskCompleted.length !== 0 ?
                            <div className='completed'>
                                <div className='todo__subtitle'>
                                    <div>
                                        <p>Tâches complétées </p>
                                    </div>
                                </div>
                                <div className='todo__wrapper'>
                                    {todos
                                        .filter((todo) => todo.completed === true)
                                        .map((todo) => {
                                            return (<TodoItem setMessage={setMessage} todo={todo} key={todo._id} />)
                                        })}
                                </div>
                            </div>

                            :
                            ''
                        }

                        {message &&
                            <AlertMessage severity="success" children={message} />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default AllTodos