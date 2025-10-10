export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  videoUrl?: string;
  features: string[];
  performanceData?: {
    winRate: number;
    totalTrades: number;
    profitFactor: number;
    maxDrawdown: number;
  };
  isFeatured: boolean;
  stockStatus: 'available' | 'out_of_stock';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  items: CartItem[];
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerTitle?: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  isFeatured: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerTitle?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
