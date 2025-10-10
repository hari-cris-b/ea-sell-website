import { ArrowLeft, CheckCircle2, Download, BarChart3, Shield, Zap } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, slug?: string) => void;
}

export default function ProductDetailPage({ slug, onNavigate }: ProductDetailPageProps) {
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center text-slate-400 hover:text-emerald-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="rounded-xl overflow-hidden mb-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {product.performanceData && (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-6 h-6 text-emerald-500 mr-2" />
                  <h3 className="text-xl font-bold text-white">Performance Metrics</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      {product.performanceData.winRate}%
                    </div>
                    <div className="text-sm text-slate-400">Win Rate</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      {product.performanceData.profitFactor}
                    </div>
                    <div className="text-sm text-slate-400">Profit Factor</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      {product.performanceData.totalTrades.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">Total Trades</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                      {product.performanceData.maxDrawdown}%
                    </div>
                    <div className="text-sm text-slate-400">Max Drawdown</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            {product.isFeatured && (
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full mb-4">
                Featured Product
              </span>
            )}

            <h1 className="text-5xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-xl text-slate-400 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-white">${product.price}</span>
                <span className="text-slate-400">one-time payment</span>
              </div>
              <p className="text-sm text-slate-500">Lifetime access, free updates included</p>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-900 transition-all shadow-lg shadow-emerald-600/50"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  onNavigate('checkout');
                }}
                className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 mb-8 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
              <ul className="space-y-3">
                {[
                  'Complete Expert Advisor files',
                  'Installation guide and documentation',
                  'Optimized settings for multiple pairs',
                  'Free lifetime updates',
                  'Email support',
                  '30-day money-back guarantee'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-6">About This Expert Advisor</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {product.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Risk Management</h4>
                  <p className="text-sm text-slate-400">Built-in protection for your capital</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Fast Execution</h4>
                  <p className="text-sm text-slate-400">Millisecond precision trading</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <Download className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Easy Setup</h4>
                  <p className="text-sm text-slate-400">Quick installation in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: 'Is this compatible with MT4/MT5?',
                a: 'Yes, this Expert Advisor works seamlessly with both MetaTrader 4 and MetaTrader 5 platforms.'
              },
              {
                q: 'Do I need any special skills to use this?',
                a: 'No programming knowledge required. Simply follow our installation guide and you\'re ready to trade.'
              },
              {
                q: 'What is your refund policy?',
                a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the EA\'s performance, contact us for a full refund.'
              },
              {
                q: 'Will I receive updates?',
                a: 'Yes, all updates and improvements are free for lifetime. You\'ll be notified via email when new versions are available.'
              }
            ].map((faq, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
