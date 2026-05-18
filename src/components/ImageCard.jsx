import React from 'react';

const ImageCard = ({ analysis, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(analysis)}
      className="glass-panel group overflow-hidden cursor-pointer hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden bg-slate-900 flex-shrink-0 relative">
        <img 
          src={`http://localhost:5000/uploads/${analysis.image}`} 
          alt={analysis.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-bold text-white uppercase tracking-wider">
          {analysis.category || 'Uncategorized'}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-200 mb-2 truncate">{analysis.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1">
          {analysis.aiDescription}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {analysis.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
          {analysis.tags?.length > 3 && (
            <span className="text-xs text-slate-500 px-1 py-1">+{analysis.tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
