import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import createNoteRequest from '../../api/notes/createNoteRequest';
// import { TokenContext } from '../../App';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css'
import { Editor } from './Editor'
import { Preview } from './Preview'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';




function CreateNoteForm() {
    // const [token] = useContext(TokenContext)
    // const [markdown, setMarkdown] = useState('');

    

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');



    // console.log(dateLocale);

    const queryClient = useQueryClient();

    const { mutate: createNote } = useMutation(
        (newNote) => createNoteRequest(newNote),
        {
            onSettled: () => {
                queryClient.invalidateQueries('notes');
            },
        }
    );


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!text || !title) return;
                createNote({
                    text,
                    date,
                    title,
                    category,
                });
                setText('')
                setTitle('');
                setCategory('');
            }}
        >
            <TextField label="Titre" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required sx={{mb : 3}}/>
            <FormControl fullWidth sx={{mt : 3}}>

          <InputLabel required id="demo-simple-select-label">Catégorie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Catégorie *"
            onChange={(e) => setCategory(e.target.value)}

          >
            <MenuItem value="courses">Courses</MenuItem>
            <MenuItem value="personnel">Personnel</MenuItem>
            <MenuItem value="urgent">Autre</MenuItem>
          </Select>
        </FormControl>
           <main className='w-full h-[calc(100vh-350px)] grid grid-cols-1 sm:grid-cols-2 bg-gray-800 text-gray-300'>
            <Editor text={text} setText={setText} width='100%'/>
            <Preview text={text} />
          </main>
            <input type="hidden" value={date}></input>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' sx={{mt : 3, width: "50%", mx : 'auto'}}>
            Créer
          </Button>
        </form>
    );
};

export default CreateNoteForm