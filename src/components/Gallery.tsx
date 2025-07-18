import { useEffect, useRef, useState } from "react";
import type { Image, PageInfo } from "../services/database";
import useSWR from "swr";
import { getImages } from "../services/database";

type CategoryId = "bocetos" | "obras-en-venta";

interface GalleryProps {
  onImageClick: (image: Image) => void;
  pageInfo: PageInfo | undefined;
  activeCategory: CategoryId;
}

type LoadedImages = { [key: string]: boolean };

export function Gallery({
  onImageClick,
  pageInfo,
  activeCategory,
}: GalleryProps) {
  const { data, isLoading } = useSWR("images", getImages);
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [visibleCount, setVisibleCount] = useState(10); // muestra 10 de entrada
  const observerRef = useRef<HTMLDivElement | null>(null);

  const activeObrasEnVenta = activeCategory === "obras-en-venta";

  const filteredImages = (() => {
    if (data) {
      return data.filter((image) => {
        if (activeCategory !== "obras-en-venta") return true;
        return image.category === "obras-en-venta";
      });
    }
    return [];
  })();

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
          setVisibleCount((prev) => Math.min(prev + 5, filteredImages.length));
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
  }, [filteredImages.length]);

  return (
    <div className="gallery-container">
      {isLoading ? (
        <>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
          <div className="w-full max-w-[400px] h-full max-h-[500px] bg-gray-200 rounded-xs animate-pulse"></div>
        </>
      ) : (
        filteredImages.slice(0, visibleCount).map((image) => (
          <div
            key={image.id}
            className={`rounded-[2px] overflow-hidden transition-all cursor-pointer max-h-max flex flex-col min-h-[300px] ${
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
        ))
      )}

      {/* Div fantasma para IntersectionObserver */}
      {visibleCount < filteredImages.length && (
        <div
          ref={observerRef}
          style={{ height: "1px" }} // invisible pero observable
        />
      )}
    </div>
  );
}
