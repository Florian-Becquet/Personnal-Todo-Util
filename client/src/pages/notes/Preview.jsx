import React from 'react';
import { marked } from 'marked';

export const Preview = ({ text }) => {
    marked.setOptions({
        breaks: true
    })

    const parsed = marked.parse(text);
    return (
        <div className='preview'>
            <div className='w-full bg-gray-900 p-3 text-gray-400 uppercase tracking-wider'>Preview</div>
            <div className="p-6 prose prose-invert" dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
    )
}


