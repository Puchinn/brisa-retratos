// This component displays a full-screen image with description

const ImageModal = ({ image, onClose }) => {
  // Close modal when clicking ESC
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Stop propagation for clicks on the image container
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!image) return null;

  return (
    <div
      className="image-modal-overlay"
      onClick={onClose} data-id="uwl77zsxo" data-path="components/ImageModal.js">

      <div className="image-modal-content" onClick={handleContentClick} data-id="hysc9klx1" data-path="components/ImageModal.js">
        <button className="image-modal-close" onClick={onClose} data-id="whvlw9lqj" data-path="components/ImageModal.js">
          &times;
        </button>
        <div className="image-modal-image-container" data-id="nfryf5kdv" data-path="components/ImageModal.js">
          <img
            src={image.url}
            alt={image.title}
            className="image-modal-image" data-id="5si11x11w" data-path="components/ImageModal.js" />

        </div>
        <div className="image-modal-details" data-id="uqmo9bajz" data-path="components/ImageModal.js">
          <h2 data-id="mxa9lt7ge" data-path="components/ImageModal.js">{image.title}</h2>
          <p className="image-modal-category" data-id="81p2iaamx" data-path="components/ImageModal.js">{image.category}</p>
          <p className="image-modal-description" data-id="u0t2pj25u" data-path="components/ImageModal.js">{image.description}</p>
        </div>
      </div>
    </div>);

};