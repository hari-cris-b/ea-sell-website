import { useState } from 'react';
import { Phone, Copy, CheckCircle2, Mail, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthForms from '../components/AuthForms';
import TeamSelector from '../components/TeamSelector';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<{ orderId: string; totalAmount: number } | null>(null);
  const [showAuthForms, setShowAuthForms] = useState(!isAuthenticated);

  if (cart.length === 0 && !orderData) {
    onNavigate('cart');
    return null;
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderData({
      orderId,
      totalAmount: getCartTotal()
    });

    clearCart();
    setIsProcessing(false);
  };

  if (orderData) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-xl p-12 border border-slate-800">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-2 text-center">Order Placed Successfully!</h1>
            <p className="text-slate-400 text-center mb-8">
              Your order has been created. Share your Order ID with the team member who will contact you.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-emerald-500/30">
              <div className="text-center mb-4">
                <p className="text-slate-400 text-sm mb-2">Your Order ID</p>
                <div className="flex items-center justify-center gap-3">
                  <p className="text-3xl font-bold text-emerald-500 font-mono">{orderData.orderId}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderData.orderId);
                      alert('Order ID copied to clipboard!');
                    }}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors"
                  >
                    <Copy className="w-5 h-5 text-emerald-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start text-left bg-slate-800 rounded-lg p-4">
                <Phone className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold mb-1">Client Team Will Call You</div>
                  <div className="text-sm text-slate-400">We'll contact you within 24 hours to finalize payment details</div>
                </div>
              </div>
              <div className="flex items-start text-left bg-slate-800 rounded-lg p-4">
                <Mail className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold mb-1">Confirmation Email Sent</div>
                  <div className="text-sm text-slate-400">Check your inbox for order details and team member contact info</div>
                </div>
              </div>
              <div className="flex items-start text-left bg-slate-800 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold mb-1">Payment Methods Available</div>
                  <div className="text-sm text-slate-400">Bank Transfer, Card, UPI, and other local payment options</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 mb-8">
              <h3 className="text-white font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-slate-300 text-sm mb-3">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="text-emerald-500 font-bold text-lg">${orderData.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-yellow-500">Awaiting Payment</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/50"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('cart')}
          className="flex items-center text-slate-400 hover:text-emerald-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        {showAuthForms && !isAuthenticated ? (
          <div className="max-w-2xl mx-auto">
            <AuthForms onAuthComplete={() => setShowAuthForms(false)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-4">Your Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Email</p>
                    <p className="text-white font-semibold">{user?.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Name</p>
                      <p className="text-white font-semibold">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">City</p>
                      <p className="text-white font-semibold">{user?.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <TeamSelector selectedTeamId={selectedTeamId} onTeamSelect={setSelectedTeamId} />

              <form onSubmit={handleOrderSubmit}>
                <button
                  type="submit"
                  disabled={isProcessing || !selectedTeamId}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing Order...' : 'Place Order'}
                </button>
              </form>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">
                  <strong className="text-white">Note:</strong> Actual payment will be processed during the call with your assigned team member. You can choose from various payment methods including bank transfer, card, UPI, and more.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{item.product.name}</h3>
                        <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-white font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-white font-semibold mb-3">How It Works</h3>
                  <ol className="space-y-2 text-sm text-slate-400">
                    <li className="flex">
                      <span className="text-emerald-500 font-bold mr-2">1.</span>
                      <span>Place order with team assignment</span>
                    </li>
                    <li className="flex">
                      <span className="text-emerald-500 font-bold mr-2">2.</span>
                      <span>Receive Order ID via email</span>
                    </li>
                    <li className="flex">
                      <span className="text-emerald-500 font-bold mr-2">3.</span>
                      <span>Team member calls you</span>
                    </li>
                    <li className="flex">
                      <span className="text-emerald-500 font-bold mr-2">4.</span>
                      <span>Complete payment offline</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
