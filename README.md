# ArticleForge AI - Advanced Content Generation Platform

A production-grade, AI-powered article generation platform with bulk operations, advanced export options, SEO analysis, and comprehensive content management. Built with React, TypeScript, and Vite.

## 🚀 Key Features

### 🎯 2025 Advanced Generation Modes

#### 1. Smart Paste Generator (NEW!)
- **Paste 50-200 websites at once** - Any format supported!
- **Intelligent Parser**: Automatically detects CSV, JSON, tab-separated, or plain text
- **Format Flexibility**: Works with mixed formats, separators (-, :, |), or simple lists
- **Instant Validation**: Shows valid/invalid entries with helpful error messages
- **Bulk Settings**: Apply article type, length, tone to all entries at once
- **Preview Before Generate**: Review all parsed data before processing

#### 2. AI Category Generator (NEW!)
- **Just specify categories** - AI creates unique articles every time!
- **Fresh Content Guaranteed**: Every generation produces completely different articles
- **2025-Aware**: Uses current trends, technologies, and best practices
- **Multiple Categories**: Generate 5-50 articles per category simultaneously
- **Smart Diversity**: AI ensures varied angles, audiences, and approaches
- **Quick Select**: 20+ popular categories ready to use
- **Zero Duplication**: Advanced algorithms ensure unique content every run

### Core Generation
- **Single Article Generation**: Create high-quality, SEO-optimized articles with advanced customization
- **Manual Bulk Generation**: Add items one by one with full control
- **Smart Templates**: Save and reuse configurations for consistent content creation
- **Multi-language Support**: Generate content in English, Spanish, French, German, Italian, and Portuguese

### Advanced Customization
- **8 Article Types**: Review, Guide, About, Tool Overview, Listicle, Comparison, Tutorial, News
- **4 Length Options**: Short (2-3k), Medium (3.5-5k), Long (5.5-8k), Extra Long (8-12k words)
- **6 Tone Styles**: Professional, Neutral, Friendly, Authoritative, Conversational, Technical
- **Custom Keywords**: Add specific keywords for targeted SEO optimization
- **Target Audience**: Specify your audience for tailored content
- **Content Options**: Include comparison tables, image placeholders, and data visualizations

### Export & Integration
- **Multiple Export Formats**:
  - **HTML5**: Clean, semantic markup ready for any CMS
  - **Markdown**: Perfect for documentation and GitHub
  - **JSON**: Structured data for custom integrations
  - **WordPress XML**: Direct import to WordPress sites
  - **PDF-Ready HTML**: Print-optimized with proper styling
- **Bulk Export**: Export multiple articles at once in any format
- **One-Click Download**: Quick export directly from results view

### Content Management
- **Article Library**: Browse, search, and filter all generated articles
- **Advanced Search**: Find articles by title, category, or tags
- **Category Filtering**: Organize content by category
- **Sorting Options**: Sort by date, title, or SEO score
- **Batch Operations**: Select multiple articles for bulk export or deletion
- **Local Storage**: All articles saved automatically in browser
- **Article History**: Track all generated content with timestamps

### SEO & Analytics
- **SEO Score Analysis**: Comprehensive SEO scoring (0-100)
- **Real-time Feedback**: Issues, suggestions, and strengths
- **Metrics Dashboard**: Word count, reading time, keyword density
- **Optimization Tips**: Actionable recommendations for improvement
- **Focus Keywords**: Strategic keyword suggestions with LSI terms
- **Meta Analysis**: Title length, description quality, heading structure

### User Experience
- **Brutalist Design**: Modern, bold, and distinctive UI
- **Responsive Layout**: Works perfectly on all devices
- **Real-time Progress**: Live updates during bulk generation
- **Error Handling**: Graceful error messages and recovery
- **Keyboard Shortcuts**: Quick keyword entry with Enter key
- **Visual Feedback**: Clear status indicators and animations

## 📦 What Gets Generated

For each article request, the app generates:

- **Complete HTML Article**: Full semantic HTML5 document (2,000-12,000 words)
- **SEO Title**: Optimized title with power words (50-65 characters)
- **Category**: Best-fit category for the content
- **Tags**: 10-15 highly relevant tags including long-tail variations
- **Meta Description**: Persuasive description with CTA (150-160 characters)
- **Slug**: SEO-optimized URL slug
- **Focus Keywords**: 5-7 strategically chosen keywords
- **SEO Score**: Comprehensive analysis with actionable feedback
- **Word Count**: Accurate word count for content planning
- **Reading Time**: Estimated reading time for user experience

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenRouter API Key

This app uses OpenRouter to access AI models. Get your API key at [openrouter.ai/keys](https://openrouter.ai/keys).

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your API key:
```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Important**: Real AI generation requires a valid OpenRouter API key. The app will show an error if no key is provided.

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Single Article Generation

1. **Enter Website Details**: Provide your website name and detailed description
2. **Choose Article Type**: Select from 8 different article formats
3. **Set Parameters**: Configure length, tone, and language
4. **Add Keywords** (Optional): Include custom keywords for SEO targeting
5. **Specify Audience** (Optional): Define your target audience
6. **Generate**: Click "Generate Article" and wait for AI processing
7. **Review Results**: View HTML, SEO metadata, and analysis
8. **Export**: Download in your preferred format or copy to clipboard

### Smart Paste Generation (FASTEST!)

1. **Switch to Smart Paste**: Click "Smart Paste" in the mode switcher
2. **Prepare Your Data**: Copy 50-200 websites from Excel, CSV, or any text source
3. **Paste**: Paste into the text area (supports any format!)
4. **Parse**: Click "Parse Data" - AI automatically detects format
5. **Configure**: Set default article type, length, tone for all
6. **Preview**: Review parsed data (shows first 10)
7. **Generate**: Click "Generate X Articles" - done!

**Supported Formats:**
```
CSV: Name,Description
Tab: Name    Description
Separator: Name - Description
JSON: [{"websiteName": "...", "websiteDescription": "..."}]
Simple: Just names (AI generates descriptions)
```

### AI Category Generation (SMARTEST!)

1. **Switch to AI Category**: Click "AI Category" in the mode switcher
2. **Quick Select**: Choose from 20+ popular categories OR enter custom
3. **Set Count**: Specify how many articles per category (1-50)
4. **Configure**: Set article type, length, tone, audience
5. **Generate Ideas**: AI creates unique article concepts with descriptions
6. **Review**: Preview all generated ideas
7. **Generate All**: One click to generate all articles!

**Example Categories:**
- Technology, Business, Health, Finance, Marketing
- E-commerce, Education, Travel, Food, Lifestyle
- Real Estate, Cryptocurrency, AI, Cybersecurity
- And 10+ more!

### Manual Bulk Generation

1. **Switch to Manual Bulk**: Click "Manual Bulk" in the mode switcher
2. **Add Items**: Click "Add Item" to create multiple generation requests
3. **Fill Details**: Enter website name and description for each item
4. **Configure Each**: Set article type and length per item
5. **Import CSV** (Optional): Upload a CSV file with bulk data
6. **Generate All**: Click "Generate X Articles" to start batch processing
7. **Monitor Progress**: Watch real-time progress bar and status
8. **Review Library**: All articles automatically saved to library

### Article Library

1. **Browse Articles**: View all generated articles with metadata
2. **Search**: Use the search bar to find specific articles
3. **Filter**: Filter by category or sort by date/title/score
4. **Select Multiple**: Check boxes to select articles for batch operations
5. **Bulk Export**: Export selected articles in any format
6. **View Details**: Click "View" to see full article and SEO analysis
7. **Delete**: Remove unwanted articles individually or in bulk

### Export Options

- **HTML**: Clean HTML5 for any CMS or static site
- **Markdown**: For GitHub, documentation, or Markdown-based CMSs
- **JSON**: Structured data for custom integrations or APIs
- **WordPress XML**: Import directly into WordPress (draft status)
- **PDF-Ready**: Print-optimized HTML with proper styling

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Top navigation
│   ├── Hero.tsx                # Hero section with CTA
│   ├── GeneratorForm.tsx       # Main form with advanced options
│   ├── ResultsTabs.tsx         # Tabbed results display
│   ├── BulkGenerator.tsx       # Bulk generation interface
│   ├── ArticleLibrary.tsx      # Article management and search
│   ├── ExportModal.tsx         # Export format selection
│   ├── SEOAnalyzer.tsx         # SEO score and recommendations
│   ├── HowItWorks.tsx          # How it works section
│   ├── FAQ.tsx                 # FAQ accordion
│   └── Footer.tsx              # Footer
├── services/
│   ├── aiService.ts            # AI API integration and prompts
│   ├── storageService.ts       # Local storage management
│   ├── exportService.ts        # Export format conversions
│   └── seoService.ts           # SEO analysis engine
├── pages/
│   └── HomePage.tsx            # Main page with mode switching
├── types.ts                    # TypeScript type definitions
├── App.tsx                     # Main app component
├── Router.tsx                  # React Router setup
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🎨 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **AI**: OpenRouter API (Alibaba Tongyi Deep Research 30B)
- **Routing**: React Router DOM 6
- **Font**: Space Grotesk (Google Fonts)
- **Storage**: Browser LocalStorage API

## 🎨 Design System

### Neo-Brutalism Aesthetic
- **Primary Color**: #cafc4f (Lime accent)
- **Background**: #fafafa (Light gray)
- **Text**: #000000 (Pure black)
- **Font**: Space Grotesk (300-700 weights)
- **Borders**: 3-4px solid black throughout
- **Shadows**: Brutalist offset shadows (8px/8px)
- **No gradients**: Solid colors only
- **Typography**: Bold, uppercase labels and black weight headings
- **Interactions**: Hover lifts and color transitions

## 🔧 Customization

### Adding More Languages

Edit `src/types.ts`:

```typescript
export type Language = 'english' | 'spanish' | 'french' | 'your-language';
```

Update the dropdown in `GeneratorForm.tsx` and add language support in `aiService.ts`.

### Adding Article Types

Edit `src/types.ts`:

```typescript
export type ArticleType = 'review' | 'guide' | 'your-type';
```

Update the form dropdown and add type mapping in `aiService.ts`.

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#your-color',
}
```

### Custom Export Formats

Add new export methods in `src/services/exportService.ts`:

```typescript
private static convertToYourFormat(article: GeneratedArticle): string {
  // Your conversion logic
}
```

## 📊 SEO Analysis Features

The built-in SEO analyzer checks:

- ✅ Title length optimization (30-60 characters)
- ✅ Meta description length (120-160 characters)
- ✅ Focus keyword count (3-7 recommended)
- ✅ Tag optimization (5-15 tags)
- ✅ Content length (minimum 1000 words)
- ✅ Heading structure (H1, H2, H3 hierarchy)
- ✅ Keyword placement (title, description, content)
- ✅ Word count and reading time calculation

## 🚀 Performance

- **Fast Generation**: Optimized AI prompts for quick responses
- **Efficient Storage**: Compressed local storage with smart caching
- **Lazy Loading**: Components loaded on demand
- **Optimized Build**: Vite's production build with code splitting
- **Responsive UI**: Smooth animations and transitions

## 🔒 Privacy & Data

- **Local Storage**: All articles stored in your browser
- **No Server**: No backend server, all processing client-side
- **API Security**: API key stored in environment variables
- **No Tracking**: No analytics or tracking scripts

## 📝 CSV Import Format

For bulk generation, use this CSV format:

```csv
websiteName,websiteDescription,articleType,articleLength,toneOfVoice
My Tech Blog,Technology reviews and tutorials,guide,medium,professional
Fitness Site,Health and fitness tips,listicle,short,friendly
```

## 🐛 Troubleshooting

### API Key Issues
- Ensure your OpenRouter API key is valid
- Check that `.env` file is in the root directory
- Restart the dev server after adding the key

### Generation Errors
- Check your internet connection
- Verify API key has sufficient credits
- Try reducing article length or simplifying description

### Storage Issues
- Clear browser cache if articles aren't saving
- Check browser storage limits (usually 5-10MB)
- Export important articles before clearing storage

## 🎯 Best Practices

1. **Be Specific**: Provide detailed website descriptions for better results
2. **Use Keywords**: Add custom keywords for targeted SEO
3. **Define Audience**: Specify target audience for tailored content
4. **Review SEO Score**: Check and improve based on recommendations
5. **Export Regularly**: Download important articles as backup
6. **Organize Library**: Use categories and tags for easy management

## 📄 License

This project is ready for personal or commercial use. Customize as needed!

## 🤝 Contributing

Feel free to fork, modify, and enhance this project. Some ideas:

- Add more export formats (AMP, Medium, etc.)
- Implement cloud storage sync
- Add AI-powered image generation
- Create content calendar/scheduler
- Add team collaboration features
- Implement version control for articles

## 📞 Support

For issues or questions:
1. Check the FAQ section in the app
2. Review the code comments
3. Check OpenRouter API documentation
4. Review browser console for errors

---

Built with ❤️ using React, TypeScript, and AI
