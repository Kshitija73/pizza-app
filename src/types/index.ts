export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'classic' | 'specialty' | 'veg';
  basePrice: number;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface CartItem {
  pizza: Pizza;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  price: number;
}

export interface Order {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
}

export interface OrderConfirmation {
  id: string;
  customerName: string;
  total: number;
  paymentMethod: string;
  estimatedTime: string;
}

export type PaymentMethod = 'credit_card' | 'debit_card' | 'mobile_pay' | 'digital_wallet' | 'crypto';

export interface SizeOption {
  label: string;
  multiplier: number;
  inches: string;
}

export const SIZE_OPTIONS: Record<string, SizeOption> = {
  small: { label: 'Small', multiplier: 1, inches: '8"' },
  medium: { label: 'Medium', multiplier: 1.4, inches: '12"' },
  large: { label: 'Large', multiplier: 1.8, inches: '16"' },
};
