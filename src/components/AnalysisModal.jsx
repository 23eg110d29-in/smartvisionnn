import React, { useState } from 'react';
import { X, Save, Trash2, Edit2, ShieldCheck, Tag } from 'lucide-react';

const AnalysisModal = ({ analysis, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: analysis.title,
    category: analysis.category,
    aiDescription: analysis.aiDescription,
    tags: analysis.tags.join(', ')
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };
    onUpdate(analysis._id, updatedData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-slide-up">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center min-h-[300px]">
          <img 
            src={`http://localhost:5000/uploads/${analysis.image}`} 
            alt={analysis.title}
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-between items-center mb-6 pr-10">
            {isEditing ? (
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-xl font-bold text-white w-full mr-4"
              />
            ) : (
              <h2 className="text-2xl font-bold text-white">{analysis.title}</h2>
            )}
          </div>

          <div className="space-y-6 flex-grow">
            {/* Category & Confidence */}
            <div className="flex gap-4">
              <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Category</p>
                {isEditing ? (
                  <input 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white w-full"
                  />
                ) : (
                  <p className="text-sm font-medium text-indigo-300">{analysis.category}</p>
                )}
              </div>
              <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Confidence
                </p>
                <p className={`text-sm font-medium ${
                  analysis.confidence.toLowerCase() === 'high' ? 'text-green-400' : 
                  analysis.confidence.toLowerCase() === 'medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {analysis.confidence}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">AI Analysis</p>
              {isEditing ? (
                <textarea 
                  name="aiDescription"
                  value={formData.aiDescription}
                  onChange={handleChange}
                  rows="4"
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white w-full resize-none"
                />
              ) : (
                <p className="text-sm text-slate-400 leading-relaxed bg-slate-800/30 p-4 rounded-lg">
                  {analysis.aiDescription}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Tags
              </p>
              {isEditing ? (
                <input 
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white w-full"
                  placeholder="tag1, tag2, tag3"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {analysis.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Objects */}
            {analysis.detectedObjects && analysis.detectedObjects.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-300 mb-2">Detected Objects</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.detectedObjects.map((obj, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-md border border-indigo-500/20">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-700 flex justify-between">
            <button 
              onClick={() => onDelete(analysis._id)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
            
            {isEditing ? (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
              >
                <Edit2 className="w-4 h-4" /> Edit Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
