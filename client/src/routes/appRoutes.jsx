
//Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

const navItems = [
    {
        title: 'Dashboard',
        icon: <DashboardOutlinedIcon />,
        child: [
            {
                name: 'Aujourd\'hui',
                path: 'dashboard/today'
            },
            {
                name: 'Toutes les tâches',
                path: 'dashboard/allTasks'
            }
        ],
    },
    {
        title: 'Notes',
        icon: <EditNoteOutlinedIcon />,
        child: [
            {
                name: 'Ajouter une note',
                path: 'notes/createNote'
            },
            {
                name: 'Toutes les notes',
                path: 'notes/allNotes'
            },

        ],
    },
    {
        title: 'Annexes',
        icon: <AppsOutlinedIcon/>,
        child: [
            {
                name: 'Météo',
                path: 'annexes/weather'
            },

        ]
    }
]

export default navItems;