import React from 'react';
import formulaIcon from "../../assets/fxx.webp"

const EditorInfo = () => {
    return (
        <ul style={{ textAlign: "left" }}>
            <li>This editor supports rich text formatting such as bold, italic, underline, and bullet points.</li>
            <li>Teachers can insert mathematical expressions using LaTeX, with real-time preview before inserting.</li>
            <li>LaTeX formulas are automatically converted into clear, high-resolution images within the editor.</li>
            <li>Unwanted local file references (like <code>file://</code> images) are automatically removed to ensure clean content.</li>
            <li>The toolbar includes features like tables, lists, text alignment, undo/redo, and formula buttons.</li>
            <li>Inserted formulas retain their original LaTeX code internally for accurate review or future editing.</li>
            <li>Ideal for preparing structured questions, equations, and diagrams for question printable data.</li>
            <li> Once all content is visible, use the download option to save your question as an HTML file for question bank usage.</li>
            <li>Note: Click the formula <img src={formulaIcon} alt='formula-icon' style={{ width: "20px", height: "auto", verticalAlign: "middle" }} /> button to insert LaTeX-based math expressions.</li>
            <li>Note: Dont click on Download File button without adding any Content.</li>
        </ul>
    );
};

export default EditorInfo;
