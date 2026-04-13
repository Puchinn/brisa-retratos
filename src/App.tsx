import { useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { Gallery } from "./components/Gallery";
import { ImageModal } from "./components/ImageModal";

import { getPageInfo } from "./services/database";
import type { Image } from "./services/database";

import { OrderWizard } from "./components/extracted-order";

import useSWR from "swr";
import { Button } from "./components/ui/button";
type CategoryId = "bocetos" | "obras-en-venta";

export default function App() {
  const { data, isLoading, error } = useSWR("page-info", getPageInfo);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("bocetos");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [open, setOpen] = useState(false);

  // Filter images based on active category

  if (error) return "error";
  if (!data && !isLoading) return "no se pudieron obtener los datos";
  if (isLoading) return "";

  const pageInfo = data;

  // Handle image click to show modal
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="text-3xl text-white font-bold mb-2">
          {pageInfo?.title || " Brisa Sarmiento | Retratista Profesional"}
        </h1>
        <p className="text-gray-400 mb-6">
          {pageInfo?.sub_title || "Una colección de obras artísticas a lápiz."}
        </p>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <Button
          onClick={function () {
            setOpen(true);
          }}
          className="cursor-pointer p-3"
        >
          Hacer una orden
        </Button>
      </header>
      <OrderWizard open={open} onOpenChange={setOpen}></OrderWizard>

      <main className="py-4 px-4 md:px-8">
        <Gallery
          onImageClick={handleImageClick}
          pageInfo={pageInfo}
          activeCategory={activeCategory}
        />
      </main>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <div className="custom-work-section mb-6">
          <h3 className="text-xl mb-3 font-semibold">
            Trabajos personalizados
          </h3>
          <a
            href={`https://wa.me/${
              pageInfo?.phone_number || "+5493572444089"
            }?text=Hola,%20me%20interesa%20un%20trabajo%20personalizado`}
            className="whatsapp-footer-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp mr-2"></i> Contáctame por WhatsApp
          </a>
        </div>
        <p>
          © {new Date().getFullYear()} Dyman Studio. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
