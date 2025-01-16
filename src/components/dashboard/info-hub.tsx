import React, { useState } from 'react';
import { 
  Sprout, 
  Home,
  BadgeInfo,
  Users,
  Leaf,
  ImageIcon,
  Tag,
  Plus,
  Trash2,
  LogOut,
  Eye, // Add Eye icon
  Search // Add Search icon
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const InfoHub = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('info-hub');
  const [activeView, setActiveView] = useState('post'); // New state for view control
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: '',
    category: '',
    tags: '',
    infoImage: null
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Move blogs to state to manage deletions
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Sustainable Farming Practices",
      description: "Learn about the latest sustainable farming methods and their impact on the environment.",
      category: "Farming",
      tags: ["sustainable", "organic", "eco-friendly"],
      image: "/api/placeholder/400/200",
      source: "Agricultural Research Center",
      date: "2024-01-15" // Add date
    },
    {
      id: 2,
      title: "Crop Disease Prevention",
      description: "Essential guide to identifying and preventing common crop diseases.",
      category: "Crops",
      tags: ["disease", "prevention", "management"],
      image: "/api/placeholder/400/200",
      source: "Plant Health Institute",
      date: "2024-01-16" // Add date
    },
    {
        id: 3,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 4,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 5,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      }
      ,   {
        id: 6,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 7,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 8,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 9,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      },
      {
        id: 10,
        title: "Crop Disease Prevention",
        description: "Essential guide to identifying and preventing common crop diseases.",
        category: "Crops",
        tags: ["disease", "prevention", "management"],
        image: "/api/placeholder/400/200",
        source: "Plant Health Institute",
        date: "2024-01-16" // Add date
      }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    // Handle image upload logic here
    console.log('Image selected:', e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleDelete = (blogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
  };

  const handleLogout = () => {
    navigate('/signin');
  };

  const handleNavigation = (path: string) => {
    setActiveNav(path);
    navigate(`/${path}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Side Navigation */}
      <div className="fixed h-screen w-64 flex flex-col bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-green-100 bg-green-700 p-6">
          <div className="flex items-center gap-3">
            <Sprout className="h-7 w-7 text-white drop-shadow-sm" />
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">AgroNest</h1>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`flex w-full items-center px-6 py-3 text-sm font-semibold ${
              activeNav === 'dashboard'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            ড্যাশবোর্ড
          </button>
          <button
            onClick={() => handleNavigation('info-hub')}
            className={`flex w-full items-center px-6 py-3 text-sm font-semibold ${
              activeNav === 'info-hub'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            <BadgeInfo className="mr-3 h-5 w-5" />
            তথ্য কেন্দ্র
          </button>
          <div className="mx-6 my-4 border-t border-green-100"></div>
          <div className="px-6 py-2 text-xs font-semibold uppercase text-gray-400">
            Quick Links
          </div>
          <button className="flex w-full items-center px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-green-50">
            <Users className="mr-3 h-5 w-5" />
            Farmers Network
          </button>
          <button className="flex w-full items-center px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-green-50">
            <Leaf className="mr-3 h-5 w-5" />
            Crop Calendar
          </button>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-green-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="mr-3 h-5 w-5" />
            লগআউট
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Enhanced Menu Bar - Fixed Position with consistent height */}
        <div className="bg-green-700 h-16 shadow-md sticky top-0 z-10">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setActiveView('post')}
                className={`px-8 py-2.5 rounded-lg transition-all duration-200 font-bold text-base ${
                  activeView === 'post'
                    ? 'bg-white text-green-700'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                পোস্ট নিউজ
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-8 py-2.5 rounded-lg transition-all duration-200 font-bold text-base ${
                  activeView === 'list'
                    ? 'bg-white text-green-700'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                সকল পোস্ট
              </button>
            </div>
            
            {/* Conditional Search Bar */}
            {activeView === 'list' && (
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-green-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {activeView === 'post' ? (
          // Form Section
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Add New Information</h2>
                <p className="mt-2 text-gray-600">Share valuable agricultural knowledge and insights with the community</p>
              </div>

              <form onSubmit={handleSubmit} className="rounded-xl border border-green-100 bg-white p-8 shadow-sm space-y-6">
                {/* Form fields with enhanced styling */}
                <div className="grid gap-6">
                  {/* Title field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-green-200 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
                      placeholder="Enter information title"
                    />
                  </div>
                  
                  {/* Description field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-green-200 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
                      placeholder="Enter detailed description"
                    />
                  </div>

                  {/* Source field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-green-200 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
                      placeholder="Enter information source"
                    />
                  </div>

                  {/* Category field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-green-200 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
                    >
                      <option value="">Select category</option>
                      <option value="farming">Government</option>
                      <option value="crops">Bank news</option>
                      <option value="livestock">General</option>
                      {/* <option value="technology">Technology</option> */}
                    </select>
                  </div>

                  {/* Tags field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-green-200 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>

                  {/* Image field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                    <div className="mt-1 flex items-center">
                      <label className="flex cursor-pointer items-center rounded-lg border border-green-200 px-4 py-2 hover:bg-green-50">
                        <ImageIcon className="mr-2 h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Choose Image</span>
                        <input
                          type="file"
                          name="infoImage"
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-white hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-sm"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Information
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Enhanced Table View with Fixed Header
          <div className="flex-1 p-8 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
              {/* Table Header Section */}
              <div className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0">
                <h3 className="text-lg font-semibold text-gray-800">Published Information</h3>
                <p className="text-sm text-gray-600">Manage and monitor all agricultural content</p>
              </div>
              
              {/* Fixed Table Header */}
              <div className="min-w-full">
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="flex">
                    {["ছবি", "শিরোনাম", "বিভাগ", "তারিখ", "পরিচালনা"].map((header) => (
                      <div key={header} className="px-6 py-4 flex-1 text-left text-sm font-bold text-green-700 uppercase tracking-wider">
                        {header}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Scrollable Table Body */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                  {blogs.map((blog) => (
                    <div key={blog.id} className="flex items-center hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100">
                      <div className="px-6 py-4 flex-1">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="h-14 w-14 rounded-lg object-cover ring-2 ring-gray-100"
                        />
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {blog.category}
                        </span>
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <div className="text-sm text-gray-600">{blog.date}</div>
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-150"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => console.log('View blog:', blog.id)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors duration-150"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHub;