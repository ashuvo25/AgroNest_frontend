import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ [key: number]: File | null }>({
    0: null, 1: null, 2: null, 3: null, 4: null
  });
  const [previews, setPreviews] = useState<{ [key: number]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    type: '',
    location: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate images
    const imageCount = Object.values(images).filter(img => img !== null).length;
    if (imageCount !== 5) {
      newErrors.images = '৫টি ছবি আপলোড করা বাধ্যতামূলক';
    }

    // Validate other fields
    if (!formData.name.trim()) newErrors.name = 'পণ্যের নাম দিতে হবে';
    if (!formData.quantity.trim()) newErrors.quantity = 'পরিমাণ দিতে হবে';
    if (!formData.price.trim()) newErrors.price = 'মূল্য দিতে হবে';
    if (!formData.type) newErrors.type = 'পণ্যের ধরন নির্বাচন করুন';
    if (!formData.location.trim()) newErrors.location = 'অবস্থান দিতে হবে';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Continue with form submission
      console.log('Form is valid', { images, formData });
    }
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      setImages(prev => ({ ...prev, [index]: file }));
      setPreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => ({ ...prev, [index]: null }));
    setPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white shadow-sm w-full">
          <div className="max-w-4xl mx-auto px-4">
            <div className="py-4 flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl text-gray-600">&lt;</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-800">নতুন পণ্য যোগ করুন</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <form className="divide-y divide-gray-100" onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">পণ্যের ছবি</h2>
                  <p className="text-sm text-gray-500 mt-1">৫টি ছবি আপলোড করুন <span className="text-red-500">*</span></p>
                </div>

                {/* First row - 3 images */}
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="group">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-green-500 transition-colors">
                        {previews[index] ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={previews[index]} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <FiX size={16} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                            <FiUpload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs font-medium text-gray-500">ছবি {index + 1}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second row - 2 images */}
                <div className="grid grid-cols-2 gap-4 mt-4 max-w-[66%]">
                  {[3, 4].map((index) => (
                    <div key={index} className="group">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-green-500 transition-colors">
                        {previews[index] ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={previews[index]} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <FiX size={16} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                            <FiUpload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs font-medium text-gray-500">ছবি {index + 1}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.images && <p className="text-sm text-red-500 mt-3">{errors.images}</p>}
              </div>

              {/* Product Details Section */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পণ্যের নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
                    placeholder="পণ্যের নাম লিখুন"
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1.5">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      পরিমাণ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${
                        errors.quantity ? 'border-red-500' : 'border-gray-200'
                      } rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
                      placeholder="কেজি/পিস"
                    />
                    {errors.quantity && <p className="text-sm text-red-500 mt-1.5">{errors.quantity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      মূল্য <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${
                        errors.price ? 'border-red-500' : 'border-gray-200'
                      } rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
                      placeholder="৳"
                    />
                    {errors.price && <p className="text-sm text-red-500 mt-1.5">{errors.price}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পণ্যের ধরন <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.type ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
                  >
                    <option value="">পণ্যের ধরন নির্বাচন করুন</option>
                    <option value="seeds">বীজ</option>
                    <option value="fertilizer">সার</option>
                    <option value="pesticide">কীটনাশক</option>
                    <option value="equipment">যন্ত্রপাতি</option>
                  </select>
                  {errors.type && <p className="text-sm text-red-500 mt-1.5">{errors.type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    অবস্থান <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.location ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
                    placeholder="আপনার অবস্থান"
                  />
                  {errors.location && <p className="text-sm text-red-500 mt-1.5">{errors.location}</p>}
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="p-6 bg-gray-50">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 transition-all font-medium text-sm"
                >
                  পণ্য যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
