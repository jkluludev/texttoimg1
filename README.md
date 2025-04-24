# AI Image Generation Website MVP

## 项目概述
这是一个基于文本生成图片的AI网站MVP版本。用户可以通过输入文本描述来生成图片，所有生成的图片都是临时的，不会在服务器上保存。使用阿里云文生图API作为图片生成引擎，部署在Cloudflare Pages上。

## 技术栈
- **前端**: 
  - React.js (用于构建用户界面)
  - Tailwind CSS (用于样式设计)
  - Vite (用于快速开发和构建)
- **后端**:
  - Cloudflare Functions (用于API代理)
- **AI服务**:
  - 阿里云文生图API (用于图片生成)
- **部署**:
  - Cloudflare Pages (前端 + Functions)

## 功能特点
- 文本到图片的即时生成
- 简洁直观的用户界面
- 无需用户注册/登录
- 临时图片存储（浏览器会话期间）
- 响应式设计，支持移动端

## 实现步骤

### 1. 项目初始化
1. 创建项目目录结构
2. 初始化前端项目（使用Vite + React）
3. 配置开发环境

### 2. 前端开发
1. 创建基本页面布局
   - 首页：包含输入框和生成按钮
   - 结果页：显示生成的图片
2. 实现用户界面组件
   - 文本输入框
   - 生成按钮
   - 加载状态指示器
   - 图片显示区域
3. 添加样式（使用Tailwind CSS）
4. 实现与Cloudflare Functions的通信

### 3. Cloudflare Functions开发
1. 创建API端点
   - POST /api/generate：处理图片生成请求
2. 集成阿里云文生图API
3. 实现错误处理和响应格式化

### 4. 阿里云API集成
1. 注册阿里云账号
2. 开通文生图API服务
3. 获取AccessKey和SecretKey
4. 实现API调用逻辑

## 项目结构
```
texttoimg1/
├── src/
│   ├── components/    # React组件
│   │   ├── TextInput.jsx    # 文本输入组件
│   │   ├── GenerateButton.jsx # 生成按钮组件
│   │   └── ImageDisplay.jsx # 图片显示组件
│   ├── pages/
│   │   ├── Home.jsx        # 首页
│   │   └── Result.jsx      # 结果页
│   ├── functions/          # Cloudflare Functions
│   │   └── generate.js     # 图片生成API
│   └── App.jsx            # 主应用组件
├── public/                # 静态资源
├── package.json          # 项目依赖
└── vite.config.js        # Vite配置
```

## 环境变量配置
### Cloudflare Pages环境变量
```
ALIBABA_ACCESS_KEY=your_access_key
ALIBABA_SECRET_KEY=your_secret_key
ALIBABA_ENDPOINT=your_endpoint
```

## 开发指南
1. 克隆项目
2. 安装依赖
   ```bash
   npm install
   ```
3. 配置环境变量
4. 启动开发服务器
   ```bash
   npm run dev
   ```

## 阿里云API调用示例
```javascript
// functions/generate.js
export async function onRequestPost(context) {
  const { text } = await context.request.json();
  
  const client = new AlibabaCloudClient({
    accessKeyId: context.env.ALIBABA_ACCESS_KEY,
    accessKeySecret: context.env.ALIBABA_SECRET_KEY,
    endpoint: context.env.ALIBABA_ENDPOINT
  });

  const response = await client.request('GenerateImage', {
    text: text,
    // 其他参数...
  });

  return new Response(JSON.stringify(response));
}
```

## 注意事项
- 确保阿里云API密钥安全，不要提交到版本控制
- 实现适当的错误处理和用户反馈
- 考虑添加请求限制以防止滥用
- 确保生成的图片在用户会话结束后自动清除
- 注意阿里云API的调用限制和费用

## 后续优化方向
1. 添加图片编辑功能
2. 实现图片风格选择
3. 添加图片尺寸选项
4. 优化生成速度和性能
5. 添加更多的图片生成模型选项 