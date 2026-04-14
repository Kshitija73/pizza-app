import { useState } from 'react';
import { useCart } from './hooks/useCart';
import { OrderConfirmation } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { SecuritySection } from './components/SecuritySection';
import { EmailCapture } from './components/EmailCapture';
import { MarketingSection } from './components/MarketingSection';
import { Footer } from './components/Footer';
import { PromoPopup } from './components/PromoPopup';
import { TopAdBanner, MidPageAd, SidebarAds, FloatingCompetitorAd } from './components/AdBanners';

function App() {
  const cart = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleOrderComplete = (_order: OrderConfirmation) => {
    cart.clearCart();
    cart.setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopAdBanner />
      <Header itemCount={cart.itemCount} onCartOpen={() => cart.setIsOpen(true)} />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12" id="about">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: '50K+', label: 'Happy Customers', color: 'text-red-600' },
            { val: '30 Min', label: 'Avg Delivery', color: 'text-orange-500' },
            { val: '4.9★', label: 'Average Rating', color: 'text-yellow-500' },
            { val: '100%', label: 'Fresh Daily', color: 'text-green-500' },
          ].map(stat => (
            <div key={stat.label} className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100">
              <div className={`text-3xl font-black ${stat.color}`}>{stat.val}</div>
              <div className="text-gray-500 text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <MidPageAd />

      <div className="flex gap-6 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex-1 min-w-0">
          <Menu onAdd={cart.addItem} />
        </div>
        <div className="py-20">
          <SidebarAds />
        </div>
      </div>

      <MarketingSection />
      <EmailCapture />
      <SecuritySection />

      <section className="py-16 bg-orange-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">What Our Customers Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', review: 'Best pizza I\'ve ever had! The Pepperoni Inferno is absolutely incredible. Fast delivery and the payment process was super smooth.', rating: 5, pizza: 'Pepperoni Inferno' },
              { name: 'James K.', review: 'Ordered via Apple Pay — took 10 seconds to checkout. Pizza arrived in 28 minutes and was still hot. Will definitely reorder!', rating: 5, pizza: 'BBQ Smokehouse' },
              { name: 'Priya L.', review: 'Love the Veggie Supreme! As a vegetarian, it\'s hard to find good pizza. Fiamma nails it. The website is so easy to use too.', rating: 5, pizza: 'Veggie Supreme' },
            ].map(review => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-400">Verified Customer</div>
                  </div>
                  <div className="text-xs bg-red-50 text-red-600 font-semibold px-2 py-1 rounded-lg">{review.pizza}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <Cart
        isOpen={cart.isOpen}
        items={cart.items}
        total={cart.total}
        onClose={() => cart.setIsOpen(false)}
        onUpdateQuantity={cart.updateQuantity}
        onCheckout={() => { cart.setIsOpen(false); setCheckoutOpen(true); }}
      />

      <Checkout
        isOpen={checkoutOpen}
        items={cart.items}
        total={cart.total}
        onClose={() => setCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      <PromoPopup />
      <FloatingCompetitorAd />
    </div>
  );
}

export default App;
