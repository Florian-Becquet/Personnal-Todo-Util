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
import '../../assets/styles/note/NoteForm.css'
import AlertMessage from '../../components/common/AlertMessage';
import NotePage from './NotePage';
import hljs from 'highlight.js';




function CreateNoteForm() {
  // const [token] = useContext(TokenContext)
  // const [markdown, setMarkdown] = useState('Salut');



  const [text, setText] = useState(`
  # H1
  ## H2
  - Item 1
  - Item 2
  \`\`\`
  Code
  \`\`\`
  **Bold** - *Italic*
  > Quote
  ~~barré~~

  1. First item
  ---
  
  ![logo de google](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png)

  [Google](https://google.fr)
  `);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');



  // console.log(dateLocale);

  const queryClient = useQueryClient();

  const { isLoading, isSuccess, isError, mutate: createNote } = useMutation(
    (newNote) => createNoteRequest(newNote),
    {
      onSettled: () => {
        queryClient.invalidateQueries('notes');
      },
    }
  );


  return (
    <div className='container'>
      <div className='todo__title'>
        <div>
          <h2>Ajouter une note</h2>

        </div>


      </div>
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
        <TextField label="Titre" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required sx={{ mb: 3 }} />
        <FormControl fullWidth sx={{ mt: 3 }} className='select__note'>
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
            <MenuItem value="autre">Autre</MenuItem>
          </Select>
        </FormControl>
        <div className='Editor__Preview'>
          <Editor text={text} setText={setText} />
          <Preview text={text} />
        </div>
        <input type="hidden" value={date}></input>
        <Button variant="contained" endIcon={<SendIcon />} type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
          Créer
        </Button>
        {isSuccess &&
          <AlertMessage severity="success" children="Tâche correctement ajoutée" />
        }

        {isError &&
          <AlertMessage severity="error" children="Une erreur est survenue, veuillez réessayer !" />
        }
      </form>
    </div>
  );
};

export default CreateNoteForm