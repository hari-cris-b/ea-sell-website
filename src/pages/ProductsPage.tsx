import { Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

interface ProductsPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === 'low') matchesPrice = product.price < 200;
    else if (priceFilter === 'mid') matchesPrice = product.price >= 200 && product.price < 280;
    else if (priceFilter === 'high') matchesPrice = product.price >= 280;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Expert Advisors</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Professional Forex trading robots designed for consistent profits
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Expert Advisors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $200</option>
              <option value="mid">$200 - $280</option>
              <option value="high">$280+</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
                  {product.isFeatured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  )}
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

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-white">${product.price}</span>
                    <span className="text-sm text-slate-400">One-time</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-900 transition-all shadow-lg shadow-emerald-600/30"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
