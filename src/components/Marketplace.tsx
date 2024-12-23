import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Clock, Tag, AlertCircle, TrendingUp, 
  User, BarChart2, Shield, Truck, Award, ArrowLeft,
  MessageCircle // Add MessageCircle icon
} from 'lucide-react';

// Update existing styled components with new styles
const Card = ({ children, className = '' }) => (
  <div className={`bg-white/90 backdrop-filter backdrop-blur-lg border border-green-100/50 
    rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
    hover:transform hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-2 border-b">{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-2 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const Button = ({ children, variant = 'default', disabled = false, onClick, className = '', size = 'md' }) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 transform hover:scale-102 active:scale-98';
  const variants = {
    default: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-green-200 bg-white/80 text-green-700 hover:bg-green-50',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
  };
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${className}`}
  />
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-green-100 text-green-800',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Alert = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-blue-50 text-blue-800',
    destructive: 'bg-red-50 text-red-800',
  };
  
  return (
    <div className={`p-4 rounded-md ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => (
  <p className="text-sm mt-1">{children}</p>
);

const ChatModal = ({ isOpen, onClose, sellerName, productName }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { sender: 'you', text: message }]);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">{sellerName} - {productName}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="h-96 p-4 overflow-y-auto">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.sender === 'you' ? 'text-right' : ''}`}>
              <span className={`inline-block p-2 rounded-lg ${
                msg.sender === 'you' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="আপনার বার্তা লিখুন..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>পাঠান</Button>
        </div>
      </div>
    </div>
  );
};

const TimeRemaining = ({ endTime }) => {
  const remaining = new Date(endTime).getTime() - new Date().getTime();
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  let bgColor = 'bg-green-100';
  let textColor = 'text-green-800';
  
  if (days < 2) {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  } else if (days < 5) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  }

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1.5 rounded-full font-medium text-sm flex items-center gap-2`}>
      <Clock className="h-4 w-4" />
      <span>{days} দিন {hours} ঘণ্টা বাকি</span>
    </div>
  );
};

const Marketplace = () => {
  const [products, setProducts] = useState([
    // Grains Category
    {
      id: 1,
      name: "প্রিমিয়াম নাজিরশাইল চাল",
      description: "বিশুদ্ধ নাজিরশাইল চাল, জৈব পদ্ধতিতে চাষকৃত। সুগন্ধযুক্ত এবং উচ্চ মানের।",
      currentBid: 3500,
      minBidIncrement: 100,
      seller: {
        name: "দিনাজপুর অর্গানিক ফার্ম",
        rating: 4.9,
        verifiedSince: "2019",
        totalSales: 250
      },
      endTime: "2024-12-25",
      image: "/images/rice.jpg",
      category: "শস্য",
      quantity: "১০০ কেজি",
      certification: ["জৈব সনদপ্রাপ্ত", "বিশুদ্ধ"],
      biddingHistory: [
        { amount: 3500, time: "2024-12-20 15:30", bidder: "User123" }
      ],
      specifications: {
        moisture: "১২-১৪%",
        protein: "৮-৯%",
        harvestDate: "২০২৪-১২",
        origin: "দিনাজপুর"
      }
    },

    // Legumes Category
    {
      id: 2,
      name: "মানিকগঞ্জ মসুর ডাল",
      description: "উচ্চ প্রোটিনযুক্ত মসুর ডাল, প্রাকৃতিক পদ্ধতিতে চাষকৃত।",
      currentBid: 2800,
      minBidIncrement: 100,
      seller: {
        name: "মানিকগঞ্জ এগ্রো",
        rating: 4.8,
        verifiedSince: "2020",
        totalSales: 180
      },
      endTime: "2024-12-23",
      image: "/images/lentils.jpg",
      category: "ডাল",
      quantity: "৫০ কেজি",
      certification: ["প্রাকৃতিক", "বিশুদ্ধ"],
      biddingHistory: [
        { amount: 2800, time: "2024-12-20 16:45", bidder: "User789" }
      ],
      specifications: {
        moisture: "১০-১২%",
        protein: "২৪-২৬%",
        harvestDate: "২০২৪-১২",
        origin: "মানিকগঞ্জ"
      }
    },

    // Vegetables Category
    {
      id: 3,
      name: "তাজা গাজীপুরী টমেটো",
      description: "টাটকা সবুজ টমেটো, রাসায়নিক মুক্ত, অর্গানিক পদ্ধতিতে উৎপাদিত।",
      currentBid: 1500,
      minBidIncrement: 50,
      seller: {
        name: "গাজীপুর কৃষি খামার",
        rating: 4.7,
        verifiedSince: "2021",
        totalSales: 120
      },
      endTime: "2024-12-24",
      image: "/images/tomatoes.jpg",
      category: "সবজি",
      quantity: "২০ কেজি",
      certification: ["জৈব", "তাজা"],
      biddingHistory: [
        { amount: 1500, time: "2024-12-20 14:30", bidder: "User456" }
      ],
      specifications: {
        moisture: "৯০-৯৫%",
        freshness: "১০০%",
        harvestDate: "২০২৪-১২",
        origin: "গাজীপুর"
      }
    },

    // Fruits Category
    {
      id: 4,
      name: "রাজশাহী আম (হিমসাগর)",
      description: "বিখ্যাত রাজশাহী হিমসাগর আম, মিষ্টি ও সুগন্ধযুক্ত।",
      currentBid: 4500,
      minBidIncrement: 200,
      seller: {
        name: "রাজশাহী ফল উৎপাদক সমিতি",
        rating: 5.0,
        verifiedSince: "2018",
        totalSales: 300
      },
      endTime: "2024-12-26",
      image: "/images/mango.jpg",
      category: "ফল",
      quantity: "৪০ কেজি",
      certification: ["প্রিমিয়াম গ্রেড", "জিআই"],
      biddingHistory: [
        { amount: 4500, time: "2024-12-20 13:15", bidder: "User567" }
      ],
      specifications: {
        sweetness: "১৮-২০ ব্রিক্স",
        ripeness: "৯৫%",
        harvestDate: "২০২৪-১২",
        origin: "রাজশাহী"
      }
    },

    // Specialty Crops Category
    {
      id: 5,
      name: "সিলেটি পান পাতা",
      description: "উচ্চ মানের সিলেটি পান পাতা, বিশেষ যত্নে উৎপাদিত।",
      currentBid: 2000,
      minBidIncrement: 100,
      seller: {
        name: "সিলেট পান উৎপাদক সংঘ",
        rating: 4.9,
        verifiedSince: "2019",
        totalSales: 220
      },
      endTime: "2024-12-27",
      image: "/images/betel.jpg",
      category: "বিশেষ ফসল",
      quantity: "১০০০টি পাতা",
      certification: ["প্রিমিয়াম", "বিশুদ্ধ"],
      biddingHistory: [
        { amount: 2000, time: "2024-12-20 12:00", bidder: "User890" }
      ],
      specifications: {
        freshness: "১০০%",
        size: "মাঝারি-বড়",
        harvestDate: "২০২৪-১২",
        origin: "সিলেট"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সব"); // Changed from "All"
  const [newBid, setNewBid] = useState({});
  const [sortOption, setSortOption] = useState("endingSoon");
  const [viewMode, setViewMode] = useState("grid");
  const [chatModal, setChatModal] = useState({ isOpen: false, seller: null, product: null });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Updated categories in Bengali
  const categories = ["সব", "শস্য", "ডাল", "সবজি", "ফল", "বিশেষ ফসল"];
  
  // Updated sort options in Bengali
  const sortOptions = [
    { value: "endingSoon", label: "শীঘ্রই শেষ হচ্ছে" },
    { value: "highestBid", label: "সর্বোচ্চ দর" },
    { value: "lowestBid", label: "সর্বনিম্ন দর" },
    { value: "recentlyAdded", label: "সাম্প্রতিক যোগ করা" }
  ];

  const handleBid = (productId) => {
    if (!newBid[productId]) return;
    
    setProducts(products.map(product => {
      if (product.id === productId && newBid[productId] >= product.currentBid + product.minBidIncrement) {
        return {
          ...product,
          biddingHistory: [
            { amount: parseInt(newBid[productId]), time: new Date().toISOString(), bidder: "CurrentUser" },
            ...product.biddingHistory
          ],
          currentBid: parseInt(newBid[productId])
        };
      }
      return product;
    }));
    setNewBid({ ...newBid, [productId]: "" });
  };

  const getTimeRemaining = (endTime) => {
    const remaining = new Date(endTime).getTime() - new Date().getTime();
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "সব" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "endingSoon":
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        case "highestBid":
          return b.currentBid - a.currentBid;
        case "lowestBid":
          return a.currentBid - b.currentBid;
        default:
          return 0;
      }
    });

    const handleNavigation = (path: string) => {
        window.location.href = path;
    };

  // Get highest bidder info
  const getHighestBidder = (biddingHistory) => {
    if (biddingHistory.length === 0) return "কোন দর নেই";
    return biddingHistory[0].bidder;
  };

  // Update chat button component
  const ChatButton = ({ seller, productName }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setChatModal({
        isOpen: true,
        seller,
        product: productName
      })}
      className="flex items-center gap-1 bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700"
    >
      <MessageCircle className="h-4 w-4" />
      <span>বিক্রেতার সাথে চ্যাট</span>
    </Button>
  );

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Enhanced Header with gradient */}
      <div className="sticky top-0 bg-white/80 backdrop-filter backdrop-blur-lg border-b border-green-100 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                onClick={() => handleNavigation('/home_page')}
                className="p-2 rounded-full hover:bg-green-50"
              >
                <ArrowLeft className="h-5 w-5 text-green-800" />
              </Button>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  কৃষি বাজার
                </h2>
                <p className="text-gray-600">প্রিমিয়াম ফসল সরাসরি কৃষক থেকে ক্রয়</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1 bg-green-50">
                <Shield className="h-4 w-4" />
                যাচাইকৃত ট্রেডিং
              </Badge>
              <Badge variant="secondary" className="gap-1 bg-green-50">
                <Award className="h-4 w-4" />
                মানসম্মত নিশ্চিত
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Enhanced Search and Filters */}
        <div className="bg-white/90 backdrop-filter backdrop-blur-lg rounded-xl p-6 mb-8 shadow-xl border border-green-100/50">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-green-600" />
              <Input
                type="text"
                placeholder="পণ্যের নাম বা বিবরণ দিয়ে খুঁজুন..."
                className="pl-12 h-12 text-lg transition-all border-2 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border rounded-md px-3 py-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-2 rounded-full ${
                  selectedCategory === category ? 'ring-4 ring-green-500/20' : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
            "flex flex-col gap-8"
          }>
            {filteredProducts.map(product => (
              <Card key={product.id}>
                <div className="relative group overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-sm opacity-90">{product.seller.name}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {product.certification.map(cert => (
                      <Badge key={cert} variant="secondary" className="bg-white/90 shadow-sm">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardHeader className="border-b border-green-100">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-l mb-0">{product.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{product.seller.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          ⭐ {product.seller.rating}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-0">
                  <p className="text-gray-600 ">{product.description}</p>
                  
                  {/* Updated grid layout */}
                  <div className="grid grid-cols-2 gap-0">
                    <div className="col-span-2 flex items-center justify-between gap-0">
                      <div className=" rounded-lg p-3 flex items-center gap-1">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">পরিমাণ: {product.quantity}</span>
                  <TimeRemaining endTime={product.endTime} />  
                    </div>
                      
                    </div>
                    <div className=" rounded-lg p-3 flex items-center gap-2">
                      <Truck className="h-4 w-4S text-green-600" />
                      <span className="text-sm text-green-700">{product.specifications.origin}</span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">{product.biddingHistory.length} দর</span>
                    </div>
                  </div>

                  <div className=" rounded-lg p-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">বিশেষ তথ্য</h4>
                      <ChatButton 
                        seller={product.seller.name}
                        productName={product.name}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="col-span-2 p-1 bg-green-50 rounded">
                        <span className="font-medium">সর্বোচ্চ দরদাতা:</span>{' '}
                        <span className="text-green-700">{getHighestBidder(product.biddingHistory)}</span>
                      </div>
                      <div>ফসল কাটার তারিখ: {product.specifications.harvestDate}</div>
                      <div>উৎপাদন স্থান: {product.specifications.origin}</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-600">বর্তমান দর:</span>
                      <span className="text-xl font-bold text-green-600">৳{product.currentBid.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder={`ন্যূনতম দর: ৳${(product.currentBid + product.minBidIncrement).toLocaleString()}`}
                        value={newBid[product.id] || ""}
                        onChange={(e) => setNewBid({ ...newBid, [product.id]: e.target.value })}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleBid(product.id)}
                        disabled={!newBid[product.id] || newBid[product.id] < product.currentBid + product.minBidIncrement}
                      >
                        দর দিন
                      </Button>
                    </div>
                    {newBid[product.id] && newBid[product.id] < product.currentBid + product.minBidIncrement && (
                      <Alert variant="destructive" className="mt-1">
                        
                        <AlertDescription>
                          ⚠️ দর অবশ্যই ৳{(product.currentBid + product.minBidIncrement).toLocaleString()} এর বেশি হতে হবে
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ isOpen: false, seller: null, product: null })}
        sellerName={chatModal.seller}
        productName={chatModal.product}
      />
    </div>
  );
};

export default Marketplace;