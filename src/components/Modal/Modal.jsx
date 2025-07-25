import "./Modal.css"

const Modal = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={title === "Editor Info" ? handleBackdropClick : null}
    >
      <div className="modal-container">
        <div className="modal-content">
          {title === 'Editor Info' && <h2 className="modal-title">{title}</h2>}
          <div className="modal-body">
            {children}
          </div>
          {title !== 'Editor Info' ? (
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
          ) : (
            <div className="modal-buttons">
              <button
                onClick={onClose}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal