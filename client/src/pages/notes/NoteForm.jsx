import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import createNoteRequest from '../../api/notes/createNoteRequest';
import { Editor } from './Editor'
import { Preview } from './Preview'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../../assets/styles/note/NoteForm.css'
import AlertMessage from '../../components/common/AlertMessage';


function CreateNoteForm() {

  const [text, setText] = useState(`
  # Header 1
  
  Voici un exemple de document Mardown. Markdown permet un formatage
  syntaxique simple.
  
  Utilisez un astérisque pour agir sur votre texte, tel que :
  *italique* ou **gras**

  Créez une liste avec un tiret

  - Item 1
  - Item 2
  - Item 3

  Utilisez les back ticks pour créer un bloc de code

  \`npm install create-react-app -g\`
  \`\`\`
  function addTwoNumbers(a, b) {
    return a + b
  }
  const name = 'Benjamin'
  const age = 37
  const number = Math.random() * 10
  \`\`\`
  
  > To be, or not to be. That is a stupid question.
  ~~barré~~

  1. First item
  ---
  
  ![logo de google](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png)

  [Google](https://google.fr)
  `);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');

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
      <div className='component__title'>
        <h2>Ajouter une note</h2>

      </div>
      <form id="addNote"
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
            required
          >
            <MenuItem value="courses">Courses</MenuItem>
            <MenuItem value="personnel">Personnel</MenuItem>
            <MenuItem value="cuisine">Cuisine</MenuItem>
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
          <AlertMessage severity="success" children="Note correctement ajoutée" />
        }

        {isError &&
          <AlertMessage severity="error" children="Une erreur est survenue, veuillez réessayer !" />
        }
      </form>
    </div >
  );
};

export default CreateNoteForm