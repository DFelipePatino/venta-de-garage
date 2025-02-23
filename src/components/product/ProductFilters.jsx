import { useStore } from '../../context/StoreContext';

function ProductFilters() {
  const {
    searchTerm,
    setSearchTerm,
    filterPrice,
    setFilterPrice,
    sortBy,
    setSortBy
  } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
           Buscar Productos
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={filterPrice.min}
                onChange={(e) => setFilterPrice({ ...filterPrice, min: Number(e.target.value) })}
                className="input w-28"
                min="0"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filterPrice.max}
                onChange={(e) => setFilterPrice({ ...filterPrice, max: Number(e.target.value) })}
                className="input w-28"
                min="0"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar Por
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
            >
              <option value="featured">Destacado</option>
              <option value="price-asc">Precio: Bajo a Alto</option>
              <option value="price-desc">Precio: Alto a Bajo</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;