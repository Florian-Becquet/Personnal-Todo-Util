import './App.css'
import { Route, Routes } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import TodayTodos from './pages/dashboard/TodayTodos'
import AllTodos from './pages/dashboard/AllTodos'
import Weather from './pages/annexes/Weather'
import CreateNoteForm from './pages/notes/CreateNoteForm'
import { NotePage } from './pages/notes/NotePage'




function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/dashboard/today" element={<TodayTodos />} />
        <Route path="/dashboard/allTasks" element={<AllTodos />} />
        <Route path="/annexes/weather" element={<Weather />} />
        <Route path="/notes/createNote" element={<CreateNoteForm />} />
        <Route path="/notes/allNotes" element={<NotePage />} />

      </Route>
    </Routes>
  )
}

export default App
