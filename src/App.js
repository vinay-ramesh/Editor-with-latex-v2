import { useState } from "react"
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorText, setInitialText] = useState("")
  const [questionContent, setQuestionContent] = useState([{ content: "Lorem ipsum ", type: "" }])

  const handleSave = () => {
    alert('Save clicked!');
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const updateQuestionContent = () => {
    console.log("Hello")
    setInitialText("Hello")
  }

  const handleDownload = () => {
      // if (questionContent) {
      //     const wrappedContent = `<div class="question_printable_text">${questionContent}</div>`;
      //     const blob = new Blob([wrappedContent], { type: 'text/html' });
      //     const url = URL.createObjectURL(blob);
      //     const link = document.createElement('a');
      //     link.href = url;
      //     link.download = `${new Date().toISOString()}-question-content.html`;
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //     URL.revokeObjectURL(url);
      // } else {
      //     alert("Nothing to download.");
      // }
      console.log("Hello")
  };

  return (
    <div className="App">
      <h2>Editor with MathJax Support</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="demo-button"
      >
        Add Question Content
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="demo-button"
        style={{ marginLeft: "1.5rem", cursor: `${questionContent[0].content}` ? "pointer" : "not-allowed" }}
        disabled={questionContent[0].content ? false : true}
      >
        Add Options
      </button>
      <button
        className="demo-button"
        onClick={() => setQuestionContent([{ content: "", type: "" }])}
        style={{ 
          marginLeft: "1.5rem", 
          // cursor: `${questionContent[0].content}` ? "pointer" : "not-allowed" 
        }}
        disabled={questionContent[0].content ? false : true}
      >
        Clear entire Question Content
      </button>
      <button
        onClick={handleDownload}
        className="demo-button"
        style={{ 
          marginLeft: "1.5rem", 
        }}
      >
        Download File
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        title="Example Modal"
      >
        <JoditEditorWithLatex editorText={editorText} updateQuestionContent={updateQuestionContent}/>
      </Modal>
      <div className="question_wrapper" style={{border:"1px solid red", padding:"1em", margin:"1em"}}>
        {questionContent.map((ele) => {
          return (
            <p>{ele.content}</p>
          )
        })}
      </div>
    </div>
  );
}

export default App;
