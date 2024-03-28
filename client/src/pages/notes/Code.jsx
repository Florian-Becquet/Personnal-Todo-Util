import React, { useEffect, useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Code = ({ children, language }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000)

        return () => clearTimeout(timer);
    }, [copied])

    return (
        <div className="code">
            <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
                {copied ? <ContentPasteIcon /> : <ContentCopyIcon />}
            </CopyToClipboard>
            <SyntaxHighlighter language={language} style={materialDark}>
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

export default Code