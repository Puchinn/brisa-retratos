// Main Application Component

const App = () => {
  const [activeCategory, setActiveCategory] = React.useState("bocetos");
  const [filteredImages, setFilteredImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Filter images based on active category
  React.useEffect(() => {
    if (activeCategory === CATEGORIES.BOCETOS) {
      setFilteredImages(imageData);
    }
    if (activeCategory === CATEGORIES.OBRAS_VENTA) {
      setFilteredImages(obras);
    }
  }, [activeCategory]);

  // Handle image click to show modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app-container" data-id="orpc40rnk" data-path="App.js">
      <header className="header" data-id="tb04uea0v" data-path="App.js">
        <h1
          className="text-3xl text-white font-bold mb-2"
          data-id="lbt0pu47i"
          data-path="App.js"
        >
          Brisa Sarmiento | Retratista Profesional
        </h1>
        <p
          className="text-gray-400 mb-6"
          data-id="0sz9zt7f2"
          data-path="App.js"
        >
          Una colección de obras artísticas a lápiz.
        </p>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </header>

      <main
        className="py-4 px-4 md:px-8"
        data-id="04svkbvah"
        data-path="App.js"
      >
        <Gallery images={filteredImages} onImageClick={handleImageClick} />
      </main>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}

      <footer
        className="py-8 text-center text-gray-500 text-sm"
        data-id="dk2u48guq"
        data-path="App.js"
      >
        <div
          className="custom-work-section mb-6"
          data-id="5qdsl5ehy"
          data-path="App.js"
        >
          <h3
            className="text-xl mb-3 font-semibold"
            data-id="m0y8w29do"
            data-path="App.js"
          >
            Trabajos personalizados
          </h3>
          <a
            href="https://wa.me/+5493572444089?text=Hola,%20me%20interesa%20un%20trabajo%20personalizado"
            className="whatsapp-footer-btn"
            target="_blank"
            rel="noopener noreferrer"
            data-id="6k9pa6hwj"
            data-path="App.js"
          >
            <i
              className="fab fa-whatsapp mr-2"
              data-id="fzds07y9k"
              data-path="App.js"
            ></i>{" "}
            Contáctame por WhatsApp
          </a>
        </div>
        <p data-id="zwiu8qstc" data-path="App.js">
          © 2025 Dyman Studio. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById("root"));
