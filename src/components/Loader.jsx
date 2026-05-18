import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3 text-indigo-400">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loader;
