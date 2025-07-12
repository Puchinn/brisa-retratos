// This component renders the Pinterest-style gallery

const Gallery = ({ images, onImageClick }) => {
  // Image loading state tracking
  const [loadedImages, setLoadedImages] = React.useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  // Create WhatsApp link with message
  const createWhatsAppLink = (image) => {
    const message = encodeURIComponent(`¡Hola! Estoy interesado en la obra "${image.title}" con precio ${formatPrice(image.price)}`);
    return `https://wa.me/${image.phone}?text=${message}`;
  };

  return (
    <div className="gallery-container" data-id="krp49o776" data-path="components/Gallery.js">
      {images.map((image) =>
        <div
          key={image.id}
          className={`gallery-item ${image.category === 'obras-venta' ? 'for-sale' : ''}`}
          onClick={() => onImageClick(image)}
          style={{ opacity: loadedImages[image.id] ? 1 : 0, transition: 'opacity 0.5s ease' }}
          data-id="q60awjo7m"
          data-path="components/Gallery.js">

          {/* No exclusive badge */}

          <img
            src={image.url}
            alt={image.title}
            onLoad={() => handleImageLoad(image.id)}
            loading="lazy"
            data-id="e5nifna1e"
            data-path="components/Gallery.js" />

          <div className="image-details" data-id="074x7g2io" data-path="components/Gallery.js">
            <h3 data-id="zz0joic3w" data-path="components/Gallery.js">{image.title}</h3>

            {image.category === 'obras-venta' ?
              <div className="sale-details" data-id="y0lbnv7rk" data-path="components/Gallery.js">
                <p className="price" data-id="ra2pdly2i" data-path="components/Gallery.js">{formatPrice(image.price)}</p>
                <a
                  href={createWhatsAppLink(image)}
                  className="whatsapp-btn"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer" data-id="3w4i24cba" data-path="components/Gallery.js">
                  <i className="fab fa-whatsapp" data-id="u4yoqbuwj" data-path="components/Gallery.js"></i> Comprar
                </a>
              </div> :

              <p data-id="4t5yhr9bs" data-path="components/Gallery.js">{image.category}</p>
            }
          </div>
        </div>
      )}
    </div>);

};