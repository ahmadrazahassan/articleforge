# Quick Setup Guide

## 🚀 Getting Started

### Step 1: Install Dependencies

Run this command to install all required packages (including the OpenAI SDK):

```bash
npm install
```

### Step 2: Get Your OpenRouter API Key

1. Visit [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key

### Step 3: Configure Environment Variables

Open the `.env` file in the root directory and add your API key:

```
VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

⚠️ **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎨 What Changed

### Icons
- ✅ Removed Sparkles and Zap icons
- ✅ Replaced with accurate icons:
  - `PenTool` for logo (writing/article creation)
  - `Wand2` for generate button (AI magic)
  - `Clock` for speed indicator
  - `RotateCcw` for reset button

### Fonts
- ✅ Changed from Inter to **Space Grotesk**
- Modern, geometric sans-serif perfect for brutalist design
- Loaded from Google Fonts
- Weights: 300, 400, 500, 600, 700

### AI Service
- ✅ Integrated OpenRouter API
- ✅ Using `openai/gpt-4o-mini` model
- ✅ Environment variable configuration
- ✅ Mock data fallback for testing without API key
- ✅ Comprehensive error handling

## 🧪 Testing Without API Key

The app will work without an API key and use mock data. You'll see a console warning, but everything else works normally.

## 📝 Model Configuration

Currently using `alibaba/tongyi-deepresearch-30b-a3b:free` with **reasoning enabled** which provides:
- ✅ **Deep Reasoning**: Advanced reasoning capabilities for better content quality
- ✅ **Free Model**: No cost for API calls
- ✅ **Large Context**: 30B parameters for comprehensive articles
- ✅ **Research-Focused**: Optimized for in-depth content generation

You can change the model in `src/services/aiService.ts` line 199:
```typescript
model: 'alibaba/tongyi-deepresearch-30b-a3b:free', // Change to any OpenRouter model
reasoning: { enabled: true } // Enable/disable reasoning
```

Available models: https://openrouter.ai/models

### Why Reasoning?
The reasoning feature allows the AI to think deeply about the content before generating, resulting in:
- More factually accurate articles
- Better structured content
- Improved SEO optimization
- Higher quality research and analysis

## 🎯 Design System

### Colors
- **Primary**: #cafc4f (Lime)
- **Background**: #fafafa (Light gray)
- **Text**: #000000 (Black)

### Brutalist Elements
- **Borders**: 3-4px solid black
- **Shadows**: `shadow-brutal` (8px 8px offset)
- **Hover Effects**: `hover-lift` (translate + shadow)
- **Typography**: Bold, uppercase labels

## 🛠️ Troubleshooting

### "Cannot find module 'openai'"
Run `npm install` - the package isn't installed yet.

### "Property 'env' does not exist"
This is resolved by `src/vite-env.d.ts` which defines the type.

### Mock data is showing
Check that:
1. `.env` file exists
2. API key is set correctly
3. No spaces around the `=` sign
4. Server was restarted after adding the key

### API errors
- Verify your API key is correct
- Check you have credits on OpenRouter
- Review console for specific error messages

## 📚 Next Steps

1. Run `npm install`
2. Add your API key to `.env`
3. Run `npm run dev`
4. Test the generator
5. Customize as needed!

## 💡 Pro Tips

- OpenRouter offers free tier models
- The app validates all AI responses for correct structure
- HTML is sanitized and ready to use
- All SEO fields are optimized for search engines

Happy generating! 🎉
