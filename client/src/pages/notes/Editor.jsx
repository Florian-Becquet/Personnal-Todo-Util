import React from 'react'

export const Editor = ({ text, setText }) => {
    return (
        <div className='border-r-2 border-gray-600 overflow-y-auto'>
            <div className='w-full bg-gray-900 p-3 text-gray-400 uppercase tracking-wider'>Markdown</div>
            <textarea autoFocus value={text} className='w-full h-[calc(100vh-410px)] bg-gray-800 outline-none p-6' onChange={(e) => setText(e.target.value)}>{text}</textarea>
        </div>
    )
}
