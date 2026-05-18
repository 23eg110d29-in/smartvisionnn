import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import Loader from './Loader';

const UploadBox = ({ onUpload, isUploading }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: isUploading
  });

  return (
    <div className="glass-panel p-6 mb-8 w-full">
      <h2 className="text-xl font-semibold mb-4 text-slate-200">Analyze New Image</h2>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <Loader message="AI is analyzing your image..." />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-slate-800 rounded-full">
              <UploadCloud className="w-10 h-10 text-slate-400" />
            </div>
            <div>
              <p className="text-slate-300 font-medium text-lg">Drag & drop an image here</p>
              <p className="text-sm text-slate-500 mt-1">or click to browse from your device</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
