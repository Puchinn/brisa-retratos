type CategoryId = "bocetos" | "obras-en-venta";

interface CategoryFilterProps {
  activeCategory: CategoryId;
  setActiveCategory: (categoryId: CategoryId) => void;
}

interface Category {
  id: CategoryId;
  label: string;
}

export function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  // Define categories
  const categories: Category[] = [
    { id: "bocetos", label: "Bocetos" },
    { id: "obras-en-venta", label: "Obras en Venta" },
  ];

  return (
    <div className="category-filters">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${
            activeCategory === category.id ? "active" : ""
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
