import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import GenerateButton from '../components/GenerateButton';
import ImageDisplay from '../components/ImageDisplay';

const Home = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('生成图片时出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI 图片生成器</h1>
          <p className="mt-2 text-gray-600">输入描述，让AI为你生成图片</p>
        </div>
        
        <div className="space-y-6">
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入图片描述..."
          />
          
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
          />
          
          <ImageDisplay
            imageUrl={imageUrl}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home; 