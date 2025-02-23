import { useStore } from '../../context/StoreContext';

function InventoryManager() {
  const { storeConfig, setStoreConfig } = useStore();

  const updateProduct = (field, value) => {
    setStoreConfig({
      ...storeConfig,
      product: {
        ...storeConfig.product,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Product Management</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={storeConfig.product.name}
          onChange={(e) => updateProduct('name', e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={storeConfig.product.price}
          onChange={(e) => updateProduct('price', parseFloat(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Inventory</label>
        <input
          type="number"
          value={storeConfig.product.inventory}
          onChange={(e) => updateProduct('inventory', parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={storeConfig.product.description}
          onChange={(e) => updateProduct('description', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-32"
        />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Save Changes
      </button>
    </div>
  );
}

export default InventoryManager;