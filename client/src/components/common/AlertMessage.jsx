import { useState, useEffect } from 'react'
import { Alert } from '@mui/material';

import '../../assets/styles/common/Alert.css'

const AlertMessage = ({ severity, children }) => {
    const [show, setShow] = useState(true)

    // On componentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 30000000)
        
        return () => {
            clearTimeout(timeId)
            // children = '';
        }
    }, []);

    // If show is false the component will return null and stop here
    if (!show) {
        return null;
    }

    // If show is true this will be returned
    return (
        <Alert className="alert" severity={severity} sx={{mt: 3}}>
            {children}
        </Alert>
    )
}

export default AlertMessage;