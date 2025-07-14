import { useCallback, useState } from "react";
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [questionContent, setQuestionContent] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);

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
    if (clickedIndex === -1) {
      setQuestionContent(prevState => [...prevState, { content: editorText, type: "question_text" }]);
    } else {
      const updatedCustomList = questionContent.map((item, index) => {
        if (index === clickedIndex) {
          return { ...item, content: editorText };
        }
        return item;
      });
      setQuestionContent(updatedCustomList);
      setClickedIndex(-1);
    }
  }, [clickedIndex, editorText, questionContent]);

  const handleDownload = () => {
    if (questionContent.length > 0) {
      const fullHtml = questionContent.map(item => item.content).join('<hr />');
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
      <button onClick={() => { setClickedIndex(-1); setEditorText(""); setIsModalOpen(true); }} className="demo-button">
        Add Question Content
      </button>
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
              style={{ cursor: "pointer", borderBottom: "1px dashed #eee", padding: "10px" }}
              onClick={() => handleContentClick(index)}
              dangerouslySetInnerHTML={{ __html: ele.content }}
            />
          )) :
          <div style={{ textAlign: "left", padding: "10px" }}>{"Add content to display here"}</div>
        }
      </div>
    </div>
  );
}

export default App;
