import './App.css'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import TodayTodos from './pages/dashboard/TodayTodos'
import AllTodos from './pages/dashboard/AllTodos'
import Weather from './pages/annexes/Weather'
import NoteForm from './pages/notes/NoteForm'
import AllNotes  from './pages/notes/AllNotes'
import NotePage from './pages/notes/NotePage';
import TodoUpdate from './pages/dashboard/TodoUpdate'




function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/todos/today" element={<TodayTodos />} />
        <Route path="/todos/allTasks" element={<AllTodos />} />
        <Route path="/todos/update/:id" element={<TodoUpdate />} />
        <Route path="/annexes/weather" element={<Weather />} />
        <Route path="notes/createNote" element={<NoteForm />} />
        <Route path="/notes/allNotes" element={<AllNotes />} />
        <Route path="/notes/:id" element={<NotePage />} />
      </Route>
    </Routes>
  )
}

export default App
