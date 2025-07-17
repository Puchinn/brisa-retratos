import { useEffect, type MouseEvent } from "react";
import type { Image } from "../services/database";

interface ImageModalProps {
  image: Image;
  onClose: VoidFunction;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  // Close modal when clicking ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Stop propagation for clicks on the image container
  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!image) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={handleContentClick}>
        <button className="image-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="image-modal-image-container">
          <img
            src={image.public_url}
            alt={image.title}
            className="image-modal-image"
          />
        </div>
        <div className="image-modal-details">
          <h2 data-id="mxa9lt7ge">{image.title}</h2>
          <p className="image-modal-category">{image.category}</p>
        </div>
      </div>
    </div>
  );
}
