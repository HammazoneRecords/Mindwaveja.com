// Service Package Types
export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceMultiplier: number;
  priceAdd?: number;
}

export interface ServicePackage {
  id: string;
  slug: string;
  wave: number;
  name: string;
  subtitle: string;
  description: string;
  whoItsFor: string[];
  outputs: string[];
  basePrice: number;
  price: string;
  priceNote?: string;
  duration: string;
  featured?: boolean;
  includedExplainerVideos: number;
  additionalVideoPrice: number;
  deliveryOptions: DeliveryOption[];
}

// Phase Pack Types
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type PackCategory = 
  | 'Beauty' 
  | 'Food' 
  | 'Services' 
  | 'Digital' 
  | 'Retail' 
  | 'Events' 
  | 'Agriculture';

export type PackScore = {
  demandScore: number;
  capitalDifficulty?: number;
  timeToFirstSale: number;
  skillRequired?: number;
  packLadder?: string;
};

export type PackLadder = {
  nextPacks: string[]; // list of pack IDs
  reason: string;
};

export type PackIndex = {
  categoryTags: string[];
  recommendedFor: string[]; // e.g. ["students", "low-capital", "weekend-hustle"]
};

export interface RuralPositioning {
  bestParishes: string[];
  supplyAdvantage: string;
  marketEntry: string;
  coldChainSolution?: string;
  premiumOpportunity?: string;
  transportNote?: string;
  communityEntry?: string;
}

export interface DailyMinimumDetail {
  description: string;
  weeklyProductionTarget?: string;
  weeklyRevenueTarget?: string;
  monthOneProjection?: string;
  monthThreeProjection?: string;
  keyRule?: string;
  dailyTarget?: string;
  weeklyTarget?: string;
}

export interface PhasePack {
  id: string;
  slug: string;
  name: string;
  category: PackCategory;
  capitalRange: {
    min: number;
    max: number;
    currency: string;
  };
  timeToFirstSale: string;
  skillLevel: SkillLevel;
  description: string;
  featured?: boolean;
  price?: number; // JMD — 0 = free, >0 = premium
  zip?: string;

  // Phase Pack Anatomy
  whatThisIs: string;
  whoThisIsNotFor?: string;
  whatYouNeed: string[];
  firstSevenActions: string[];
  waitingTimeTasks: string[];
  starterFolderContents: string[];
  valueAddMenu?: string[];
  salesMode: string;
  dailyMinimum: string | DailyMinimumDetail;
  commonFailurePoints: string[];
  ethicalCommunityRules?: string[];
  exitExpandPaths: string[];

  // Rural variant
  ruralVariant?: boolean;
  ruralPositioning?: RuralPositioning;

  // Pack Score & Progression
  packScore?: PackScore;
  packLadder?: PackLadder;
  packIndex?: PackIndex;

  // Quality fields
  invariantScore?: number;
  prePack?: {
    label: string;
    skills: string[];
    minimumEquipment?: string[];
  };
  executionTest?: {
    status: string;
    profile: string;
    sequence: string;
    firstSale: string;
    netProfit: string;
    monthOneProjection?: string;
  };
}

// Store Product Types
export type ProductCategory =
  | 'Templates'
  | 'Guides'
  | 'Reports'
  | 'Creativity Tools'
  | 'AI Plugins'
  | 'Books'
  | 'Apps'
  | 'Licenses';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tags: string[];
  description: string;
  price: string;
  priceNote?: string;
  features: string[];
  included: string[];
  featured?: boolean;
  comingSoon?: boolean;
  availableDate?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Intake Form Types
export type IntakePath = 'service' | 'phase-pack' | 'store-product' | 'just-an-idea';

export interface IntakeFormData {
  // Step 1
  path: IntakePath;
  selectedItem?: string;
  
  // Step 2
  ideaDescription: string;
  budget: string;
  timeline: string;
  skills: string;
  location: string;
  
  // Step 3
  name: string;
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export interface Receipt {
  receipt_id: string;
  timestamp: string;
  selected_path: IntakePath;
  payload: IntakeFormData;
}

// Payment Types
export type ItemType = 'product' | 'phasePack';

export interface PaymentIntent {
  receipt_id: string;
  timestamp: string;
  item_type: ItemType;
  item_id: string;
  item_name: string;
  amount_jmd: number | string;
  payer_name: string;
  payer_contact: string;
  transfer_reference?: string;
  notes?: string;
  status: 'PENDING_BANK_TRANSFER';
}

export interface PaymentConfig {
  method_name: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  currency: string;
  notes: string[];
  whatsapp_number?: string;
  contact_email?: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  isComingSoon?: boolean;
}


// Enhanced Pack Ladder Types
export type AvailableNextPack = {
  slug: string;
  name: string;
  relationship: string;
  available: boolean;
};

export type ResearchPath = {
  direction: string;
  researchPrompt: string;
};

export type EnhancedPackLadder = {
  availableNext: AvailableNextPack[];
  researchPaths: ResearchPath[];
  categoryStage: 'entry' | 'mid' | 'advanced' | 'independent';
  progressionType: string;
  verticalProgression?: string;
};

export type EnhancedPackLaddersMap = {
  [slug: string]: EnhancedPackLadder;
};
