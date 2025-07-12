const Gallery = ({ images, onImageClick }) => {
  const [loadedImages, setLoadedImages] = React.useState({});
  const [visibleCount, setVisibleCount] = React.useState(10); // muestra 10 de entrada
  const observerRef = React.useRef();

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const createWhatsAppLink = (image) => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en la obra "${
        image.title
      }" con precio ${formatPrice(image.price)}`
    );
    return `https://wa.me/${image.phone}?text=${message}`;
  };

  // Intersection Observer para cargar más
  React.useEffect(() => {
    let allowLoad = false;
    const timeout = setTimeout(() => {
      allowLoad = true;
    }, 1000); // 1 segundo

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && allowLoad) {
          setVisibleCount((prev) => Math.min(prev + 5, images.length));
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [images.length]);

  return (
    <div className="gallery-container">
      {images.slice(0, visibleCount).map((image, idx) => (
        <div
          key={image.id}
          className={`gallery-item ${
            image.category === "obras-venta" ? "for-sale" : ""
          }`}
          onClick={() => onImageClick(image)}
          style={{
            opacity: loadedImages[image.id] ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <img
            src={image.url}
            alt={image.title}
            onLoad={() => handleImageLoad(image.id)}
            loading="lazy"
          />

          <div className="image-details">
            <h3>{image.title}</h3>

            {image.category === "obras-venta" ? (
              <div className="sale-details">
                <p className="price">{formatPrice(image.price)}</p>
                <a
                  href={createWhatsAppLink(image)}
                  className="whatsapp-btn"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Comprar
                </a>
              </div>
            ) : (
              <p>{image.category}</p>
            )}
          </div>
        </div>
      ))}

      {/* Div fantasma para IntersectionObserver */}
      {visibleCount < images.length && (
        <div
          ref={observerRef}
          style={{ height: "1px" }} // invisible pero observable
        />
      )}
    </div>
  );
};
