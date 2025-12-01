# ArticleForge AI - Deployment Guide

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API key (free tier available)

### 2. Installation

```bash
# Clone or download the project
cd articleforge-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your OpenRouter API key
# Edit .env and add:
# VITE_OPENROUTER_API_KEY=your_key_here
```

### 3. Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### 4. Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to your hosting
```

## 🔑 API Key Setup

### Get OpenRouter API Key

1. Visit [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up or log in
3. Create new API key
4. Copy the key

### Configure Environment

```bash
# .env file
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
```

### Verify Setup

1. Start the app
2. Go to "Single" mode
3. Fill in website details
4. Click "Generate Article"
5. Should generate article successfully

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard
# VITE_OPENROUTER_API_KEY=your_key
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Add environment variable in Netlify dashboard
```

### Option 3: GitHub Pages

```bash
# Update vite.config.ts
# base: '/articleforge-ai/'

# Build
npm run build

# Push dist/ to gh-pages branch
```

### Option 4: Self-Hosted

```bash
# Build
npm run build

# Upload dist/ folder to your server
# Configure web server to serve index.html for all routes
# Add environment variables to your hosting platform
```

## 🔧 Configuration

### Environment Variables

```env
# Required
VITE_OPENROUTER_API_KEY=your_api_key

# Optional (for future features)
VITE_API_BASE_URL=https://openrouter.ai/api/v1
VITE_APP_NAME=ArticleForge AI
```

### Build Configuration

Edit `vite.config.ts` if needed:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/', // Change if deploying to subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true for debugging
  }
})
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Install analyzer
npm install --save-dev vite-plugin-visualizer

# Build with analysis
npm run build

# Check dist/stats.html
```

### Caching Strategy

- Static assets: 1 year cache
- HTML: No cache (always fresh)
- API responses: Browser cache only

### CDN Setup

1. Upload `dist/` to CDN
2. Set cache headers appropriately
3. Use CDN URL in DNS

## 🔒 Security Checklist

- [x] API key in environment variables
- [x] No hardcoded secrets
- [x] HTTPS enabled
- [x] CORS configured
- [x] Input validation
- [x] XSS protection
- [x] CSRF protection

### Security Headers

Add to your web server:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📈 Monitoring

### Error Tracking

Set up error tracking service:
- Sentry
- LogRocket
- Rollbar

### Analytics

Track usage:
- Google Analytics
- Mixpanel
- Amplitude

### Performance Monitoring

Monitor:
- Page load time
- API response time
- Error rate
- User engagement

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### API Key Not Working

1. Verify key is correct
2. Check OpenRouter account status
3. Ensure key has API access
4. Check rate limits

### Articles Not Generating

1. Check browser console for errors
2. Verify API key is set
3. Check internet connection
4. Try with simpler input

### Slow Performance

1. Check network tab in DevTools
2. Verify API response time
3. Check bundle size
4. Enable compression on server

## 🚀 Scaling

### For High Traffic

1. Use CDN for static assets
2. Enable caching headers
3. Optimize images
4. Minify CSS/JS
5. Use service workers

### For Many Users

1. Implement rate limiting
2. Add request queuing
3. Use API caching
4. Monitor API usage
5. Scale API infrastructure

## 📝 Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Check for security updates
- [ ] Monitor error logs
- [ ] Review performance metrics
- [ ] Update documentation

### Backup Strategy

- [ ] Backup source code
- [ ] Backup environment variables
- [ ] Backup user data (if applicable)
- [ ] Test restore procedures

## 🎯 Post-Deployment

### Verification

1. Test all features
2. Verify API integration
3. Check performance
4. Test on mobile
5. Verify exports work

### Optimization

1. Monitor performance
2. Optimize slow endpoints
3. Reduce bundle size
4. Improve caching
5. Enhance UX

### Documentation

1. Update README
2. Document API usage
3. Create user guide
4. Document deployment
5. Create troubleshooting guide

## 📞 Support

### Getting Help

1. Check documentation
2. Review error messages
3. Check browser console
4. Test with sample data
5. Contact support

### Reporting Issues

Include:
- Error message
- Steps to reproduce
- Browser/OS info
- API key status
- Network logs

## 🎉 Success Checklist

- [x] Build successful
- [x] API key configured
- [x] Features tested
- [x] Performance verified
- [x] Security checked
- [x] Documentation complete
- [x] Ready for production

---

## Quick Reference

### Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development
npm run build        # Build for production
npm run preview      # Preview production build
```

### File Structure

```
articleforge-ai/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── pages/          # Page components
│   ├── types.ts        # TypeScript types
│   └── main.tsx        # Entry point
├── dist/               # Production build
├── .env                # Environment variables
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

### Useful Links

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Grok 4.1 Model](https://openrouter.ai/models/x-ai/grok-4.1-fast)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

---

**Version**: 2.0.0
**Last Updated**: 2025
**Status**: Production Ready
