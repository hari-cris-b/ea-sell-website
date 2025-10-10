import { useState } from 'react';
import { Filter, SortAsc, SortDesc, X } from 'lucide-react';

export interface FilterOptions {
  priceRange: [number, number];
  winRate: number;
  categories: string[];
  sortBy: 'name' | 'price' | 'rating' | 'winRate';
  sortOrder: 'asc' | 'desc';
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

const categories = [
  'Scalping',
  'Trend Following',
  'Breakout',
  'Grid/Hedging',
  'Swing Trading',
  'AI-Powered'
];

export default function ProductFilters({
  filters,
  onFiltersChange,
  className = ""
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 1000],
      winRate: 0,
      categories: [],
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = filters.categories.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.winRate > 0 ? 1 : 0);

  return (
    <div className={`bg-slate-900 rounded-xl border border-slate-800 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-white">Filters & Sort</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <SortDesc className="w-5 h-5" /> : <SortAsc className="w-5 h-5" />}
        </button>
      </div>

      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Sort By</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'name', label: 'Name' },
              { value: 'price', label: 'Price' },
              { value: 'rating', label: 'Rating' },
              { value: 'winRate', label: 'Win Rate' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilters({ sortBy: option.value as FilterOptions['sortBy'] })}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.sortBy === option.value
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => updateFilters({ sortOrder: 'asc' })}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-xs transition-colors ${
                filters.sortOrder === 'asc'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <SortAsc className="w-3 h-3" />
              <span>Asc</span>
            </button>
            <button
              onClick={() => updateFilters({ sortOrder: 'desc' })}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-xs transition-colors ${
                filters.sortOrder === 'desc'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <SortDesc className="w-3 h-3" />
              <span>Desc</span>
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilters({
                priceRange: [parseInt(e.target.value), filters.priceRange[1]]
              })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters({
                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
              })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Win Rate Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Minimum Win Rate: {filters.winRate}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.winRate}
            onChange={(e) => updateFilters({ winRate: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.categories.includes(category)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
