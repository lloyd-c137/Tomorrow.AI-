# Sci-Demo Hub (科学演示集市)

Sci-Demo Hub 是一个双语（中/英）高端教育平台，专为交互式科学演示而设计。它具有“数字实验室”的美学风格、用于物理/数学模拟的代码沙盒以及 AI 助手框架。

## 🚀 快速开始

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **运行开发服务器**
    ```bash
    npm run dev
    ```

---

## 🤖 AI 集成指南（如何切换到 OpenAI）

目前项目在 `services/geminiService.ts` 中包含一个用于 AI 交互的占位符框架。UI 组件 (`App.tsx`) 已经配置好发送提示词和上下文到该服务并显示结果。

要集成 **OpenAI (或任何兼容 OpenAI 格式的 API)**，请遵循以下步骤：

### 1. 定位服务文件
打开文件：`services/geminiService.ts`

### 2. 更新实现代码
用标准的 OpenAI `fetch` 逻辑替换 `GeminiService` 的现有内容。

**将下面的代码复制并粘贴到 `services/geminiService.ts` 中：**

```typescript
// services/geminiService.ts

// 注意：理想情况下，请将密钥存储在环境变量中（例如 process.env.OPENAI_API_KEY）
const API_KEY = "sk-YOUR-OPENAI-API-KEY-HERE"; 
const API_URL = "https://api.openai.com/v1/chat/completions";

export const GeminiService = {
  chat: async (prompt: string, context?: string): Promise<string> => {
    
    // 1. 根据上下文构建系统提示词 (System Prompt)
    const systemInstruction = context 
      ? `You are an expert science educator in the 'Sci-Demo Hub'. The user is currently viewing a demo with the following context: ${context}. Answer briefly and accurately.`
      : `You are an expert science educator. Help users find demos, explain concepts, or write code for scientific visualizations.`;

    try {
      // 2. 调用 OpenAI API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o", // 或者 "gpt-3.5-turbo"
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // 3. 返回文本内容
      return data.choices[0]?.message?.content || "No response generated.";

    } catch (error) {
      console.error("AI Service Error:", error);
      return "Sorry, I cannot connect to the AI service at the moment.";
    }
  }
};
```

### 3. 关键参数解释

*   **`model`**: 根据您的预算或需求，更改为 `gpt-4o` 或 `gpt-3.5-turbo`。
*   **`messages`**: OpenAI 使用消息列表结构。我们将代码中的 `context`（上下文）映射到 `system` 角色，将用户的输入映射到 `user` 角色。
*   **`Authorization`**: 请确保您的 API Key 是有效的。

### 4. (可选) 使用自定义端点 (Custom Endpoint)
如果您使用的是本地大模型（如 Ollama）或模仿 OpenAI 格式的第三方代理服务：
1.  将 `API_URL` 更改为您的端点地址（例如 `http://localhost:11434/v1/chat/completions`）。
2.  将 `API_KEY` 更改为代理服务所需的任何内容（如果不需要鉴权，则留空）。

---

## 📂 项目结构

*   **`App.tsx`**: 主 UI 逻辑，处理“探索 (Explore)”、“上传 (Upload)”和“管理 (Admin)”视图之间的路由切换。
*   **`constants.ts`**: 包含所有文本翻译 (EN/CN) 和初始演示数据 (Seed Demos)。
*   **`services/storageService.ts`**: 处理演示数据的 LocalStorage 本地持久化。
*   **`services/geminiService.ts`**: AI 聊天的接口文件。**(请修改此处以集成真实的 AI 能力)**。

## 🎨 样式设计
本项目使用 **Tailwind CSS** 进行样式设计，并使用 **Framer Motion** 制作流畅的过渡动画。设计语言遵循适合科学工具的简洁“玻璃拟态 (Glassmorphism)”风格。
