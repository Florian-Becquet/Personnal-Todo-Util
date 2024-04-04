import React, { useState } from 'react';
import { useQuery } from 'react-query';

import readTodosRequest from '../../api/todos/readTodosRequest';

import TodoItem from '../../components/todo/TodoItem';
import dayjs from "dayjs";
import 'dayjs/locale/fr'
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';
import InfoIcon from '@mui/icons-material/Info';


const AllTodos = () => {

    const { isLoading, data: todos } = useQuery('todos',
        () => readTodosRequest());
    const [message, setMessage] = useState('')
    let arrayWithoutDuplon;
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
        todos.filter((todo) => dayjs(todo.date).format("dddd DD/MM") && todo.completed === true && Math.round(((dayjs(todo.date) - dayjs(new Date())) / 3_600_000) * 60) > 0)
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
                        <div className='infoCompleted'><InfoIcon /><p>Les tâches complétées et expirées sont automatiquement supprimées. </p></div>
                        <h2>All Todos</h2>
                    </div>
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
                                        .filter((todo) => todo.completed === true && Math.round(((dayjs(todo.date) - dayjs(new Date())) / 3_600_000) * 60) > 0)
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