import { useState } from 'react';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { Pizza, SIZE_OPTIONS } from '../types';

interface PizzaCardProps {
  pizza: Pizza;
  onAdd: (pizza: Pizza, size: 'small' | 'medium' | 'large') => void;
}

const TAG_COLORS: Record<string, string> = {
  'Bestseller': 'bg-red-100 text-red-700',
  'Most Popular': 'bg-orange-100 text-orange-700',
  'Chef Special': 'bg-amber-100 text-amber-700',
  'New': 'bg-green-100 text-green-700',
  'Spicy': 'bg-red-100 text-red-600',
  'Vegetarian': 'bg-emerald-100 text-emerald-700',
  'Vegan Friendly': 'bg-green-100 text-green-700',
  '100% Veg': 'bg-green-100 text-green-700',
  'Protein Rich': 'bg-blue-100 text-blue-700',
  'Hot & Spicy': 'bg-red-100 text-red-700',
  'Cheese Lover': 'bg-yellow-100 text-yellow-700',
  default: 'bg-gray-100 text-gray-600',
};

export function PizzaCard({ pizza, onAdd }: PizzaCardProps) {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [added, setAdded] = useState(false);

  const price = (pizza.basePrice * SIZE_OPTIONS[size].multiplier).toFixed(2);

  const handleAdd = () => {
    onAdd(pizza, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pizza.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] || TAG_COLORS.default}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{pizza.rating}</span>
          <span className="text-white/70">({pizza.reviews.toLocaleString()})</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{pizza.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{pizza.description}</p>

        <div className="flex gap-1.5 mb-4">
          {(['small', 'medium', 'large'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${
                size === s
                  ? 'border-red-500 bg-red-50 text-red-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {SIZE_OPTIONS[s].label}
              <br />
              <span className="font-normal text-gray-400">{SIZE_OPTIONS[s].inches}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-gray-900">${price}</span>
            {size !== 'small' && (
              <span className="text-xs text-gray-400 ml-1">/ {SIZE_OPTIONS[size].label}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 shadow-md shadow-red-200'
            }`}
          >
            {added ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
