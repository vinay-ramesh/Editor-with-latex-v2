import { useCallback, useState } from "react";
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [questionContent, setQuestionContent] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [className, setClassName] = useState("")

  const handleSave = () => {
    setIsModalOpen(false);
    updateQuestionContent();
    setEditorText("");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setClickedIndex(-1); // Reset index on close
    setEditorText("");   // Reset editor text on close
  };

  const closeConfirmWithAnimation = (onCloseCallback) => {
    const overlay = document.querySelector('.react-confirm-alert-overlay');
    const modal = document.querySelector('.react-confirm-alert');

    if (modal) {
      modal.classList.add('fade-out');
      setTimeout(() => {
        overlay?.remove();
        onCloseCallback?.(); // Reset state after close
      }, 300); // Match duration in CSS
    }
  };

  // const updateQuestionContent = useCallback(() => {
  //   console.log({ clickedIndex, editorText })
  //   if (editorText) {
  //     if (clickedIndex === -1) {
  //       setQuestionContent(prevState => [...prevState, { content: editorText, type: className }]);
  //     } else if (editorText !== '<p><br></p>') {
  //       const updatedCustomList = questionContent.map((item, index) => {
  //         if (index === clickedIndex) {
  //           return { ...item, content: editorText };
  //         }
  //         return item;
  //       });
  //       setQuestionContent(updatedCustomList);
  //       setClickedIndex(-1);
  //     } else if (editorText === '<p><br></p>' && clickedIndex !== 0) {
  //       // Removing element from list if the editor text is '<p><br></p>'
  //       const updatedList = questionContent.filter((ele, index) => index !== clickedIndex)
  //       setQuestionContent(updatedList);
  //     } else if (editorText === '<p><br></p>' && clickedIndex === 0) {
  //       confirmAlert({
  //         title: 'Are you sure?',
  //         message: 'Clearing the question will wipe out all its options.',
  //         buttons: [], // Leave empty to use custom buttons
  //         childrenElement: () => (
  //           <div className="custom-button-wrapper">
  //             <button className="btn-yes"
  //               onClick={() => {
  //                 closeConfirmWithAnimation(() => {
  //                   setQuestionContent([]); // Reset your state after animation
  //                 });
  //               }}

  //             >
  //               Yes
  //             </button>
  //             <button className="btn-no"
  //               onClick={() => {
  //                 closeConfirmWithAnimation(); // Just close
  //               }}
  //             >
  //               No
  //             </button>
  //           </div>
  //         ),
  //         closeOnClickOutside: true,
  //       });
  //     }
  //   }
  // }, [clickedIndex, editorText, questionContent, className]);

  const updateQuestionContent = useCallback(() => {
    if (!editorText) return;

    const isEmptyParagraph = editorText === '<p><br></p>';

    console.log({ clickedIndex, editorText });

    // Case 1: Add new item
    if (clickedIndex === -1 && !isEmptyParagraph) {
      setQuestionContent(prev => [...prev, { content: editorText, type: className }]);
      return;
    }

    // Case 2: Update existing item
    if (!isEmptyParagraph && clickedIndex !== -1) {
      setQuestionContent(prev =>
        prev.map((item, idx) =>
          idx === clickedIndex ? { ...item, content: editorText } : item
        )
      );
      setClickedIndex(-1);
      return;
    }

    // Case 3: Remove item when it's empty (not first item)
    if (isEmptyParagraph && clickedIndex > 0) {
      setQuestionContent(prev => prev.filter((_, idx) => idx !== clickedIndex));
      return;
    }

    // Case 4: If only one item exists and it's being cleared, just wipe without confirm
    if (isEmptyParagraph && clickedIndex === 0 && questionContent.length === 1) {
      setQuestionContent([]);
      return;
    }

    // Case 5: Ask for confirmation when clearing the first item but multiple options exist
    if (isEmptyParagraph && clickedIndex === 0 && questionContent.length > 1) {
      confirmAlert({
        title: 'Are you sure?',
        message: 'Clearing the question will wipe out all its options.',
        buttons: [],
        childrenElement: () => (
          <div className="custom-button-wrapper">
            <button
              className="btn-yes"
              onClick={() =>
                closeConfirmWithAnimation(() => setQuestionContent([]))
              }
            >
              Yes
            </button>
            <button
              className="btn-no"
              onClick={closeConfirmWithAnimation}
            >
              No
            </button>
          </div>
        ),
        closeOnClickOutside: true,
      });
    }
  }, [clickedIndex, editorText, className, questionContent]);

  
  const handleDownload = () => {
    if (questionContent.length > 0) {
      const fullHtml = questionContent.map(item => item.content).join('<br />');
      const wrappedContent = `<div class="question_printable_text">${fullHtml}</div>`;
      const blob = new Blob([wrappedContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${new Date().toISOString()}-question-content.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("Nothing to download.");
    }
  };

  const handleContentClick = (indexToEdit) => {
    const clickedObj = questionContent[indexToEdit];
    setClickedIndex(indexToEdit);
    setEditorText(clickedObj.content);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h2>Editor with MathJax Support</h2>
      {!questionContent[0]?.content && <button onClick={() => { setClickedIndex(-1); setEditorText(""); setIsModalOpen(true); setClassName("question_text") }} className="demo-button">
        Add Question Content
      </button>
      }
      {questionContent[0]?.content &&
        <button onClick={() => { setClickedIndex(-1); setEditorText(""); setIsModalOpen(true); setClassName("option_text") }} className="demo-button" style={{ marginLeft: "1.5rem" }}>
          Add Options
        </button>
      }
      <button onClick={handleDownload} className="demo-button" style={{ marginLeft: "1.5rem" }}>
        Download File
      </button>
      <button onClick={() => setQuestionContent([])} className="demo-button" style={{ marginLeft: "1.5rem" }} disabled={!questionContent.length}>
        Clear All Content
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} title="Content Editor">
        <JoditEditorWithLatex
          editorText={editorText}
          setEditorText={setEditorText}
        />
      </Modal>

      <div className="question_wrapper" style={{ textAlign: "left", padding: "0.5em", margin: "0.5em", border: "1px solid #ccc", borderRadius: "8px" }}>
        {questionContent.length ?
          questionContent.map((ele, index) => (
            <div
              key={index}
              style={{ cursor: "pointer", border: "2px dashed #eee", borderRadius: "8px" }}
              onClick={() => handleContentClick(index)}
              dangerouslySetInnerHTML={{ __html: ele.content }}
            />
          )) :
          <div style={{ textAlign: "left", padding: "3px" }}>{"Add content to display here"}</div>
        }
      </div>
    </div>
  );
}

export default App;
