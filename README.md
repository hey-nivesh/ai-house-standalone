# AI House Standalone Website

This is a standalone Next.js website for AI House, separate from the main HiDevs landing page.

## Getting Started

1. Install dependencies:
   ```bash
   cd ai-house-standalone
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: Main AI House page with lazy loading and optimizations
- `src/components/`: Reusable components (PartneredWith, LearningPlatformUI, etc.)
- `public/ai-house/`: Images for the AI House page
- `tailwind.config.ts`: Customized Tailwind configuration

## Features

- **Optimized Performance**: Lazy loading of heavy components, Next.js dynamic imports
- **Smooth Scrolling**: Passive scroll listeners, optimized CSS
- **Responsive Design**: Fully responsive navigation and layout
- **Styling**: Styled-components + Tailwind CSS hybrid approach

## Color Theme

- Primary: `#724e99` (Purple)
- Background: White / Light Gray gradients
