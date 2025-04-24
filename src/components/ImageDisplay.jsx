import React from 'react';

const ImageDisplay = ({ imageUrl, loading }) => {
  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">生成的图片将显示在这里</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <img
        src={imageUrl}
        alt="Generated"
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImageDisplay; 