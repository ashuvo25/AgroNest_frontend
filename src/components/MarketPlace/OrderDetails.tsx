import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  id: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  userDetails: {
    name: string;
    phone: string;
    address: string;
    district: string;
    zipCode: string;
  };
}

const OrderDetails: React.FC = () => {
  const navigate = useNavigate();
  
  const [orders] = useState<OrderItem[]>([
    {
      id: "ORD001",
      productName: "প্রিমিয়াম বীজ (BR-28)",
      image: "src/assets/rice-field.jpg",
      quantity: 100,
      price: 2499,
      status: 'processing',
      userDetails: {
        name: "রহিম মিয়া",
        phone: "+880 1712-345678",
        address: "গ্রাম: নয়াপাড়া, উপজেলা: সদর",
        district: "রংপুর",
        zipCode: "5400"
      }
    },
    {
      id: "ORD002",
      productName: "জৈব কীটনাশক",
      image: "src/assets/vegetable-garden.jpg",
      quantity: 50,
      price: 999,
      status: 'pending',
      userDetails: {
        name: "করিম আলী",
        phone: "+880 1812-345678",
        address: "গ্রাম: পুরানপাড়া, উপজেলা: পীরগঞ্জ",
        district: "রংপুর",
        zipCode: "5400"
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 flex items-center gap-4 shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl text-white font-semibold">অর্ডার বিবরণী</h1>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-br from-green-100 via-white to-green-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 ">অর্ডার আইডি: {order.id}</span>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                    ${order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : ''}
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                  `}>
                    {order.status === 'pending' ? 'অপেক্ষমান' : ''}
                    {order.status === 'processing' ? 'প্রক্রিয়াধীন' : ''}
                    {order.status === 'shipped' ? 'পাঠানো হয়েছে' : ''}
                    {order.status === 'delivered' ? 'ডেলিভারি হয়েছে' : ''}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img 
                      src={order.image} 
                      alt={order.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{order.productName}</h3>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        পরিমাণ: {order.quantity} কেজি
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ৳{order.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    ক্রেতার তথ্য
                  </h4>
                  <div className="grid grid-cols-2 gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg text-xs shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 min-w-[50px]">নাম:</span>
                      <span className="text-green-800">{order.userDetails.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 min-w-[50px]">ফোন:</span>
                      <span className="text-green-800">{order.userDetails.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 min-w-[50px]">ঠিকানা:</span>
                      <span className="text-green-800">{order.userDetails.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 min-w-[50px]">জেলা:</span>
                      <span className="text-green-800">{order.userDetails.district} - {order.userDetails.zipCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-green-50/50 flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  অর্ডার ট্র্যাক করুন
                </button>
                <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  বাতিল করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;
