import { X, Plus, Minus, ShoppingBag, Trash2, Lock } from 'lucide-react';
import { CartItem, SIZE_OPTIONS } from '../types';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQuantity: (id: string, size: string, qty: number) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, items, total, onClose, onUpdateQuantity, onCheckout }: CartProps) {
  const deliveryFee = total >= 25 ? 0 : 4.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h2 className="font-black text-xl text-gray-900">Your Order</h2>
            {items.length > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-orange-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-400 text-sm">Add some delicious pizzas to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.pizza.id}-${item.size}`} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.pizza.image}
                    alt={item.pizza.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.pizza.name}</h4>
                    <span className="text-xs text-gray-500">{SIZE_OPTIONS[item.size].label} ({SIZE_OPTIONS[item.size].inches})</span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                        <button
                          onClick={() => onUpdateQuantity(item.pizza.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.pizza.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-bold' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {deliveryFee > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-xs text-orange-700 text-center font-medium">
                Add ${(25 - total).toFixed(2)} more for FREE delivery!
              </div>
            )}

            <button
              onClick={onCheckout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-black text-base transition-all duration-200 shadow-lg shadow-red-200 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Lock className="w-4 h-4" />
              Secure Checkout — ${grandTotal.toFixed(2)}
            </button>

            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
              <span>Crypto</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
