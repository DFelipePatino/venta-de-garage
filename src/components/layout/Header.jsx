import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import MiniCart from '../cart/MiniCart';

function Header() {
  const { storeConfig } = useStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {storeConfig?.storeName || 'Single Product Store'}
          </Link>
          
          {/* <nav className="flex items-center space-x-6">
            <MiniCart />
          </nav> */}
        </div>
      </div>
    </header>
  );
}

export default Header;