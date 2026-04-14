import { useState } from 'react';
import { Mail, CheckCircle2, Gift, Percent, Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      await supabase.from('email_subscribers').insert({ email });
      setStatus('success');
    } catch {
      setStatus('success');
    }
  };

  const PERKS = [
    { icon: <Percent className="w-4 h-4" />, label: '20% off first order' },
    { icon: <Gift className="w-4 h-4" />, label: 'Exclusive weekly deals' },
    { icon: <Bell className="w-4 h-4" />, label: 'New menu alerts' },
  ];

  return (
    <section id="deals" className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-orange-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-10 text-8xl">🍕</div>
        <div className="absolute bottom-8 right-10 text-8xl">🔥</div>
        <div className="absolute top-1/2 left-1/3 text-6xl">🧀</div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6">
          <Mail className="w-4 h-4" />
          Email Marketing — Join 50,000+ pizza lovers
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Get 20% Off Your First Order
        </h2>
        <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter for exclusive deals, early access to new menu items, and weekly pizza promotions.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {PERKS.map(perk => (
            <div key={perk.label} className="flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {perk.icon}
              {perk.label}
            </div>
          ))}
        </div>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl max-w-md mx-auto">
            <CheckCircle2 className="w-6 h-6 text-green-300" />
            <div className="text-left">
              <div className="font-black">You're subscribed!</div>
              <div className="text-red-200 text-sm">Check your inbox for your 20% off code.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-6 py-3.5 rounded-xl transition-all hover:scale-105 disabled:opacity-70 flex items-center gap-2 justify-center whitespace-nowrap"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Subscribe & Save
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-red-200 text-xs mt-4">
          No spam, ever. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.
        </p>
      </div>
    </section>
  );
}
