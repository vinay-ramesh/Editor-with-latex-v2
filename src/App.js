import { useState } from "react"
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intialText, setInitialText] = useState("")
  const [questionContent, setQuestionContent] = useState([{ content: "", type: "" }])

  const handleSave = () => {
    alert('Save clicked!');
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        title="Example Modal"
      >
        <JoditEditorWithLatex intialText={intialText} />
      </Modal>
      <div className="question_wrapper">
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
