import { AlibabaCloudClient } from '@alicloud/pop-core';

export async function onRequestPost(context) {
  try {
    const { text } = await context.request.json();
    
    if (!text) {
      return new Response(JSON.stringify({ error: '请输入描述文本' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = new AlibabaCloudClient({
      accessKeyId: context.env.ALIBABA_ACCESS_KEY,
      accessKeySecret: context.env.ALIBABA_SECRET_KEY,
      endpoint: context.env.ALIBABA_ENDPOINT,
    });

    const response = await client.request('GenerateImage', {
      text: text,
      // 可以根据需要添加其他参数
      style: 'realistic',
      size: '1024x1024',
    });

    return new Response(JSON.stringify({
      imageUrl: response.imageUrl,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate function:', error);
    return new Response(JSON.stringify({ 
      error: '生成图片时出错，请重试' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 