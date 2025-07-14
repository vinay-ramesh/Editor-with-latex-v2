import React, { useRef, useMemo, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import katex from 'katex';
import html2canvas from 'html2canvas';
import 'katex/dist/katex.min.css';
import 'jodit/es5/jodit.min.css';
import formulaIcon from "../../assets/fxx.webp";
import "./JoditEditorWithLatex.css";
import { dialogContent } from "./helperVariables";

const JoditEditorWithLatex = ({ editorText, setEditorText }) => {
    const editor = useRef(null);

    const insertLatexAsImage = (editorInstance, latexCode) => {
        try {
            const html = katex.renderToString(latexCode, {
                throwOnError: false,
                displayMode: true,
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            tempDiv.style.cssText = `
                position: absolute;
                left: -9999px;
                top: -9999px;
                background: white;
                padding: 2px;
                font-size: 24px;
            `;

            const katexElement = tempDiv.querySelector('.katex-display');
            if (katexElement) {
                // CSS margin values require a unit, e.g., '0px' or just '0'
                katexElement.style.margin = '0';
            }

            document.body.appendChild(tempDiv);

            setTimeout(() => {
                html2canvas(tempDiv, {
                    backgroundColor: null,
                    scale: 3,
                    useCORS: true,
                }).then(canvas => {
                    const imageDataUrl = canvas.toDataURL('image/png');
                    editorInstance.s.focus();

                    const img = editorInstance.createInside.element('img');
                    img.src = imageDataUrl;
                    img.setAttribute('data-latex', latexCode);
                    img.setAttribute('alt', `LaTeX: ${latexCode}`);
                    img.style.verticalAlign = 'middle';
                    img.style.maxWidth = '100%';
                    // This can be adjusted based on preference
                    img.style.height = `${canvas.height / 6}px`;

                    editorInstance.s.insertImage(img, false, null);
                    document.body.removeChild(tempDiv);
                }).catch(error => {
                    console.error('Error converting LaTeX to image:', error);
                    document.body.removeChild(tempDiv);
                    editorInstance.events.fire('errorMessage', 'Error creating formula image.');
                });
            }, 300);

        } catch (error) {
            console.error('Error rendering LaTeX:', error);
            editor.current.events.fire('errorMessage', 'Invalid LaTeX syntax.');
        }
    };

    const showLatexDialog = useCallback((editorInstance) => {
        editorInstance.s.save();
        const dialog = editorInstance.dlg({
            title: 'Insert LaTeX Formula',
            resizable: false,
            draggable: true,
            buttons: ['fullsize', 'dialog.close']
        });
        dialog.setContent(dialogContent);
        dialog.open();
        const latexInput = dialog.container.querySelector('#latex-input');
        const latexPreview = dialog.container.querySelector('#latex-preview');
        const insertBtn = dialog.container.querySelector('#latex-insert');
        const cancelBtn = dialog.container.querySelector('#latex-cancel');

        const updatePreview = () => {
            const latexCode = latexInput.value.trim();
            if (latexCode) {
                try {
                    latexPreview.innerHTML = katex.renderToString(latexCode, { throwOnError: false, displayMode: true });
                } catch (error) {
                    latexPreview.innerHTML = '<span style="color: red;">Error: Invalid LaTeX syntax</span>';
                }
            } else {
                latexPreview.innerHTML = 'Enter LaTeX above to see preview';
            }
        };

        latexInput.addEventListener('input', updatePreview);
        cancelBtn.addEventListener('click', (e) => { e.preventDefault(); dialog.close(); });
        insertBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const latexCode = latexInput.value.trim();
            if (latexCode) {
                editorInstance.s.restore();
                insertLatexAsImage(editorInstance, latexCode);
                dialog.close();
            }
        });
        latexInput.focus();
    }, []); // Note: The empty dependency array is key

    const config = useMemo(() => ({
        readonly: false,
        height: "80vh",
        uploader: { insertImageAsBase64URI: true },
        buttons: [
            'bold', 'italic', 'underline', '|', 'subscript', 'superscript', '|', 'ul', 'ol', '|',
            'brush', '|', 'image', '|', 'table', '|', 'align', '|', 'undo', 'redo', '|', 'eraser'
        ],
        extraButtons: [{
            name: 'latex',
            iconURL: formulaIcon,
            tooltip: 'Insert LaTeX Formula',
            exec: (editor) => showLatexDialog(editor)
        }],
        statusbar: false
    }), [showLatexDialog]);

    return (
        <div className='editor'>
            <JoditEditor
                ref={editor}
                value={editorText}
                config={config}
                tabIndex={1}
                onBlur={newContent => setEditorText(newContent)}
            />
        </div>
    );
};

export default JoditEditorWithLatex;