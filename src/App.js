import { useState } from "react"
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        title="Example Modal"
      >
        <JoditEditorWithLatex />
      </Modal>
    </div>
  );
}

export default App;
