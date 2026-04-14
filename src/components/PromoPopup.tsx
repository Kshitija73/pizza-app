import { useState, useEffect } from 'react';
import { X, Clock, Tag } from 'lucide-react';

export function PromoPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const t = setTimeout(() => { if (!dismissed) setShow(true); }, 12000);
    return () => clearTimeout(t);
  }, [dismissed]);

  useEffect(() => {
    if (!show) return;
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [show]);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShow(false); setDismissed(true); }} />
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full">
        <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8 text-center relative">
          <button
            onClick={() => { setShow(false); setDismissed(true); }}
            className="absolute top-4 right-4 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-5xl mb-3">🍕</div>
          <h3 className="text-3xl font-black text-white mb-1">Flash Sale!</h3>
          <p className="text-red-100 text-sm">Limited time offer — expires in</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="bg-white/20 text-white font-black text-2xl px-3 py-1 rounded-xl">{mins}</div>
            <span className="text-white font-black text-xl">:</span>
            <div className="bg-white/20 text-white font-black text-2xl px-3 py-1 rounded-xl">{secs}</div>
          </div>
        </div>

        <div className="p-6 text-center">
          <div className="text-5xl font-black text-red-600 mb-1">30% OFF</div>
          <p className="text-gray-600 text-sm mb-4">On your entire order over $20</p>

          <div className="bg-orange-50 border-2 border-dashed border-orange-300 rounded-xl p-3 mb-4 flex items-center justify-center gap-2">
            <Tag className="w-5 h-5 text-orange-500" />
            <span className="font-black text-orange-700 text-lg tracking-widest">PIZZA30</span>
          </div>

          <p className="text-xs text-gray-400 mb-4 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            Offer valid for the next {mins}:{secs}
          </p>

          <button
            onClick={() => { setShow(false); setDismissed(true); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-red-200"
          >
            Claim Offer & Order Now
          </button>
          <button
            onClick={() => { setShow(false); setDismissed(true); }}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
