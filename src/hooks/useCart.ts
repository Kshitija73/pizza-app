import { useState } from 'react';
import { CartItem, Pizza, SIZE_OPTIONS } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (pizza: Pizza, size: 'small' | 'medium' | 'large' = 'medium') => {
    const price = parseFloat((pizza.basePrice * SIZE_OPTIONS[size].multiplier).toFixed(2));
    setItems(prev => {
      const existing = prev.find(i => i.pizza.id === pizza.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.pizza.id === pizza.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { pizza, size, quantity: 1, price }];
    });
    setIsOpen(true);
  };

  const removeItem = (pizzaId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.pizza.id === pizzaId && i.size === size)));
  };

  const updateQuantity = (pizzaId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(pizzaId, size);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.pizza.id === pizzaId && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, total, itemCount };
}
