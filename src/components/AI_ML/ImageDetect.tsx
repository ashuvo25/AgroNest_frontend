import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisease } from '../../context/DiseaseContext';

const API_CONFIG = {
  BASE_URL: `${window.location.protocol}//${window.location.hostname}:5000`,
  ENDPOINTS: {
    predict: '/predict',
    chatbot: '/chat',
  },
  CORS_CONFIG: {
    mode: 'cors' as RequestMode,
    credentials: 'omit' as RequestCredentials,
    headers: {
      'Accept': 'application/json'
    }
  }
};

const Detect: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ disease: string; confidence: string } | null>(null);
  const { setDetectedDisease } = useDisease();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      alert('অনুগ্রহ করে একটি ছবি আপলোড করুন!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      setResult(null);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.predict}`, {
        method: 'POST',
        body: formData,
        mode: API_CONFIG.CORS_CONFIG.mode,
        credentials: API_CONFIG.CORS_CONFIG.credentials,
      });

      if (response.ok) {
        const data = await response.json();
        setResult({
          disease: data.disease,
          confidence: data.confidence.toString()
        });
      } else {
        const error = await response.json();
        alert(`ছবি প্রক্রিয়াকরণ ব্যর্থ হয়েছে: ${error.error}`);
      }
    } catch (error) {
      alert('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKnowMore = () => {
    if (result?.disease) {
      setDetectedDisease(result.disease);
      // Navigate immediately without waiting
      navigate('/chat');
    }
  };

  // ...existing JSX code for the return statement remains the same...

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen flex justify-center p-4 md:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-sm bg-white/90">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/ai_ml')}
            className="text-emerald-600 hover:text-emerald-800 font-medium mb-4"
          >
            &larr; Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 text-center">
            ফসলের রোগ সনাক্তকরণ
          </h1>
          <p className="text-gray-600 text-center mt-2 text-sm">
            বিশ্লেষন জন্য আপনার ফসলের ছবি আপলোড করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="imageInput"
            className="block w-full p-8 border-2 border-dashed border-emerald-400 bg-emerald-50 text-center rounded-xl cursor-pointer transition-all hover:bg-emerald-100 hover:border-emerald-500"
          >
            <div className="space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-emerald-600 font-medium">
                ছবি আপলোড করতে ক্লিক করুন অথবা টেনে আনুন
              </p>
              <p className="text-sm text-emerald-500">
                সমর্থিত ফরম্যাট: JPG, PNG
              </p>
            </div>
          </label>

          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl mx-auto mt-4"
            />
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 text-sm"
          >
            ছবি বিশ্লেষণ করুন
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              বিশ্লেষণের ফলাফল
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">রোগ:</span>
                <span className="font-bold text-emerald-700">{result.disease}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">নির্ভুলতা:</span>
                <span className="font-bold text-blue-600">
                  {result.confidence}%
                </span>
              </div>
            </div>
            <button
              onClick={handleKnowMore}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 mt-6 text-sm"
            >
              Know More
            </button>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-emerald-800 font-medium mt-4 text-center">
                বিশ্লেষণ করা হচ্ছে...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detect;