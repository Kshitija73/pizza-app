import { Pizza, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Shield, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center">
                <Pizza className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">FIAMMA<span className="text-red-500">.</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Artisan wood-fired pizzas crafted with passion. Fresh ingredients, bold flavors, delivered fast.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Menu', 'Deals & Offers', 'Track Order', 'Store Locator', 'Catering', 'Franchise'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-red-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                1-800-FIAMMA (1-800-342-662)
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                support@fiammapizza.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                123 Fiamma Street, Pizza District, NY 10001
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Secure Payments</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Bitcoin'].map(p => (
                <div key={p} className="bg-gray-800 rounded-lg px-2 py-1.5 text-xs text-center font-semibold text-gray-300">
                  {p}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-green-900/30 border border-green-800 rounded-lg px-2 py-1 text-xs text-green-400">
                <Lock className="w-3 h-3" />
                SSL Secured
              </div>
              <div className="flex items-center gap-1 bg-blue-900/30 border border-blue-800 rounded-lg px-2 py-1 text-xs text-blue-400">
                <Shield className="w-3 h-3" />
                PCI DSS
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © 2024 Fiamma Pizza. All rights reserved. | Privacy Policy | Terms of Service | Cookie Policy
          </p>
          <p className="text-xs text-gray-700 text-center">
            Competitor ads displayed on this site are paid advertisements (Google Display Network). Fiamma Pizza is not affiliated with advertised brands.
          </p>
        </div>
      </div>
    </footer>
  );
}
