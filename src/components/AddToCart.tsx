import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  brand: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category?: string;
}

const CartItemCard: React.FC<CartItem> = ({
  brand,
  productName,
  description,
  price,
  quantity,
  imageUrl,
  category
}) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-green-100/50">
    <div className="flex items-center p-4 gap-4">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-green-50">
        <img src={imageUrl} alt={productName} className="w-full h-full object-cover" />
        {category && (
          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-green-100/90 text-green-800 rounded-full font-medium">
            {category}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{productName}</h3>
            <p className="text-xs text-green-600 font-medium">{brand}</p>
          </div>
          <p className="font-bold text-lg text-green-800">${price.toFixed(2)}</p>
        </div>
        
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-green-50/80 rounded-lg p-1.5">
            <button className="w-7 h-7 flex items-center justify-center text-sm bg-white rounded-md shadow-sm hover:bg-green-50 text-green-600 transition-colors">
              −
            </button>
            <span className="text-sm font-medium w-8 text-center text-green-900">{quantity}</span>
            <button className="w-7 h-7 flex items-center justify-center text-sm bg-white rounded-md shadow-sm hover:bg-green-50 text-green-600 transition-colors">
              +
            </button>
          </div>
          <button className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1.5 px-2 py-1.5 hover:bg-red-50 rounded-md transition-colors">
            <span className="text-base">🗑</span>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems: CartItem[] = [
    {
      id: 1,
      brand: "Scarlett",
      productName: "Scarlett Whitening",
      description: "Brightly Serum",
      price: 10.3,
      quantity: 1,
      imageUrl: "src/assets/rice-field.jpg",
    },
    {
      id: 2,
      brand: "Ponds",
      productName: "Ponds White Series",
      description: "4 Products",
      price: 21.93,
      quantity: 1,
      imageUrl: "src/assets/farmer.jpg",
    },
    {
      id: 3,
      brand: "Emina",
      productName: "Emina Bright Stuff",
      description: "Face Serum",
      price: 11.56,
      quantity: 2,
      imageUrl: "src/assets/smart-farming.jpg",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/90 via-green-50/50 to-white/80">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-green-100/50 z-40">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-green-50 rounded-xl transition-colors flex items-center gap-2 text-green-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🛒</span> Your Cart
              <span className="text-sm font-normal text-green-600">({cartItems.length} items)</span>
            </h1>
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <span className="text-base">🗑</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} {...item} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-100/50">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">$5.00</span>
              </div>
              <div className="h-px bg-green-100"></div>
              <div className="flex justify-between text-base">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-green-700">${(totalPrice + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-green-100/50 p-4">
        <div className="container mx-auto max-w-2xl">
          <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-lg">
              ${(totalPrice + 5).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
