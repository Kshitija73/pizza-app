import { ChevronDown, Star, Clock, Truck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 backdrop-blur-sm text-red-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Now Open — Free Delivery on Orders $25+
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Crafted with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Fire & Passion
            </span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Artisan pizzas baked in wood-fired ovens. Fresh ingredients, bold flavors, delivered to your door in 30 minutes or less.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#menu"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105"
            >
              Order Now
            </a>
            <a
              href="#deals"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-200 backdrop-blur-sm hover:bg-white/10"
            >
              View Deals
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">4.9 Rating</div>
                <div className="text-xs text-gray-400">12,000+ Reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">30 Min</div>
                <div className="text-xs text-gray-400">Avg. Delivery</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Free Delivery</div>
                <div className="text-xs text-gray-400">On orders $25+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#menu"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
