import { useState } from 'react';
import InventoryManager from './InventoryManager';
import Analytics from './Analytics';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div>
      <div className="border-b mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-4 ${
              activeTab === 'inventory' ? 'border-b-2 border-blue-500' : ''
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-4 ${
              activeTab === 'analytics' ? 'border-b-2 border-blue-500' : ''
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {activeTab === 'inventory' ? <InventoryManager /> : <Analytics />}
    </div>
  );
}

export default Dashboard;
