import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, TrendingUp, Star } from 'lucide-react';

const COMPETITOR_ADS = [
  {
    id: 1,
    brand: "Domino's Pizza",
    tagline: "Get 50% off your next order!",
    offer: "Use code: PIZZA50",
    color: 'from-blue-700 to-blue-900',
    accent: 'bg-yellow-400 text-blue-900',
    logo: '🍕',
    cta: 'Order Now',
    sponsored: true,
  },
  {
    id: 2,
    brand: 'Pizza Hut',
    tagline: 'Family Feast for $29.99',
    offer: 'Free garlic bread + 2 sides',
    color: 'from-red-700 to-red-900',
    accent: 'bg-white text-red-700',
    logo: '🎩',
    cta: 'Claim Deal',
    sponsored: true,
  },
  {
    id: 3,
    brand: "Papa John's",
    tagline: 'Better Ingredients. Better Pizza.',
    offer: 'Large pizza from $11.99',
    color: 'from-green-700 to-green-900',
    accent: 'bg-red-500 text-white',
    logo: '🍅',
    cta: 'Shop Now',
    sponsored: true,
  },
  {
    id: 4,
    brand: 'Little Caesars',
    tagline: 'HOT-N-READY® Pizzas',
    offer: '$5 pizzas available now!',
    color: 'from-orange-600 to-orange-800',
    accent: 'bg-white text-orange-700',
    logo: '👑',
    cta: 'Find Location',
    sponsored: true,
  },
];

const DISPLAY_ADS = [
  {
    id: 'a1',
    type: 'banner',
    brand: "Domino's",
    headline: '2 for 1 Tuesdays',
    sub: 'Order online. Save big.',
    bg: 'bg-gradient-to-r from-blue-600 to-blue-800',
    badge: 'SPONSORED',
  },
  {
    id: 'a2',
    type: 'banner',
    brand: 'Pizza Hut',
    headline: 'Stuff Crust is Back!',
    sub: 'Limited time offer',
    bg: 'bg-gradient-to-r from-red-600 to-red-800',
    badge: 'AD',
  },
];

export function TopAdBanner() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % COMPETITOR_ADS.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  const ad = COMPETITOR_ADS[current];

  return (
    <div className={`relative bg-gradient-to-r ${ad.color} text-white py-2.5 px-4 text-center transition-all duration-500`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-sm">
        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide">Sponsored</span>
        <span className="font-black">{ad.brand}:</span>
        <span>{ad.tagline}</span>
        <span className={`${ad.accent} text-xs px-2 py-0.5 rounded font-black`}>{ad.offer}</span>
        <button className="underline text-white/80 text-xs hover:text-white flex items-center gap-1">
          {ad.cta} <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function MidPageAd() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 p-6 sm:p-8">
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Sponsored Ad
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🍕
              </div>
              <div>
                <div className="text-xs text-blue-300 font-semibold uppercase tracking-wide mb-0.5">Domino's Pizza — Official</div>
                <h3 className="text-2xl font-black text-white">50% Off All Pizzas!</h3>
                <p className="text-blue-200 text-sm mt-0.5">Limited time. Online orders only. Use code SAVE50</p>
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  <span className="text-blue-300 text-xs ml-1">4.8 · 50K+ orders today</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg">
                Order at Domino's
              </button>
              <span className="text-blue-300 text-xs">Advertiser's site. Opens in new tab.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarAds() {
  return (
    <div className="hidden xl:flex flex-col gap-4 w-64 flex-shrink-0">
      {DISPLAY_ADS.map(ad => (
        <div key={ad.id} className={`${ad.bg} rounded-xl overflow-hidden`}>
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-xs font-bold uppercase">{ad.badge}</span>
              <span className="text-white/60 text-xs">{ad.brand}</span>
            </div>
            <h4 className="text-white font-black text-lg leading-tight">{ad.headline}</h4>
            <p className="text-white/80 text-xs mt-1">{ad.sub}</p>
            <button className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 rounded-lg transition">
              Learn More
            </button>
          </div>
        </div>
      ))}
      <div className="bg-gray-100 rounded-xl p-3 text-center border-2 border-dashed border-gray-300">
        <div className="text-xs text-gray-400 font-bold uppercase mb-1">Google Display Ad</div>
        <div className="h-36 bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs text-center px-2">300×250 Display<br />Ad Space Available<br /><span className="text-blue-500 underline cursor-pointer">Advertise here</span></span>
        </div>
      </div>
    </div>
  );
}

export function FloatingCompetitorAd() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const ad = COMPETITOR_ADS[current];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <div className={`bg-gradient-to-r ${ad.color} rounded-2xl p-4 shadow-2xl border border-white/20`}>
        <div className="flex items-start justify-between mb-2">
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-bold">SPONSORED</span>
          <button onClick={() => setShow(false)} className="text-white/60 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl">{ad.logo}</div>
          <div>
            <div className="text-white font-black">{ad.brand}</div>
            <div className="text-white/80 text-sm">{ad.tagline}</div>
            <div className={`inline-block mt-1 ${ad.accent} text-xs px-2 py-0.5 rounded font-bold`}>{ad.offer}</div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 rounded-lg transition">
            {ad.cta}
          </button>
          <button
            onClick={() => { setCurrent(c => (c + 1) % COMPETITOR_ADS.length); }}
            className="text-white/60 hover:text-white text-xs px-2"
          >
            Next Ad
          </button>
        </div>
      </div>
    </div>
  );
}
