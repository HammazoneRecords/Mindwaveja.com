# MindWave Jamaica

A Jamaican Engine for Innovation. Ideas to Income. Guidance to Growth.

## Overview

MindWave Jamaica is a business development platform that helps transform ideas into operational businesses. This MVP website includes:

- **Services**: Four Wave packages from idea refinement to business scaling
- **Phase Packs**: Complete business blueprints with scoring system and progression paths
- **Store**: Templates, guides, and tools for entrepreneurs
- **Payment System**: Bank transfer checkout with receipt generation
- **Intake System**: Multi-step form with localStorage-based receipt generation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data**: Local JSON files (no backend required)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3005`

## Project Structure

```
mindwaveja.com/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── services/          # Services page
│   ├── phase-packs/       # Phase Packs listing and detail
│   ├── store/             # Store listing and detail
│   ├── intake/            # Multi-step intake form
│   ├── community/         # Coming soon page
│   ├── learn/             # Coming soon page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── legal/             # Privacy and Terms pages
├── components/            # React components
│   ├── home/             # Home page sections
│   ├── services/         # Services page components
│   ├── phase-packs/      # Phase Packs components
│   ├── store/            # Store components
│   ├── intake/           # Intake form components
│   ├── about/            # About page components
│   ├── contact/          # Contact page components
│   └── [shared]          # Shared UI components
├── content/              # JSON data files
│   ├── services.json     # Wave packages data
│   ├── phasePacks.json   # Phase Packs data (12 starter packs with scores & ladders)
│   ├── products.json     # Store products data
│   ├── payment.json      # Bank transfer payment configuration
│   └── faqs.json         # FAQ data
├── lib/                  # Type definitions
│   └── types.ts          # TypeScript interfaces
├── utils/                # Utility functions
│   ├── slug.ts           # URL slug helpers
│   └── format.ts         # Formatting helpers
└── public/               # Static assets
    └── [hero media]      # Place hero.mp4 or hero.gif here
```

## Hero Animation Setup

The hero section supports multiple media formats with automatic detection:

### Adding Your Hero Animation

1. **For MP4 Video** (recommended):
   - Place your video at `/public/hero.mp4`
   - The component will automatically detect and use it

2. **For GIF**:
   - Place your GIF at `/public/hero.gif`
   - Used if MP4 is not present

3. **For Lottie Animation** (future):
   - Place your Lottie JSON at `/public/hero.json`
   - Requires adding `lottie-react` package and updating `HeroRevealPlaceholder.tsx`

4. **For Rive Animation** (future):
   - Place your Rive file at `/public/hero.riv`
   - Requires adding `@rive-app/react-canvas` package and updating `HeroRevealPlaceholder.tsx`

The component includes:
- Automatic media type detection
- Reduced motion support for accessibility
- Fallback SVG placeholder animation
- Fog overlay gradient

## Content Editing

### Services (Wave Packages)

Edit `/content/services.json` to modify:
- Package names and descriptions
- Pricing
- Who it's for
- Outputs/deliverables

### Phase Packs

Edit `/content/phasePacks.json` to:
- Add new Phase Packs
- Modify existing pack details
- Update the 10-section anatomy for each pack
- Adjust pack scores and progression ladders

Phase Pack Anatomy sections:
1. What this is
2. What you need
3. First 7 actions
4. Waiting-time tasks
5. Starter folder contents
6. Value-add menu
7. Sales mode
8. Daily minimum
9. Common failure points
10. Exit/expand paths

**Pack Score System** (1-5 scale):
- `demandScore`: Market demand (5 = very high)
- `capitalDifficulty`: Capital required (1 = very easy, 5 = very hard)
- `timeToFirstSale`: Speed to first sale (5 = fastest, 1-7 days)
- `skillRequired`: Skill level needed (1 = beginner, 5 = expert)

**Pack Ladder**: Recommended next packs for business progression

**Pack Index**: Category tags and recommended user types

See `/SpineLinks/pack-scores-reference.md` for detailed scoring logic.

### Store Products

Edit `/content/products.json` to:
- Add new products
- Modify categories and tags
- Update pricing and features

### FAQs

Edit `/content/faqs.json` to add or modify frequently asked questions.

## Payment System

### Bank Transfer Checkout

Since Stripe is not available in Jamaica, the site uses a temporary bank transfer payment flow:

**How it works:**
1. User clicks "Purchase" on a Phase Pack or Store Product
2. Bank transfer details are displayed (Scotia account)
3. User fills in their info and transfer reference
4. System generates a payment receipt (JSON) with unique receipt ID
5. Receipt is saved to localStorage and downloadable
6. User can copy a WhatsApp/email message to confirm payment

**Configuration:**
Edit `/content/payment.json` to update:
- Bank account details
- Account holder name
- Branch information
- Contact email/WhatsApp for confirmations

**Receipt Storage:**
- Receipts are stored in browser localStorage under `mindwave_receipts`
- Each receipt has status: `PENDING_BANK_TRANSFER`
- Receipt ID format: `MW-{timestamp}-{random}`

**Future Enhancement:**
Replace with proper payment gateway when business bank account is established.

## Intake Form

The intake form:
- Supports pre-filling via URL parameters:
  - `/intake?service=spark-session`
  - `/intake?pack=cluster-lash-starter`
  - `/intake?product=business-plan-template`
- Saves submissions to localStorage
- Generates downloadable JSON receipts
- Multi-step flow with progress tracking

## Styling & Dark Mode

The design system uses:
- **Colors**: Cream/charcoal with red/green brand accents
- **Typography**: Outfit (sans) and Playfair Display (display)
- **Spacing**: Consistent padding scale
- **Corners**: 2xl-4xl rounded corners
- **Effects**: Subtle glass morphism and glow effects
- **Dark Mode**: Polarized contrast flip with CSS variables

### Dark Mode

**Features**:
- Automatic system preference detection
- Manual toggle in NavBar
- Smooth 200ms transitions
- WCAG AAA contrast ratios
- No FOUC (Flash of Unstyled Content)
- localStorage persistence

**Usage**:
```tsx
// Use CSS variables for theme-aware styling
<div style={{
  backgroundColor: 'rgb(var(--color-bg-primary))',
  color: 'rgb(var(--color-text-primary))',
}}>
```

**Or use utility classes**:
```tsx
<div className="bg-primary text-primary border-primary">
```

See `/SpineLinks/dark-mode-implementation.md` for full documentation.

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` respected
- Good color contrast ratios

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Payment processing
- [ ] Email notifications
- [ ] CMS integration
- [ ] Analytics dashboard

## License

Proprietary - MindWave Jamaica

---

Built for Jamaican entrepreneurs.
