import React from 'react'

export const Editor = ({ text, setText }) => {

   
    function handleKeyDown(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            console.log('ok');
            return false;
        }
      }
    return (
        <div className='editor'>
            <div>Markdown</div>
            <textarea  onKeyDown={(e) => { if (e.keyCode === 9) e.preventDefault() }} spellCheck="false" required autoFocus value={text} onChange={(e) => setText(e.target.value)}>{text}</textarea>
        </div>
    )
}
