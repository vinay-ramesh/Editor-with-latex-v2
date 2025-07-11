import "./Modal.css"

const Modal = ({ isOpen, onClose, onSave, title = "Modal Title", children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="modal-container">
        <div className="modal-content">
          {/* <h2 className="modal-title">{title}</h2> */}
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-buttons">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              onClick={onSave}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal