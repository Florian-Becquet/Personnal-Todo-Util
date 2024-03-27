
//Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArticleIcon from '@mui/icons-material/Article';
import AirIcon from '@mui/icons-material/Air';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';


const navItems = [
    {
        title : 'Aujourd\'hui',
        path: 'todos/today',
        icon: <TodayIcon />,
        className: 'today'
    },
    {
        title : 'A venir',
        path: 'todos/allTasks',
        icon: <CalendarMonthIcon />,
        className: 'allTasks'
    },
    {
        title : 'Ajouter une note',
        path: 'notes/createNote',
        icon: <EditNoteIcon />,
        className: 'createNote'
    },
    {
        title : 'Toutes les notes',
        path: 'notes/allNotes',
        icon: <ArticleIcon />,
        className: 'allNotes'
    },
    {
        title : 'Météo',
        path: 'annexes/weather',
        icon: <CloudOutlinedIcon />,
        className: 'meteo'
    }
]

// const navItems = [
//     {
//         title: 'Dashboard',
//         icon: <DashboardOutlinedIcon />,
//         child: [
//             {
//                 name: 'Aujourd\'hui',
//                 path: 'dashboard/today'
//             },
//             {
//                 name: 'Toutes les tâches',
//                 path: 'dashboard/allTasks'
//             }
//         ],
//     },
//     {
//         title: 'Notes',
//         icon: <EditNoteOutlinedIcon />,
//         child: [
//             {
//                 name: 'Ajouter une note',
//                 path: 'notes/createNote'
//             },
//             {
//                 name: 'Toutes les notes',
//                 path: 'notes/allNotes'
//             },

//         ],
//     },
//     {
//         title: 'Annexes',
//         icon: <AppsOutlinedIcon/>,
//         child: [
//             {
//                 name: 'Météo',
//                 path: 'annexes/weather'
//             },

//         ]
//     }
// ]

export default navItems;