import { ShoppingCart, Menu, X, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Expert Advisors' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-lg bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <TrendingUp className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-xl font-bold text-white">OPTIVEXY INTELLIGENCE</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-emerald-500'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('account')}
                className={`text-slate-300 hover:text-emerald-400 transition-colors ${
                  currentPage === 'account' ? 'text-emerald-400' : ''
                }`}
              >
                Account
              </button>
            )}

            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-300 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-300 hover:text-white transition-colors mr-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-4 space-y-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-emerald-400 transition-colors ${
                  currentPage === item.id
                    ? 'text-emerald-500 bg-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={() => {
                  onNavigate('account');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-emerald-400 transition-colors ${
                  currentPage === 'account' ? 'text-emerald-400 bg-slate-700' : ''
                }`}
              >
                Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}