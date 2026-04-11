# Mindwave Jamaica - Cursor Setup

## Quick Start

1. **Open in Cursor**
   - Open this folder in Cursor IDE
   - Cursor will automatically detect it as a Next.js project

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update with your actual values (Supabase, Resend, etc.)
   - If just previewing, defaults should work

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open browser**
   - Visit http://localhost:3000

## Project Structure

- `app/` - Next.js 14 App Router pages
- `components/` - React components
- `content/` - JSON data (phase packs, products, etc.)
- `public/` - Static assets (images, videos)
- `lib/` - Utility libraries
- `utils/` - Helper functions

## Key Features

- **Phase Packs Marketplace**: Complete with 80+ Jamaica-focused business packs
- **E-commerce**: Product listings and purchase flows
- **Responsive Design**: Tailwind CSS
- **TypeScript**: Full type safety

## Data Files

The site uses two main JSON files:

1. `content/phasePacks.json` - All phase pack metadata
2. `content/packMappings.json` - Pack ID to folder name mapping

These are already populated with all 80+ enhanced packs.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

- **Vercel**: Recommended for Next.js
- **Netlify**: Also works well
- **Static Export**: `npm run export` generates static files

## Notes

- The `.next/` directory is not included (build output)
- `node_modules/` should be installed locally
- All pack content is in separate `pack-deliverables/` directory (not included here)
