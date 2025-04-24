import React from 'react';

const GenerateButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full px-6 py-3 text-white font-semibold rounded-lg ${
        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
      } transition-colors duration-200`}
    >
      {loading ? '生成中...' : '生成图片'}
    </button>
  );
};

export default GenerateButton; 