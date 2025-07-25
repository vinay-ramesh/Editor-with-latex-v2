import React from 'react';

const EditorInfo = () => {
    return (
        <ul style={{ textAlign: "left" }}>
            <li>This editor supports rich text formatting such as bold, italic, underline, and bullet points.</li>
            <li>Teachers can insert mathematical expressions using LaTeX, with real-time preview before inserting.</li>
            <li>LaTeX formulas are automatically converted into clear, high-resolution images within the editor.</li>
            <li>Unwanted local file references (like <code>file://</code> images) are automatically removed to ensure clean content.</li>
            <li>The toolbar includes features like tables, lists, text alignment, undo/redo, and formula buttons.</li>
            <li>Inserted formulas retain their original LaTeX code internally for accurate review or future editing.</li>
            <li>The editor is designed for consistent use across devices with minimal distractions.</li>
            <li>All content is sanitized to remove unnecessary formatting or symbols, ensuring clean output for printing or publishing.</li>
            <li>Ideal for preparing structured questions, equations, and diagrams in a printable format.</li>
            <li>Note: Click the formula (∑) button to insert LaTeX-based math expressions.</li>
            <li>Note: Dont click on Download File button without adding any Content.</li>
        </ul>
    );
};

export default EditorInfo;
