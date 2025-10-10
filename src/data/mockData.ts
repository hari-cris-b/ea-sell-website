import { Product, Testimonial, Review } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'AI Scalper Pro',
    slug: 'ai-scalper-pro',
    description: 'Advanced AI-powered scalping EA with millisecond precision and adaptive algorithms.',
    fullDescription: 'AI Scalper Pro uses cutting-edge machine learning algorithms to identify micro-movements in the forex market. With a proven track record of 78% win rate over 5 years of backtesting, this EA is designed for traders who want consistent, automated profits. Features include dynamic lot sizing, multi-timeframe analysis, and advanced risk management.',
    price: 299.00,
    imageUrl: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    features: [
      'AI-Driven Decision Making',
      '78% Win Rate',
      'Multi-Timeframe Analysis',
      'Dynamic Risk Management',
      'MT4/MT5 Compatible',
      '24/7 Automated Trading',
      'One-Time Payment',
      'Free Updates'
    ],
    performanceData: {
      winRate: 78,
      totalTrades: 2453,
      profitFactor: 2.34,
      maxDrawdown: 12.5
    },
    isFeatured: true,
    stockStatus: 'available'
  },
  {
    id: '2',
    name: 'Trend Master Elite',
    slug: 'trend-master-elite',
    description: 'Follow major trends with precision. Built-in trailing stops and breakeven management.',
    fullDescription: 'Trend Master Elite identifies and rides major market trends using a combination of moving averages, momentum indicators, and price action analysis. This EA excels in trending markets and includes sophisticated exit strategies to lock in profits. Perfect for swing traders and those who prefer longer-term positions.',
    price: 249.00,
    imageUrl: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Trend Following Strategy',
      'Trailing Stop Loss',
      'Breakeven Management',
      'Multi-Currency Support',
      'Low Drawdown',
      'Backtested 10+ Years',
      'Email Alerts',
      'Detailed User Guide'
    ],
    performanceData: {
      winRate: 72,
      totalTrades: 1876,
      profitFactor: 2.87,
      maxDrawdown: 8.3
    },
    isFeatured: true,
    stockStatus: 'available'
  },
  {
    id: '3',
    name: 'Night Hawk Trader',
    slug: 'night-hawk-trader',
    description: 'Optimized for Asian and European session volatility. Perfect for passive income.',
    fullDescription: 'Night Hawk Trader specializes in trading during low-volatility sessions when spreads are tight and price movements are predictable. This EA uses a grid and hedging strategy combined with smart money management to generate consistent returns while you sleep.',
    price: 199.00,
    imageUrl: 'https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Session-Specific Trading',
      'Grid & Hedge Strategy',
      'Low Risk Settings',
      'Passive Income Focus',
      'News Filter Built-In',
      'Works on VPS',
      'Lifetime Support',
      'Money-Back Guarantee'
    ],
    performanceData: {
      winRate: 81,
      totalTrades: 3201,
      profitFactor: 1.98,
      maxDrawdown: 15.2
    },
    isFeatured: true,
    stockStatus: 'available'
  },
  {
    id: '4',
    name: 'Breakout Hunter',
    slug: 'breakout-hunter',
    description: 'Catch explosive breakout moves with precision entry and exit signals.',
    fullDescription: 'Breakout Hunter is designed to identify and capitalize on major price breakouts from consolidation zones. Using volume analysis, volatility indicators, and support/resistance levels, this EA enters trades at the optimal moment and manages them with military precision.',
    price: 279.00,
    imageUrl: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Breakout Detection',
      'Volume Analysis',
      'High Profit Potential',
      'Conservative Risk',
      'Volatility Filter',
      'Works on All Pairs',
      'Real-Time Notifications',
      'Comprehensive FAQ'
    ],
    performanceData: {
      winRate: 69,
      totalTrades: 1542,
      profitFactor: 3.12,
      maxDrawdown: 18.7
    },
    isFeatured: false,
    stockStatus: 'available'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Michael Chen',
    customerTitle: 'Professional Trader',
    content: 'AI Scalper Pro has transformed my trading completely. I went from struggling with manual trading to seeing consistent profits every week. The AI adapts to market conditions flawlessly.',
    rating: 5,
    isFeatured: true
  },
  {
    id: '2',
    customerName: 'Sarah Williams',
    customerTitle: 'Forex Enthusiast',
    content: 'I was skeptical about EAs, but Trend Master Elite proved me wrong. The backtested results matched my live trading performance. Best investment I\'ve made in my trading career.',
    rating: 5,
    isFeatured: true
  },
  {
    id: '3',
    customerName: 'David Rodriguez',
    customerTitle: 'Part-Time Trader',
    content: 'Night Hawk Trader is perfect for my busy lifestyle. I set it up once and it trades while I\'m at work. The passive income has been life-changing.',
    rating: 5,
    isFeatured: true
  },
  {
    id: '4',
    customerName: 'Emma Thompson',
    customerTitle: 'Swing Trader',
    content: 'The support team is incredibly responsive and the EA performance is outstanding. I\'ve recommended this to all my trading friends.',
    rating: 4,
    isFeatured: true
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    customerName: 'Alex Johnson',
    customerTitle: 'Day Trader',
    rating: 5,
    title: 'Outstanding performance and reliability',
    content: 'AI Scalper Pro has been running for 6 months now and the results are incredible. The win rate matches the backtesting data perfectly. The AI algorithms adapt to market conditions seamlessly.',
    date: '2024-01-15',
    verified: true,
    helpful: 24
  },
  {
    id: '2',
    productId: '1',
    customerName: 'Maria Garcia',
    customerTitle: 'Forex Trader',
    rating: 5,
    title: 'Game changer for my trading',
    content: 'I was hesitant at first, but after seeing consistent profits month after month, I\'m a believer. The risk management is excellent and the support team is very responsive.',
    date: '2024-01-08',
    verified: true,
    helpful: 18
  },
  {
    id: '3',
    productId: '2',
    customerName: 'Robert Kim',
    customerTitle: 'Swing Trader',
    rating: 4,
    title: 'Solid trend following EA',
    content: 'Trend Master Elite does exactly what it promises. It catches major trends and holds them well. The trailing stops work perfectly. Only minor issue is occasional whipsaw in ranging markets.',
    date: '2024-01-12',
    verified: true,
    helpful: 15
  },
  {
    id: '4',
    productId: '2',
    customerName: 'Lisa Chen',
    customerTitle: 'Professional Trader',
    rating: 5,
    title: 'Perfect for trend trading',
    content: 'This EA has the lowest drawdown of any trend-following system I\'ve used. The breakeven management is a game-changer. Highly recommended for serious traders.',
    date: '2024-01-05',
    verified: true,
    helpful: 22
  },
  {
    id: '5',
    productId: '3',
    customerName: 'James Wilson',
    customerTitle: 'Part-time Trader',
    rating: 5,
    title: 'Passive income dream come true',
    content: 'Night Hawk Trader runs 24/7 on my VPS and generates consistent profits. Perfect for someone with a full-time job. The grid strategy is well-implemented.',
    date: '2024-01-10',
    verified: true,
    helpful: 31
  },
  {
    id: '6',
    productId: '3',
    customerName: 'Anna Petrov',
    customerTitle: 'Forex Enthusiast',
    rating: 4,
    title: 'Great for passive income',
    content: 'Works as advertised for night trading. The news filter prevents unwanted trades during major events. Support is excellent when needed.',
    date: '2024-01-03',
    verified: true,
    helpful: 12
  },
  {
    id: '7',
    productId: '4',
    customerName: 'Tom Anderson',
    customerTitle: 'Scalp Trader',
    rating: 5,
    title: 'Breakout trading excellence',
    content: 'Breakout Hunter catches explosive moves with precision. The volume analysis and volatility filters make it very reliable. One of the best breakout systems available.',
    date: '2024-01-14',
    verified: true,
    helpful: 19
  },
  {
    id: '8',
    productId: '4',
    customerName: 'Sophie Martin',
    customerTitle: 'Day Trader',
    rating: 4,
    title: 'Solid breakout detection',
    content: 'Very accurate breakout signals. The risk management keeps losses small. Would be 5 stars if it had more customization options for different timeframes.',
    date: '2024-01-07',
    verified: true,
    helpful: 16
  }
];
