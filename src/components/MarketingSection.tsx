import { Smartphone, Share2, BarChart3, Target, RefreshCw, Globe } from 'lucide-react';

const TRENDS = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Commerce',
    desc: '73% of orders placed via mobile. Our app-optimized checkout converts 3x better.',
    stat: '73%',
    statLabel: 'Mobile Orders',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Social Commerce',
    desc: 'Instagram & TikTok ads driving 40% of new customer acquisition this month.',
    stat: '40%',
    statLabel: 'From Social',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Data Analytics',
    desc: 'Real-time customer segmentation and personalized offers increase AOV by 25%.',
    stat: '+25%',
    statLabel: 'Avg. Order Value',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Retargeting Ads',
    desc: 'Abandoned cart recovery emails recapture 18% of lost revenue automatically.',
    stat: '18%',
    statLabel: 'Recovery Rate',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Loyalty Program',
    desc: 'Repeat customers spend 67% more. Our points system drives weekly ordering habits.',
    stat: '67%',
    statLabel: 'More Spending',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'SEO & Content',
    desc: 'Local SEO drives 55% of organic traffic. We rank #1 for "best pizza near me".',
    stat: '#1',
    statLabel: 'Local SEO Rank',
    color: 'from-teal-500 to-cyan-600',
  },
];

const SEGMENTS = [
  { name: 'Students', pct: 28, color: 'bg-blue-500' },
  { name: 'Families', pct: 35, color: 'bg-red-500' },
  { name: 'Professionals', pct: 22, color: 'bg-orange-500' },
  { name: 'Sports Events', pct: 15, color: 'bg-green-500' },
];

export function MarketingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">E-Advertising Strategy</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2 mb-4">
            How We Reach You
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Data-driven internet marketing across 7 channels. Every ad, email, and post is optimized to deliver value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TRENDS.map(trend => (
            <div key={trend.title} className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${trend.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {trend.icon}
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-black text-gray-900 text-lg">{trend.title}</h3>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className={`text-xl font-black bg-gradient-to-br ${trend.color} bg-clip-text text-transparent`}>{trend.stat}</div>
                  <div className="text-xs text-gray-400">{trend.statLabel}</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{trend.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center bg-gray-50 rounded-3xl p-8 sm:p-12">
          <div>
            <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Market Segmentation</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2 mb-4">
              Targeted Marketing by Customer Segment
            </h3>
            <p className="text-gray-500 mb-6">
              We use behavioral data and purchase patterns to serve hyper-personalized ads through email, social media, and display networks.
            </p>
            <div className="space-y-3">
              {SEGMENTS.map(seg => (
                <div key={seg.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{seg.name}</span>
                    <span className="font-bold text-gray-900">{seg.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${seg.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${seg.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-gray-900 text-lg">Active Ad Campaigns</h4>
            {[
              { type: 'Email Campaign', name: 'Monday Pizza Deal', reach: '12,500', open: '24.3%', status: 'Live', color: 'green' },
              { type: 'Google Ads', name: '"Best Pizza Near Me"', reach: '45,000', open: '3.8% CTR', status: 'Active', color: 'blue' },
              { type: 'Instagram Story', name: 'Pepperoni Inferno Launch', reach: '28,000', open: '6.1% CTR', status: 'Running', color: 'pink' },
              { type: 'Retargeting', name: 'Abandoned Cart Recovery', reach: '3,200', open: '18% Conv.', status: 'Auto', color: 'orange' },
            ].map(camp => (
              <div key={camp.name} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-lg bg-${camp.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <div className={`w-3 h-3 bg-${camp.color}-500 rounded-full`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-400">{camp.type}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-${camp.color}-100 text-${camp.color}-700`}>{camp.status}</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">{camp.name}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-gray-400">Reach</div>
                  <div className="font-black text-xs text-gray-900">{camp.reach}</div>
                  <div className="text-xs text-green-600 font-bold">{camp.open}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
