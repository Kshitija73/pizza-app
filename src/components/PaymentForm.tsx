import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Bitcoin, CheckCircle2, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentFormProps {
  onPaymentComplete: (method: PaymentMethod) => void;
  total: number;
}

const PAYMENT_TABS: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'credit_card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" />, desc: 'Visa, Mastercard, Amex' },
  { id: 'debit_card', label: 'Debit Card', icon: <CreditCard className="w-4 h-4" />, desc: 'Direct bank debit' },
  { id: 'mobile_pay', label: 'Mobile Pay', icon: <Smartphone className="w-4 h-4" />, desc: 'Apple Pay, Google Pay' },
  { id: 'digital_wallet', label: 'E-Wallet', icon: <Wallet className="w-4 h-4" />, desc: 'PayPal, Stripe' },
  { id: 'crypto', label: 'Crypto', icon: <Bitcoin className="w-4 h-4" />, desc: 'BTC, ETH, USDT' },
];

export function PaymentForm({ onPaymentComplete, total }: PaymentFormProps) {
  const [method, setMethod] = useState<PaymentMethod>('credit_card');
  const [processing, setProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [step, setStep] = useState<'payment' | '3ds'>('payment');
  const [otp, setOtp] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2, 4);
    return clean;
  };

  const handlePay = async () => {
    if ((method === 'credit_card' || method === 'debit_card') && step === 'payment') {
      setStep('3ds');
      return;
    }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    onPaymentComplete(method);
  };

  const handle3DS = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    setProcessing(false);
    onPaymentComplete(method);
  };

  if (step === '3ds') {
    return (
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-900">3D Secure Authentication</span>
          </div>
          <p className="text-sm text-blue-700">Your bank requires additional verification. Enter the OTP sent to your registered mobile.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Amount to authorize</div>
          <div className="text-2xl font-black text-gray-900">${total.toFixed(2)}</div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Enter OTP (use: 1234)</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="6-digit OTP"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-2xl font-black tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>
        <button
          onClick={handle3DS}
          disabled={otp.length < 4 || processing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying...</>
          ) : (
            <><CheckCircle2 className="w-5 h-5" />Verify & Pay ${total.toFixed(2)}</>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PAYMENT_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setMethod(tab.id)}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              method === tab.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`flex items-center gap-1.5 mb-0.5 ${method === tab.id ? 'text-red-600' : 'text-gray-600'}`}>
              {tab.icon}
              <span className="font-bold text-xs">{tab.label}</span>
            </div>
            <div className="text-xs text-gray-400">{tab.desc}</div>
          </button>
        ))}
      </div>

      {(method === 'credit_card' || method === 'debit_card') && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={card.number}
                onChange={e => setCard({ ...card, number: formatCard(e.target.value) })}
                placeholder="4242 4242 4242 4242"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:border-red-400 outline-none pr-16 transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <div className="w-6 h-4 bg-blue-600 rounded-sm opacity-80" />
                <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={card.name}
              onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })}
              placeholder="JOHN DOE"
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm uppercase font-semibold focus:border-red-400 outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Expiry Date</label>
              <input
                type="text"
                value={card.expiry}
                onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-red-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">CVV</label>
              <div className="relative">
                <input
                  type={showCvv ? 'text' : 'password'}
                  value={card.cvv}
                  onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  placeholder="•••"
                  maxLength={4}
                  className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-red-400 outline-none pr-8 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-lg p-2">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL encryption • PCI DSS Compliant • 3D Secure enabled</span>
          </div>
        </div>
      )}

      {method === 'mobile_pay' && (
        <div className="p-6 bg-gray-50 rounded-xl text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center">
            <div className="grid grid-cols-5 gap-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-900">Scan QR Code</p>
            <p className="text-sm text-gray-500 mt-1">Open Apple Pay or Google Pay and scan to pay</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button className="bg-black text-white text-xs px-4 py-2 rounded-lg font-bold">Apple Pay</button>
            <button className="bg-white border-2 border-gray-200 text-xs px-4 py-2 rounded-lg font-bold">Google Pay</button>
          </div>
        </div>
      )}

      {method === 'digital_wallet' && (
        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'PayPal', color: 'bg-blue-600', text: 'text-white' },
              { name: 'Stripe', color: 'bg-indigo-600', text: 'text-white' },
              { name: 'Venmo', color: 'bg-teal-500', text: 'text-white' },
              { name: 'Cash App', color: 'bg-green-500', text: 'text-white' },
            ].map(w => (
              <button key={w.name} className={`${w.color} ${w.text} py-3 rounded-xl font-bold text-sm hover:opacity-90 transition`}>
                {w.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {method === 'crypto' && (
        <div className="p-4 bg-gray-50 rounded-xl space-y-3">
          <p className="text-sm font-bold text-gray-700">Select Cryptocurrency</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { symbol: 'BTC', name: 'Bitcoin', color: 'text-orange-500' },
              { symbol: 'ETH', name: 'Ethereum', color: 'text-blue-500' },
              { symbol: 'USDT', name: 'Tether', color: 'text-green-500' },
              { symbol: 'BNB', name: 'Binance', color: 'text-yellow-500' },
              { symbol: 'SOL', name: 'Solana', color: 'text-purple-500' },
              { symbol: 'ADA', name: 'Cardano', color: 'text-blue-400' },
            ].map(c => (
              <button key={c.symbol} className="border-2 border-gray-200 rounded-xl p-2 text-center hover:border-gray-300 transition bg-white">
                <div className={`font-black text-sm ${c.color}`}>{c.symbol}</div>
                <div className="text-xs text-gray-400">{c.name}</div>
              </button>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-700">
            Digital tokens provide anonymity and low transaction fees. Payment confirmed after 1 block confirmation.
          </div>
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-4 rounded-xl font-black text-lg transition-all duration-200 shadow-lg shadow-red-200 flex items-center justify-center gap-2 hover:scale-[1.02]"
      >
        {processing ? (
          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
        ) : (
          <><Lock className="w-5 h-5" />Pay ${total.toFixed(2)} Securely</>
        )}
      </button>
    </div>
  );
}
