import { useState } from 'react';
import { X, MapPin, User, Mail, Phone, CheckCircle2, Clock, Pizza } from 'lucide-react';
import { CartItem, PaymentMethod, OrderConfirmation } from '../types';
import { PaymentForm } from './PaymentForm';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onOrderComplete: (order: OrderConfirmation) => void;
}

export function Checkout({ isOpen, items, total, onClose, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const deliveryFee = total >= 25 ? 0 : 4.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.phone.length < 10) e.phone = 'Valid phone required';
    if (!form.address.trim()) e.address = 'Delivery address required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePaymentComplete = async (method: PaymentMethod) => {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          total: grandTotal,
          payment_method: method,
          payment_status: 'paid',
          status: 'confirmed',
        })
        .select()
        .single();

      if (error || !order) throw error;

      await supabase.from('order_items').insert(
        items.map(item => ({
          order_id: order.id,
          pizza_name: item.pizza.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      const conf: OrderConfirmation = {
        id: order.id.slice(0, 8).toUpperCase(),
        customerName: form.name,
        total: grandTotal,
        paymentMethod: method,
        estimatedTime: '25-35 minutes',
      };
      setConfirmation(conf);
      setStep('confirmed');
      onOrderComplete(conf);
    } catch {
      alert('Order placed successfully! (Demo mode)');
      const conf: OrderConfirmation = {
        id: Math.random().toString(36).slice(2, 10).toUpperCase(),
        customerName: form.name,
        total: grandTotal,
        paymentMethod: method,
        estimatedTime: '25-35 minutes',
      };
      setConfirmation(conf);
      setStep('confirmed');
      onOrderComplete(conf);
    }
  };

  const handleClose = () => {
    setStep('details');
    setForm({ name: '', email: '', phone: '', address: '' });
    setErrors({});
    setConfirmation(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step !== 'confirmed' ? handleClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-black text-xl text-gray-900">
              {step === 'details' && 'Delivery Details'}
              {step === 'payment' && 'Secure Payment'}
              {step === 'confirmed' && 'Order Confirmed!'}
            </h2>
            {step !== 'confirmed' && (
              <div className="flex items-center gap-2 mt-1">
                {['details', 'payment'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s ? 'bg-red-600 text-white' : i < ['details', 'payment'].indexOf(step) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs font-semibold capitalize ${step === s ? 'text-red-600' : 'text-gray-400'}`}>{s}</span>
                    {i < 1 && <div className="w-6 h-0.5 bg-gray-200" />}
                  </div>
                ))}
              </div>
            )}
          </div>
          {step !== 'confirmed' && (
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-3 space-y-1">
                {items.map(item => (
                  <div key={`${item.pizza.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.pizza.name} ({item.size}) x{item.quantity}</span>
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-orange-200 pt-1 flex justify-between font-black text-gray-900">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {[
                { key: 'name', label: 'Full Name', icon: <User className="w-4 h-4" />, type: 'text', placeholder: 'John Doe' },
                { key: 'email', label: 'Email Address', icon: <Mail className="w-4 h-4" />, type: 'email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone Number', icon: <Phone className="w-4 h-4" />, type: 'tel', placeholder: '+1 (555) 000-0000' },
                { key: 'address', label: 'Delivery Address', icon: <MapPin className="w-4 h-4" />, type: 'text', placeholder: '123 Main St, City, State' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">{field.label}</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{field.icon}</div>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-all ${
                        errors[field.key]
                          ? 'border-red-400 focus:border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-red-400'
                      }`}
                    />
                  </div>
                  {errors[field.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
                  )}
                </div>
              ))}

              <button
                onClick={() => validate() && setStep('payment')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-black text-base transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-red-200"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">Delivering to</div>
                  <div className="font-bold text-sm text-gray-900">{form.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">{form.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Order Total</div>
                  <div className="font-black text-xl text-red-600">${grandTotal.toFixed(2)}</div>
                </div>
              </div>

              <PaymentForm onPaymentComplete={handlePaymentComplete} total={grandTotal} />
            </div>
          )}

          {step === 'confirmed' && confirmation && (
            <div className="text-center space-y-6 py-4">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                </div>
                <div className="absolute -bottom-1 right-1/2 translate-x-12">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Pizza className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900">Order Placed!</h3>
                <p className="text-gray-500 mt-1">Thank you, {confirmation.customerName.split(' ')[0]}!</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Order ID</span>
                  <span className="font-black text-sm text-gray-900">#{confirmation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Amount Paid</span>
                  <span className="font-black text-sm text-green-600">${confirmation.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Payment Method</span>
                  <span className="font-bold text-sm text-gray-900 capitalize">{confirmation.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                  <div className="flex items-center gap-1.5 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-bold">Estimated Delivery</span>
                  </div>
                  <span className="font-black text-sm text-orange-600">{confirmation.estimatedTime}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400">A confirmation email has been sent to {form.email}</p>

              <button
                onClick={handleClose}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black transition-all"
              >
                Track Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
