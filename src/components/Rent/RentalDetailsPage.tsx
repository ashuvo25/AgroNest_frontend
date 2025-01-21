import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Calendar, 
  Clock, Shield, Tag, Info 
} from 'lucide-react';

// Add equipment data type
interface Equipment {
  id: number;
  name: string;
  category: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  images: string[];
}

const RentalDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample equipment data (replace with API call)
  const equipmentList: Equipment[] = [
    {
      id: 1,
      name: 'সোনালিকা DI-745 III ট্র্যাক্টর',
      category: 'ট্র্যাক্টর',
      hourlyRate: 800,
      dailyRate: 5000,
      weeklyRate: 30000,
      images: ['src/assets/images/tractro.jpg']
    }
    // Add more equipment as needed
  ];
  
  const equipment = equipmentList.find(e => e.id === Number(id));

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">যন্ত্রপাতি পাওয়া যায়নি</h2>
          <button 
            onClick={() => navigate('/rent')}
            className="mt-4 text-green-600 hover:text-green-700"
          >
            ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/rent')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>ফিরে যান</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md">
          {/* Image Gallery */}
          <div className="relative h-80">
            <img 
              src={equipment.images[0]}
              alt={equipment.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          {/* Equipment Details */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{equipment.name}</h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {equipment.category}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">ঘণ্টায়</p>
                <p className="font-bold text-xl">৳{equipment.hourlyRate}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">দৈনিক</p>
                <p className="font-bold text-xl">৳{equipment.dailyRate}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">সাপ্তাহিক</p>
                <p className="font-bold text-xl">৳{equipment.weeklyRate}</p>
              </div>
            </div>

            {/* Rest of the details */}
            {/* ...specifications, availability, owner info... */}

            {/* Booking Button */}
            <div className="mt-8">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                ভাড়া বুক করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsPage;
