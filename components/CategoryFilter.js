// This component handles the category filtering functionality

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  // Define categories
  const categories = [
  { id: 'bocetos', label: 'Bocetos' },
  { id: 'obras-venta', label: 'Obras en Venta' }];


  return (
    <div className="category-filters" data-id="qpnux0c30" data-path="components/CategoryFilter.js">
      {categories.map((category) =>
      <button
        key={category.id}
        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
        onClick={() => setActiveCategory(category.id)} data-id="ma89tbpel" data-path="components/CategoryFilter.js">

          {category.label}
        </button>
      )}
    </div>);

};