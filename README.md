# Typing Sonoma 🎹

A fun and interactive typing tutorial game designed to help children learn keyboard skills through engaging lessons and colorful animations.

## Features

- **Interactive Lessons**: Progressive typing lessons from basic keys to full sentences
- **Kid-Friendly Design**: Colorful interface with emojis and animations
- **Progress Tracking**: Local storage keeps track of completed lessons and statistics
- **Responsive Design**: Works on desktop and tablet devices

## Deployment

This app is automatically deployed to GitHub Pages via GitHub Actions. The live site is available at:

**🌐 https://cristy-the-one.github.io/typing_sonoma**

### Deployment Details

- **Deployment Method**: GitHub Actions workflow (`.github/workflows/pages.yml`)
- **Build System**: Create React App with TypeScript
- **SPA Support**: Includes 404.html fallback for client-side routing
- **Triggers**: 
  - Automatic deployment on push to `main` branch
  - PR preview deployments for pull requests targeting `main`
  - Manual deployment via workflow dispatch

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Technologies Used

- React 18 with TypeScript
- Create React App
- CSS3 with custom animations
- Local Storage for persistence