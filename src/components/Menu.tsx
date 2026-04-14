import { useState } from 'react';
import { Pizza } from '../types';
import { PizzaCard } from './PizzaCard';
import { pizzas } from '../data/pizzas';

interface MenuProps {
  onAdd: (pizza: Pizza, size: 'small' | 'medium' | 'large') => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Pizzas' },
  { id: 'classic', label: 'Classic' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'veg', label: 'Vegetarian' },
];

export function Menu({ onAdd }: MenuProps) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? pizzas : pizzas.filter(p => p.category === active);

  return (
    <section id="menu" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Our Menu</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2 mb-4">
            Handcrafted Pizzas
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Every pizza is made fresh to order with premium ingredients and baked to perfection.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                active === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}
