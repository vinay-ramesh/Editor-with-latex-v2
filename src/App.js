import { useCallback, useState } from "react"
import './App.css';
import JoditEditorWithLatex from './components/JoditEditorWithLatex/JoditEditorWithLatex';
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorText, setEditorText] = useState("")
  const [questionContent, setQuestionContent] = useState([])
  const [clickedIndex, setClickedIndex] = useState(-1)
  console.log("questionContent", questionContent)
  
  const handleSave = () => {
    setIsModalOpen(false);
    updateQuestionContent()
    setEditorText("")
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const updateQuestionContent = useCallback(() => {
    if (clickedIndex === -1) {
      // Content is getting added
      setQuestionContent(prevState => [...prevState, { content: editorText, type: "question_text" }])
    } else {
      // Existing Content is getting updated
      const updatedCustomList = questionContent.map((item, index) => {
        if (index === clickedIndex) {
          return {
            ...item,
            content: editorText
          };
        }
        return item;
      });
      setQuestionContent(updatedCustomList)
      setClickedIndex(-1)
    }
  }, [clickedIndex, editorText, questionContent])

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

  const handleContentClick = (clickedIndex) => {
    const clickedObj = questionContent[clickedIndex]
    // console.log({ clickedObj, clickedIndex })
    setClickedIndex(clickedIndex)
    setIsModalOpen(true)
    setEditorText(clickedObj.content)
  }

  return (
    <div className="App">
      <h2>Editor with MathJax Support</h2>
      {!questionContent[0]?.content &&
        <button
          onClick={() => setIsModalOpen(true)}
          className="demo-button"
        >
          Add Question Content
        </button>
      }
      {questionContent[0]?.content &&
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="demo-button"
            style={{ marginLeft: "1.5rem", cursor: "pointer" }}
            disabled={questionContent[0].content ? false : true}
          >
            Add Options
          </button>

          <button
            className="demo-button"
            onClick={() => setQuestionContent([])}
            style={{
              marginLeft: "1.5rem",
              cursor: "pointer"
            }}
            disabled={questionContent[0].content ? false : true}
          >
            Clear entire Question Content
          </button>
        </>
      }
      <button
        onClick={handleDownload}
        className="demo-button"
        style={{
          marginLeft: "1.5rem",
          cursor: "pointer"
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
        <JoditEditorWithLatex editorText={editorText} setEditorText={setEditorText} />
      </Modal>
      <div className="question_wrapper" style={{ border: "1px solid red", padding: "1em", margin: "1em" }}>
        {questionContent.length ?
          questionContent?.map((ele, index) => {
            return (
              <p key={index} style={{ textAlign: "left" }} onClick={() => handleContentClick(index)}>{ele.content}</p>
            )
          }) :
          <div style={{ textAlign: "left", cursor: "pointer" }}>{"Add content to display here"}</div>
        }
      </div>
    </div>
  );
}

export default App;
