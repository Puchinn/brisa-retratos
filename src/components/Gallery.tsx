import { useEffect, useRef, useState } from "react";
import type { Image, PageInfo } from "../services/database";

interface GalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
  pageInfo: PageInfo | undefined;
  activeObrasEnVenta: boolean;
}

type LoadedImages = { [key: string]: boolean };

export function Gallery({
  images,
  onImageClick,
  pageInfo,
  activeObrasEnVenta,
}: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [visibleCount, setVisibleCount] = useState(10); // muestra 10 de entrada
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleImageLoad = (id: Image["id"]) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const formatPrice = (price: Image["price"]) => {
    const casted = Number(price);
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(casted);
  };

  const createWhatsAppLink = (image: Image) => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en la obra "${
        image.title
      }" con precio ${formatPrice(image.price ?? 0)}`
    );
    return `https://wa.me/${
      pageInfo?.phone_number || "+5493572444089"
    }?text=${message}`;
  };

  // Intersection Observer para cargar más
  useEffect(() => {
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
      {images.slice(0, visibleCount).map((image) => (
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
            src={image.public_url}
            alt={image.title}
            onLoad={() => handleImageLoad(image.id)}
            loading="lazy"
          />

          <div className="image-details">
            <h3>{image.title}</h3>

            {image.category === "obras-en-venta" && activeObrasEnVenta ? (
              <div className="sale-details">
                <p className="price">{formatPrice(image.price)}</p>
                <a
                  href={createWhatsAppLink(image)}
                  className="whatsapp-btn"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar
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
}
