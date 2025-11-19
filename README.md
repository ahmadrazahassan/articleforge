# ArticleForge AI

A modern, brutalist-inspired single-page React application that generates long-form SEO articles powered by AI.

## Features

- 🎨 **Neo-Brutalist Design**: Bold borders, strong shadows, striking typography
- 🤖 **OpenRouter AI**: Powered by GPT models via OpenRouter API
- 📝 **Complete Generation**: Creates full HTML articles with SEO metadata
- 🔧 **Customizable**: Choose article type, length, tone, and language
- 📋 **Easy Copy**: One-click copying of HTML and SEO details
- 📱 **Responsive**: Works perfectly on desktop and mobile
- ⚡ **Fast**: Built with Vite for optimal performance

## What Gets Generated

For each article request, the app generates:

- **Complete HTML Article**: Full `<html>` document ready to paste
- **SEO Title**: Optimized title (50-60 characters)
- **Category**: Best-fit category for the content
- **Tags**: 5-12 relevant tags
- **Meta Description**: SEO-friendly description (150-160 characters)
- **Slug**: Clean URL slug
- **Focus Keywords**: 3-5 main keywords

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenRouter API Key

This app uses OpenRouter to access AI models. Get your free API key at [openrouter.ai/keys](https://openrouter.ai/keys).

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your API key:
```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Note**: The app includes mock data fallback, so you can test it without an API key. However, real AI generation requires a valid OpenRouter API key.

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Environment Variables

- `VITE_OPENROUTER_API_KEY` - Your OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai))

The app will use mock data if no API key is provided, allowing you to test the interface without configuration.

## Usage

1. **Enter Website Details**: Provide your website name and description
2. **Choose Settings**: Select article type, length, tone, and language
3. **Generate**: Click the "Generate Article" button
4. **Copy & Use**: Copy the HTML and SEO metadata to your blog or CMS

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: OpenRouter API (Alibaba Tongyi Deep Research 30B) with reasoning enabled
- **Font**: Space Grotesk (Google Fonts)

## Design Specifications

- **Style**: Neo-Brutalism / Modern Brutalist
- **Primary Color**: #cafc4f (Lime accent)
- **Background**: #fafafa (Light gray)
- **Text**: #000000 (Pure black)
- **Font**: Space Grotesk (300-700 weights)
- **Borders**: 3-4px solid black throughout
- **Shadows**: Brutalist offset shadows (8px/8px)
- **No gradients**: Solid colors only
- **Typography**: Bold, uppercase labels and black weight headings

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation
│   ├── Hero.tsx            # Hero section with CTA
│   ├── GeneratorForm.tsx   # Main form for inputs
│   ├── ResultsTabs.tsx     # Tabbed results display
│   ├── HowItWorks.tsx      # How it works section
│   ├── FAQ.tsx             # FAQ accordion
│   └── Footer.tsx          # Footer
├── services/
│   └── aiService.ts        # AI API integration
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Features Breakdown

### Generator Form
- Website name input
- Website description textarea
- Article type dropdown (Review, Guide, About, Tool Overview)
- Article length dropdown (Short, Medium, Long)
- Tone of voice dropdown (Professional, Neutral, Friendly)
- Language dropdown (currently English)
- Generate and Reset buttons

### Results Display
- **Article HTML Tab**: Full HTML code with copy button
- **SEO Details Tab**: All metadata with individual copy buttons

### Additional Sections
- **How It Works**: 4-step process explanation
- **FAQ**: Common questions with smooth accordion
- **Responsive Navigation**: Smooth scroll to sections

## Customization

### Adding More Languages

Edit `src/types.ts` to add more language options:

```typescript
export type Language = 'english' | 'spanish' | 'french';
```

Then update the dropdown in `GeneratorForm.tsx`.

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#your-color',
  // ...
}
```

### Modifying Article Types

Add more types in `src/types.ts` and update the form dropdown.

## License

This project is ready for personal or commercial use. Customize as needed!

## Support

For issues or questions, check the FAQ section in the app or review the code comments.
