import * as React from 'react';

const Modal = (props) => {
  const css = `
.modal {
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    transition: 1.1s ease-out;
    box-shadow: -2rem 2rem 2rem rgba(0, 0, 0, 0.2);
    filter: blur(0);
    transform: translate(-50%, -5%);
    visibility: visible;
    position: absolute;
    opacity: 1;
    left: 50%;
    z-index: 100;
}
.modal.off {
    opacity: 0;
    visibility: hidden;
    filter: blur(8px);
    transform: scale(0.33);
    box-shadow: 1rem 0 0 rgba(0, 0, 0, 0.2);
}
@supports (offset-rotation: 0deg) {
    offset-rotation: 0deg;
    offset-path: path("M 250,100 S -300,500 -700,-200");
    .modal.off {
        offset-distance: 100%;
    }
}
@media (prefers-reduced-motion) {
    .modal {
        offset-path: none;
    }
}
.modal h2 {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 0;
}
.modal .content {
    padding: 1rem;
}
.modal .actions {
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 0.5rem 1rem;
}
#centered-toggle-button {
    position: absolute;
}

`;
  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  return props.show ? (
    <div className="modal" id="modal" onClick={onClose}>
      <style suppressHydrationWarning>{css}</style>
      <div className="content">{props.children}</div>
      <div className="actions">
        <button className="toggle-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default Modal;
