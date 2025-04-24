import Core from '@alicloud/pop-core';

export async function onRequest(context) {
  try {
    // 从环境变量获取阿里云凭证
    const accessKeyId = context.env.ALIBABA_ACCESS_KEY;
    const accessKeySecret = context.env.ALIBABA_SECRET_KEY;
    
    if (!accessKeyId || !accessKeySecret) {
      return new Response(JSON.stringify({
        error: 'Missing Aliyun credentials'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 创建阿里云客户端
    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://aiwork.cn-shanghai.aliyuncs.com',
      apiVersion: '2021-11-19'
    });

    // 获取请求体
    const requestData = await context.request.json();
    const { prompt } = requestData;

    if (!prompt) {
      return new Response(JSON.stringify({
        error: 'Prompt is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 调用阿里云文生图API
    const result = await client.request('GenerateImage', {
      RegionId: 'cn-shanghai',
      Tasks: [{
        Text: prompt
      }]
    }, {
      method: 'POST'
    });

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message || 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
} 