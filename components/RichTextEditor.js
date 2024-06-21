// components/RichTextEditor.js
// import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles

const RichTextEditor = ({ value, onChange }) => {
    return (
        <ReactQuill value={value} onChange={onChange} />
    )
}

export default RichTextEditor
