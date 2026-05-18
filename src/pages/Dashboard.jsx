import React, { useState, useEffect } from 'react';
import { getImagesAPI, updateImageAPI, deleteImageAPI } from '../services/api';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import AnalysisModal from '../components/AnalysisModal';
import { toast } from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = analyses.filter(a => 
        a.title?.toLowerCase().includes(lowercasedTerm) || 
        a.category?.toLowerCase().includes(lowercasedTerm) ||
        a.tags?.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredAnalyses(filtered);
    } else {
      setFilteredAnalyses(analyses);
    }
  }, [searchTerm, analyses]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const data = await getImagesAPI();
      setAnalyses(data);
      setFilteredAnalyses(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch images');
      toast.error('Could not load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const updated = await updateImageAPI(id, updatedData);
      setAnalyses(analyses.map(a => a._id === id ? updated : a));
      setSelectedAnalysis(updated);
      toast.success('Analysis updated!');
    } catch (err) {
      toast.error('Failed to update analysis');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImageAPI(id);
      setAnalyses(analyses.filter(a => a._id !== id));
      setSelectedAnalysis(null);
      toast.success('Analysis deleted');
    } catch (err) {
      toast.error('Failed to delete analysis');
    }
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 text-sm">View and manage your AI-analyzed images.</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-72">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {isLoading ? (
        <Loader message="Loading dashboard..." />
      ) : error ? (
        <div className="glass-panel p-8 flex flex-col items-center justify-center text-red-400 gap-4">
          <AlertCircle className="w-12 h-12" />
          <p>{error}</p>
          <button onClick={fetchImages} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-200">
            Try Again
          </button>
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <div className="glass-panel p-16 text-center flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-300">No analyses found</h2>
          <p className="text-slate-500 mt-2">
            {searchTerm ? "Try adjusting your search term." : "Upload an image from the Home page to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAnalyses.map(analysis => (
            <ImageCard 
              key={analysis._id} 
              analysis={analysis} 
              onSelect={setSelectedAnalysis} 
            />
          ))}
        </div>
      )}

      {selectedAnalysis && (
        <AnalysisModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
