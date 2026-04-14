import { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle2, AlertTriangle, Wifi, Bug, FireExtinguisher, Eye, Server } from 'lucide-react';

const SECURITY_EVENTS = [
  { type: 'blocked', msg: 'SQL injection attempt blocked from 192.168.x.x', time: '2s ago', level: 'warning' },
  { type: 'scan', msg: 'Malware scan completed — 0 threats found', time: '1m ago', level: 'success' },
  { type: 'ssl', msg: 'SSL certificate renewed — valid for 365 days', time: '5m ago', level: 'success' },
  { type: 'login', msg: 'Suspicious login attempt blocked — 2FA triggered', time: '12m ago', level: 'warning' },
  { type: 'firewall', msg: 'Firewall rule updated — 1,247 threats blocked today', time: '30m ago', level: 'success' },
  { type: 'scan', msg: 'DDoS mitigation active — traffic normalized', time: '1h ago', level: 'success' },
];

const SECURITY_BADGES = [
  { icon: <Lock className="w-5 h-5" />, label: 'SSL Encrypted', sub: '256-bit TLS 1.3', color: 'text-green-600 bg-green-50 border-green-200' },
  { icon: <Shield className="w-5 h-5" />, label: 'PCI DSS Level 1', sub: 'Payment Security', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { icon: <CheckCircle2 className="w-5 h-5" />, label: 'Norton Secured', sub: 'Identity Protected', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  { icon: <Eye className="w-5 h-5" />, label: '3D Secure', sub: 'Verified by Visa', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { icon: <Server className="w-5 h-5" />, label: 'Firewall Active', sub: 'Intrusion Detection', color: 'text-red-600 bg-red-50 border-red-200' },
  { icon: <Bug className="w-5 h-5" />, label: 'Virus Protected', sub: 'Real-time Scanning', color: 'text-purple-600 bg-purple-50 border-purple-200' },
];

export function SecuritySection() {
  const [events, setEvents] = useState(SECURITY_EVENTS.slice(0, 3));
  const [threatCount, setThreatCount] = useState(1247);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setThreatCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setEvents(prev => [
        { type: 'scan', msg: 'Manual security scan completed — system clean', time: 'Just now', level: 'success' },
        ...prev.slice(0, 2),
      ]);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Security Dashboard
          </div>
          <h2 className="text-4xl font-black text-white mb-3">Your Security is Our Priority</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Enterprise-grade security protecting every transaction. Shop with complete confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {SECURITY_BADGES.map(badge => (
            <div key={badge.label} className={`${badge.color} border rounded-xl p-3 text-center`}>
              <div className={`flex justify-center mb-1.5 ${badge.color.split(' ')[0]}`}>{badge.icon}</div>
              <div className="text-xs font-black leading-tight">{badge.label}</div>
              <div className="text-xs opacity-60 mt-0.5">{badge.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <FireExtinguisher className="w-4 h-4 text-red-400" />
                </div>
                <span className="font-bold text-white">Firewall & Intrusion Monitor</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Active
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-red-400">{threatCount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-0.5">Threats Blocked</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-green-400">99.9%</div>
                <div className="text-xs text-gray-500 mt-0.5">Uptime</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-blue-400">0</div>
                <div className="text-xs text-gray-500 mt-0.5">Breaches</div>
              </div>
            </div>

            <div className="space-y-2">
              {events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-800 rounded-lg p-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    ev.level === 'warning' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                  }`}>
                    {ev.level === 'warning'
                      ? <AlertTriangle className="w-3 h-3 text-yellow-400" />
                      : <CheckCircle2 className="w-3 h-3 text-green-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-xs leading-snug">{ev.msg}</p>
                    <span className="text-gray-600 text-xs">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runScan}
              disabled={scanning}
              className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-700"
            >
              {scanning ? (
                <><div className="w-4 h-4 border-2 border-gray-600 border-t-green-400 rounded-full animate-spin" />Scanning...</>
              ) : (
                <><Bug className="w-4 h-4" />Run Security Scan</>
              )}
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-bold text-white">Payment Security Layers</span>
            </div>

            <div className="space-y-3">
              {[
                { layer: 'Layer 1', name: 'SSL/TLS Encryption', desc: 'All data encrypted in transit with 256-bit SSL', status: 'active', color: 'green' },
                { layer: 'Layer 2', name: 'Firewall Protection', desc: 'Web Application Firewall blocks malicious requests', status: 'active', color: 'green' },
                { layer: 'Layer 3', name: 'Virus Scanning', desc: 'Real-time malware detection on all uploads', status: 'active', color: 'green' },
                { layer: 'Layer 4', name: 'Fraud Detection', desc: 'AI-powered transaction monitoring 24/7', status: 'active', color: 'green' },
                { layer: 'Layer 5', name: '3D Secure / 2FA', desc: 'Two-factor authentication for card payments', status: 'active', color: 'green' },
                { layer: 'Layer 6', name: 'Data Tokenization', desc: 'Card data replaced with secure tokens (never stored)', status: 'active', color: 'green' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-gray-400">{item.layer}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-gray-500 text-xs truncate">{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold">ON</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
