import React from 'react'

export const Editor = ({ text, setText }) => {
    return (
        <div className='editor'>
            <div>Markdown</div>
            <textarea required autoFocus value={text} onChange={(e) => setText(e.target.value)}>{text}</textarea>
        </div>
    )
}
