import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import UploadBox from '../components/UploadBox';
import { Sparkles, Image as ImageIcon, Zap, Database } from 'lucide-react';

const Home = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      await uploadImageAPI(file);
      toast.success('Image analyzed successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to analyze image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl mb-6 border border-indigo-500/20">
          <Sparkles className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Image Analysis</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Upload any image and let our advanced AI model instantly identify objects, categorize the scene, and generate detailed descriptions and tags.
        </p>
      </div>

      <UploadBox onUpload={handleUpload} isUploading={isUploading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="glass-panel p-6 text-center">
          <ImageIcon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-200 mb-2">Any Image Type</h3>
          <p className="text-sm text-slate-500">Food, nature, gadgets, animals, or notes—our AI can analyze it all.</p>
        </div>
        <div className="glass-panel p-6 text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-200 mb-2">Instant Results</h3>
          <p className="text-sm text-slate-500">Get detailed descriptions and tags in seconds using state-of-the-art AI.</p>
        </div>
        <div className="glass-panel p-6 text-center">
          <Database className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-200 mb-2">Manage Database</h3>
          <p className="text-sm text-slate-500">Store, search, edit, and organize all your analyzed images in one place.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
