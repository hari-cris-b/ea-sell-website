import { ArrowRight, Bot, Shield, TrendingUp, Zap, BarChart3, Clock, CheckCircle2, Star } from 'lucide-react';
import { products, testimonials } from '../data/mockData';
import { useCart } from '../context/CartContext';
import PricingComparison from '../components/PricingComparison';
import NewsletterSignup from '../components/NewsletterSignup';
import TrustBadges from '../components/TrustBadges';
import AnimatedCounter from '../components/AnimatedCounter';

interface HomePageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { addToCart } = useCart();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
  };

  return (
    <div className="bg-slate-950">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Trading Solutions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Automate Your Trading.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-900">
              Maximize Your Profits.
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional Forex Expert Advisors backed by years of backtesting and real trading results.
            Join thousands of traders who automate their success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 flex items-center justify-center"
            >
              View Expert Advisors
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700"
            >
              Learn More
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: 10000, suffix: '+', label: 'Active Users' },
              { value: 78, suffix: '%', label: 'Avg Win Rate' },
              { value: 24, suffix: '/7', label: 'Auto Trading' },
              { value: 5, suffix: '+ Years', label: 'Backtested' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2500}
                    className="text-3xl md:text-4xl font-bold text-emerald-500"
                  />
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Expert Advisors?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Cutting-edge technology meets proven trading strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-8 h-8 text-emerald-500" />,
                title: 'AI-Driven Decision Making',
                description: 'Advanced machine learning algorithms analyze market conditions and adapt strategies in real-time.'
              },
              {
                icon: <Shield className="w-8 h-8 text-emerald-500" />,
                title: 'Risk Management Tools',
                description: 'Built-in stop-loss, take-profit, and dynamic position sizing to protect your capital.'
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
                title: 'Backtested Performance',
                description: 'Every EA is rigorously tested with 5-10 years of historical data across multiple market conditions.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
                title: 'Multi-Timeframe Analysis',
                description: 'Scan multiple timeframes simultaneously to identify the highest probability trading setups.'
              },
              {
                icon: <Clock className="w-8 h-8 text-emerald-500" />,
                title: '24/7 Automated Trading',
                description: 'Set it and forget it. Your EA trades around the clock, never missing an opportunity.'
              },
              {
                icon: <Zap className="w-8 h-8 text-emerald-500" />,
                title: 'Lightning Fast Execution',
                description: 'Millisecond precision for entries and exits, ensuring optimal trade execution.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-800 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="mb-4 p-3 bg-slate-900 rounded-lg w-fit group-hover:bg-emerald-500/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Expert Advisors</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our most popular and proven trading robots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">{product.description}</p>

                  {product.performanceData && (
                    <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-800 rounded-lg">
                      <div className="text-center">
                        <div className="text-emerald-500 font-bold">{product.performanceData.winRate}%</div>
                        <div className="text-xs text-slate-400">Win Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-emerald-500 font-bold">{product.performanceData.profitFactor}</div>
                        <div className="text-xs text-slate-400">Profit Factor</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-white">${product.price}</span>
                    <span className="text-sm text-slate-400">One-time payment</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700"
            >
              View All Expert Advisors
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Join thousands of satisfied traders worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-bold">
                    {testimonial.customerName.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-semibold">{testimonial.customerName}</div>
                    {testimonial.customerTitle && (
                      <div className="text-sm text-slate-400">{testimonial.customerTitle}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingComparison />

      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-slate-400">
              Get the latest trading insights and EA updates
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges layout="grid" />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your Trading Success?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start your journey to consistent profits with our proven Expert Advisors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/50"
            >
              Browse Expert Advisors
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700"
            >
              Contact Support
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'One-time payment, lifetime access' },
              { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Free updates and improvements' },
              { icon: <CheckCircle2 className="w-6 h-6" />, text: '30-day money-back guarantee' }
            ].map((item, index) => (
              <div key={index} className="flex items-center text-slate-300">
                <div className="text-emerald-500 mr-3">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
