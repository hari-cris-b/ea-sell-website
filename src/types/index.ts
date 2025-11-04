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

export interface User {
  id: string;
  email: string;
  name: string;
  city: string;
  referralCode?: string;
  createdAt: string;
}

export interface ClientTeam {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  clientTeamId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'payment_received' | 'completed' | 'cancelled';
  paymentMethod?: string;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
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

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
