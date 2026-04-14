import { useState, useEffect } from 'react';
import { ShoppingCart, Pizza, Phone, Shield, Menu, X } from 'lucide-react';

interface HeaderProps {
  itemCount: number;
  onCartOpen: () => void;
}

export function Header({ itemCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center">
              <Pizza className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={`text-xl font-black tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                FIAMMA
              </span>
              <span className="text-red-500 font-black text-xl">.</span>
              <span className={`text-xs font-semibold ml-1 ${scrolled ? 'text-gray-500' : 'text-red-200'}`}>PIZZA</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Menu', 'Deals', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-semibold transition-colors ${scrolled ? 'text-gray-700 hover:text-red-600' : 'text-white/90 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-1.5 text-xs font-medium ${scrolled ? 'text-green-600' : 'text-green-300'}`}>
              <Shield className="w-3.5 h-3.5" />
              <span>SSL Secured</span>
            </div>
            <a href="tel:+18005559999" className={`hidden md:flex items-center gap-1.5 text-sm font-semibold ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              <Phone className="w-4 h-4" />
              1-800-FIAMMA
            </a>
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-black rounded-full flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className={`md:hidden ${scrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
            {['Menu', 'Deals', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-700 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
