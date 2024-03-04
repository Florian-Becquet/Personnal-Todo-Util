import React from 'react';
import { marked } from 'marked';
// import dompurifiy from "dompurify";
import hljs from 'highlight.js';
// import 'highlight.js/styles/tokyo-night-dark.css';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Preview = ({ text }) => {

    const parsed = marked.parse(text);
    return (
        <div className='preview'>
            <div className='w-full bg-gray-900 p-3 text-gray-400 uppercase tracking-wider'>Preview</div>
            <div className="p-6 prose prose-invert" dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
    )
}

