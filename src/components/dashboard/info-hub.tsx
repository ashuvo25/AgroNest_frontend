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
  Eye // Add Eye icon
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

  // Move blogs to state to manage deletions
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Sustainable Farming Practices",
      description: "Learn about the latest sustainable farming methods and their impact on the environment.",
      category: "Farming",
      tags: ["sustainable", "organic", "eco-friendly"],
      image: "/api/placeholder/400/200",
      source: "Agricultural Research Center"
    },
    {
      id: 2,
      title: "Crop Disease Prevention",
      description: "Essential guide to identifying and preventing common crop diseases.",
      category: "Crops",
      tags: ["disease", "prevention", "management"],
      image: "/api/placeholder/400/200",
      source: "Plant Health Institute"
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
    <div className="flex h-screen bg-green-50">
      {/* Side Navigation */}
      <div className="fixed h-screen w-64 flex flex-col bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-green-100 bg-green-700 p-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold text-white">AgriFarm Hub</h1>
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

      {/* Main Content - Add margin to offset fixed sidebar */}
      <div className="flex-1 ml-64">
        {/* Top Menu Bar - New Addition */}
        <div className="bg-white shadow-sm p-4 flex gap-4">
          <button
            onClick={() => setActiveView('post')}
            className={`px-4 py-2 rounded-lg ${
              activeView === 'post'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            পোস্ট নিউজ
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-lg ${
              activeView === 'list'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            সকল পোস্ট
          </button>
        </div>

        {activeView === 'post' ? (
          // Form Section - Now with full width
          <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Add New Information</h2>
                  <p className="text-sm text-gray-600">Share agricultural knowledge and insights</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-lg border border-green-100 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-green-200 p-2 focus:border-green-500 focus:outline-none"
                    placeholder="Enter information title"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border border-green-200 p-2 focus:border-green-500 focus:outline-none"
                    placeholder="Enter detailed description"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Source</label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-green-200 p-2 focus:border-green-500 focus:outline-none"
                    placeholder="Enter information source"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-green-200 p-2 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="farming">Farming</option>
                    <option value="crops">Crops</option>
                    <option value="livestock">Livestock</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-green-200 p-2 focus:border-green-500 focus:outline-none"
                    placeholder="Enter tags separated by commas"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Image</label>
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
                <button
                  type="submit"
                  className="flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Information
                </button>
              </form>
            </div>
          </div>
        ) : (
          // New Table View
          <div className="p-6">
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintain</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => console.log('View blog:', blog.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHub;