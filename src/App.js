import { useCallback, useState } from "react";
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

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

  const updateQuestionContent = useCallback(() => {
    if (editorText) {
      if (clickedIndex === -1) {
        setQuestionContent(prevState => [...prevState, { content: editorText, type: className }]);
      } else if (editorText !== '<p><br></p>') {
        const updatedCustomList = questionContent.map((item, index) => {
          if (index === clickedIndex) {
            return { ...item, content: editorText };
          }
          return item;
        });
        setQuestionContent(updatedCustomList);
        setClickedIndex(-1);
      } else if (editorText === '<p><br></p>') {
        const updatedList = questionContent.filter((ele, index) => index !== clickedIndex)
        setQuestionContent(updatedList);
      }
    }
  }, [clickedIndex, editorText, questionContent, className]);

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
