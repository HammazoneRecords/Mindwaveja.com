'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import { ReceiptPreview } from '../ReceiptPreview';
import type { IntakePath, IntakeFormData, Receipt, PhasePack } from '@/lib/types';
import { generateId } from '@/utils/slug';
import packsData from '@/content/phasePacks.json';

export type GatewayMode = 'idea' | 'capital' | 'both' | null;

const riskLabels: Record<NonNullable<GatewayMode>, string[]> = {
  idea: [
    'Play it safe — show me the easiest, lowest-cost ways to start.',
    'Lean safe — mostly proven models with a little room to grow.',
    'Balanced — a mix of safe bets and growth opportunities.',
    'Bolder — higher upside ideas, I can handle some challenge.',
    'Go bold — show me the most ambitious options available.',
  ],
  capital: [
    'Steady returns — consistent income over fast growth.',
    'Mostly stable — reliable picks with some upside potential.',
    'Balanced — stable earners and growth plays in the mix.',
    'Growth-focused — prioritise high-demand over safety.',
    'Max upside — show me the highest-growth opportunities.',
  ],
  both: [
    'Plan thoroughly — solid foundation over speed.',
    'Mostly careful — steady, but keep the momentum.',
    'Balanced — good speed backed by a solid plan.',
    'Move fast — I can adapt as I go.',
    'Launch now — fastest path to market, full speed ahead.',
  ],
};

const riskShortLabel = ['Play it safe', 'Mostly safe', 'Balanced', 'Bolder', 'Go bold'];

const pathOptions: { value: IntakePath; label: string; description: string }[] = [
  {
    value: 'service',
    label: 'Service Package',
    description: 'Get personalized guidance through one of our Wave packages',
  },
  {
    value: 'phase-pack',
    label: 'Phase Pack',
    description: 'Get a complete business blueprint for a specific venture',
  },
  {
    value: 'store-product',
    label: 'Marketplace Product',
    description: 'Purchase a template, guide, or tool from our marketplace',
  },
  {
    value: 'just-an-idea',
    label: 'Just an Idea',
    description: 'Not sure yet? Tell us your idea and we will guide you',
  },
];

const initialFormData: IntakeFormData = {
  path: 'just-an-idea',
  selectedItem: '',
  ideaDescription: '',
  budget: '',
  timeline: '',
  skills: '',
  location: '',
  name: '',
  email: '',
  phone: '',
  preferredContact: 'email',
};

function getRecommendedPacks(budget: string, mode: GatewayMode, riskLevel = 3): PhasePack[] {
  const allPacks: PhasePack[] = (packsData as { phasePacks: PhasePack[] }).phasePacks;

  const budgetMax: Record<string, number> = {
    'under-25k': 25000,
    '25k-50k': 50000,
    '50k-100k': 100000,
    '100k-250k': 250000,
    '250k-plus': Infinity,
    'not-sure': 50000,
    '': 60000,
  };

  const maxBudget = budgetMax[budget] ?? 60000;
  // Normalise risk 1–5 → 0.0–1.0
  const risk = (riskLevel - 1) / 4;

  let filtered = allPacks.filter((p) => p.capitalRange.min <= maxBudget);

  filtered = filtered.sort((a, b) => {
    const demA = a.packScore?.demandScore ?? 0;
    const demB = b.packScore?.demandScore ?? 0;
    const capA = a.packScore?.capitalDifficulty ?? 5;
    const capB = b.packScore?.capitalDifficulty ?? 5;
    const saleA = a.packScore?.timeToFirstSale ?? 0;
    const saleB = b.packScore?.timeToFirstSale ?? 0;

    if (mode === 'idea') {
      // Low risk → safest/cheapest; high risk → boldest/highest demand
      const scoreA = (1 - risk) * (10 - capA) + risk * demA;
      const scoreB = (1 - risk) * (10 - capB) + risk * demB;
      return scoreB - scoreA;
    } else if (mode === 'capital') {
      // Low risk → fastest first sale (stable return); high risk → highest demand
      const scoreA = (1 - risk) * saleA + risk * demA;
      const scoreB = (1 - risk) * saleB + risk * demB;
      return scoreB - scoreA;
    } else {
      // both: low risk → thoroughness (time to first sale); high risk → demand
      const scoreA = risk * demA + (1 - risk) * saleA;
      const scoreB = risk * demB + (1 - risk) * saleB;
      return scoreB - scoreA;
    }
  });

  return filtered.slice(0, 3);
}

export function IntakeForm() {
  const searchParams = useSearchParams();
  const [gatewayMode, setGatewayMode] = useState<GatewayMode>(null);
  const [selectedRisk, setSelectedRisk] = useState(3);
  const [cardRisk, setCardRisk] = useState<Record<NonNullable<GatewayMode>, { value: number; touched: boolean }>>({
    idea:    { value: 3, touched: false },
    capital: { value: 3, touched: false },
    both:    { value: 3, touched: false },
  });
  const [expandedCard, setExpandedCard] = useState<NonNullable<GatewayMode> | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill from URL params
  useEffect(() => {
    const service = searchParams.get('service');
    const pack = searchParams.get('pack');
    const product = searchParams.get('product');

    if (service) {
      setFormData((prev) => ({ ...prev, path: 'service', selectedItem: service }));
      setStep(1);
    } else if (pack) {
      setFormData((prev) => ({ ...prev, path: 'phase-pack', selectedItem: pack }));
      setStep(1);
    } else if (product) {
      setFormData((prev) => ({ ...prev, path: 'store-product', selectedItem: product }));
      setStep(1);
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<IntakeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleGatewaySelect = (mode: NonNullable<GatewayMode>) => {
    setGatewayMode(mode);
    setSelectedRisk(cardRisk[mode].value);
    if (mode === 'idea') {
      updateFormData({ path: 'just-an-idea' });
    } else {
      updateFormData({ path: 'phase-pack' });
    }
    setStep(1);
  };

  const handleRiskChange = (mode: NonNullable<GatewayMode>, value: number) => {
    setCardRisk((prev) => ({ ...prev, [mode]: { value, touched: true } }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const newReceipt: Receipt = {
      receipt_id: generateId('MWJ'),
      timestamp: new Date().toISOString(),
      selected_path: formData.path,
      payload: formData,
    };
    const existingReceipts = JSON.parse(localStorage.getItem('mindwave_receipts') || '[]');
    existingReceipts.push(newReceipt);
    localStorage.setItem('mindwave_receipts', JSON.stringify(existingReceipts));
    setTimeout(() => {
      setReceipt(newReceipt);
      setIsSubmitting(false);
    }, 1000);
  };

  const canProceedStep1 = formData.path !== undefined;
  const canProceedStep2 = formData.ideaDescription.trim().length > 10;
  const canProceedStep3 =
    formData.name.trim().length > 1 &&
    (formData.email.includes('@') || (formData.phone?.length ?? 0) > 6);

  if (receipt) {
    const recommended = getRecommendedPacks(formData.budget, gatewayMode, selectedRisk);
    return <ReceiptPreview receipt={receipt} recommendedPacks={recommended} gatewayMode={gatewayMode} />;
  }

  return (
    <div>
      {/* Progress Bar — only visible after gateway */}
      {step > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-fog-500 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-wave-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">

        {/* STEP 0 — Gateway */}
        {step === 0 && (
          <StepWrapper key="step0">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-fog-50 mb-3">
                Where are you starting from?
              </h1>
              <p className="text-fog-400 text-base">
                Tell us your situation and we will point you in the right direction.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {(
                [
                  { mode: 'idea'    as const, emoji: '💡', title: 'I have an idea', desc: 'I know what I want to build but I need a plan, a blueprint, or guidance on how to start — with little to no startup capital.', cta: 'Start with my idea' },
                  { mode: 'capital' as const, emoji: '💰', title: 'I have the money', desc: 'I have capital ready to deploy but I need the right opportunity — a proven business model that matches my budget and market.', cta: 'Show me opportunities' },
                  { mode: 'both'    as const, emoji: '🚀', title: 'I have an idea and the money — I need a plan', desc: 'I am ready to move. I have the concept and the capital, but I need a structured plan, a Phase Pack blueprint, or expert guidance to execute it properly.', cta: 'Build my plan' },
                ] as const
              ).map(({ mode, emoji, title, desc, cta }) => {
                const isOpen = expandedCard === mode;
                const risk = cardRisk[mode];
                return (
                  <div
                    key={mode}
                    className={`rounded-2xl border-2 transition-colors duration-200 ${
                      isOpen ? 'border-wave-600/50 bg-navy-800/70' : 'border-navy-700 bg-navy-800/40'
                    }`}
                  >
                    {/* Header row — always visible */}
                    <button
                      type="button"
                      onClick={() => setExpandedCard(isOpen ? null : mode)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left"
                    >
                      <span className="text-xl shrink-0">{emoji}</span>
                      <span className={`font-display font-semibold text-sm flex-1 ${isOpen ? 'text-fog-50' : 'text-fog-300'}`}>
                        {title}
                      </span>
                      {risk.touched && (
                        <span className="text-xs font-medium text-wave-400 bg-wave-600/15 px-2 py-0.5 rounded-full shrink-0">
                          {riskShortLabel[risk.value - 1]}
                        </span>
                      )}
                      <svg
                        className={`w-4 h-4 text-fog-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <p className="text-fog-400 text-sm leading-relaxed mb-5">{desc}</p>
                            <RiskSlider
                              mode={mode}
                              value={risk.value}
                              touched={risk.touched}
                              onChange={(v) => handleRiskChange(mode, v)}
                            />
                            <button
                              type="button"
                              disabled={!risk.touched}
                              onClick={() => handleGatewaySelect(mode)}
                              className="mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-wave-600 hover:bg-wave-500 text-white"
                            >
                              {risk.touched ? `${cta} →` : 'Set your risk level to continue'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-fog-600 text-xs">
              Either path takes 2 minutes. We will match you to the right resources at the end.
            </p>
          </StepWrapper>
        )}

        {/* STEP 1 — Path Selection */}
        {step === 1 && (
          <StepWrapper key="step1">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-fog-50 mb-2">
              How can we help?
            </h1>
            <p className="text-fog-400 mb-8">
              Choose the path that best describes what you are looking for.
            </p>

            <div className="space-y-3 mb-8">
              {pathOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateFormData({ path: option.value })}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    formData.path === option.value
                      ? 'bg-wave-600/10 border-wave-600/50 text-fog-100'
                      : 'bg-navy-800/50 border-navy-700 text-fog-300 hover:border-navy-600'
                  }`}
                >
                  <span className="font-medium block mb-1">{option.label}</span>
                  <span className="text-sm text-fog-500">{option.description}</span>
                </button>
              ))}
            </div>

            {formData.selectedItem && (
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4 mb-8">
                <span className="text-fog-500 text-sm">Pre-selected:</span>
                <span className="text-fog-200 ml-2">{formData.selectedItem}</span>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(0)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="flex-1">
                Continue
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 2 — Idea Details */}
        {step === 2 && (
          <StepWrapper key="step2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-fog-50 mb-2">
              {gatewayMode === 'capital' ? 'Tell us about your situation' : 'Tell us about your idea'}
            </h1>
            <p className="text-fog-400 mb-8">
              Share as much or as little as you are comfortable with.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  {gatewayMode === 'capital'
                    ? 'What kind of business are you open to? Any preferences or restrictions? *'
                    : 'Describe your idea or what you need help with *'}
                </label>
                <textarea
                  value={formData.ideaDescription}
                  onChange={(e) => updateFormData({ ideaDescription: e.target.value })}
                  rows={4}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-wave-600 transition-colors resize-none"
                  placeholder={
                    gatewayMode === 'capital'
                      ? 'e.g. Open to food, beauty, or retail. Prefer something I can run from home...'
                      : 'I want to start a business that...'
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-fog-200 text-sm font-medium mb-2">
                    {gatewayMode === 'capital' ? 'Available Capital' : 'Budget Range'}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => updateFormData({ budget: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 focus:outline-none focus:border-wave-600 transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="under-25k">Under JMD 25,000</option>
                    <option value="25k-50k">JMD 25,000 - 50,000</option>
                    <option value="50k-100k">JMD 50,000 - 100,000</option>
                    <option value="100k-250k">JMD 100,000 - 250,000</option>
                    <option value="250k-plus">JMD 250,000+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-fog-200 text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateFormData({ timeline: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 focus:outline-none focus:border-wave-600 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Relevant skills or experience
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => updateFormData({ skills: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-wave-600 transition-colors"
                  placeholder="e.g., Marketing, Cooking, Social Media"
                />
              </div>

              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Location (Parish)
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 focus:outline-none focus:border-wave-600 transition-colors"
                >
                  <option value="">Select parish</option>
                  <option value="kingston">Kingston</option>
                  <option value="st-andrew">St. Andrew</option>
                  <option value="st-catherine">St. Catherine</option>
                  <option value="clarendon">Clarendon</option>
                  <option value="manchester">Manchester</option>
                  <option value="st-elizabeth">St. Elizabeth</option>
                  <option value="westmoreland">Westmoreland</option>
                  <option value="hanover">Hanover</option>
                  <option value="st-james">St. James</option>
                  <option value="trelawny">Trelawny</option>
                  <option value="st-ann">St. Ann</option>
                  <option value="st-mary">St. Mary</option>
                  <option value="portland">Portland</option>
                  <option value="st-thomas">St. Thomas</option>
                  <option value="other">Other / Outside Jamaica</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canProceedStep2} className="flex-1">
                Continue
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 3 — Contact */}
        {step === 3 && (
          <StepWrapper key="step3">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-fog-50 mb-2">
              Contact Information
            </h1>
            <p className="text-fog-400 mb-8">
              How should we reach you to discuss your idea?
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-wave-600 transition-colors"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-wave-600 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className="w-full bg-navy-800 border border-navy-700 rounded-2xl px-4 py-3 text-fog-100 placeholder:text-fog-600 focus:outline-none focus:border-wave-600 transition-colors"
                  placeholder="+1 876 XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-fog-200 text-sm font-medium mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateFormData({ preferredContact: method })}
                      className={`flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.preferredContact === method
                          ? 'bg-wave-600/10 border-wave-600/50 text-wave-400'
                          : 'bg-navy-800/50 border-navy-700 text-fog-400 hover:border-navy-600'
                      }`}
                    >
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!canProceedStep3} className="flex-1">
                Review
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <StepWrapper key="step4">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-fog-50 mb-2">
              Review Your Submission
            </h1>
            <p className="text-fog-400 mb-8">
              Please confirm everything looks correct before submitting.
            </p>

            <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-6 mb-8 space-y-4">
              <ReviewItem label="Request Type" value={pathOptions.find(p => p.value === formData.path)?.label || formData.path} />
              {formData.selectedItem && (
                <ReviewItem label="Selected Item" value={formData.selectedItem} />
              )}
              <ReviewItem label="Idea Description" value={formData.ideaDescription} />
              {formData.budget && <ReviewItem label="Budget" value={formData.budget} />}
              {formData.timeline && <ReviewItem label="Timeline" value={formData.timeline} />}
              {formData.skills && <ReviewItem label="Skills" value={formData.skills} />}
              {formData.location && <ReviewItem label="Location" value={formData.location} />}
              <div className="border-t border-navy-700 pt-4">
                <ReviewItem label="Name" value={formData.name} />
                <ReviewItem label="Email" value={formData.email} />
                {formData.phone && <ReviewItem label="Phone" value={formData.phone} />}
                <ReviewItem label="Preferred Contact" value={formData.preferredContact} />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(3)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} isLoading={isSubmitting} className="flex-1">
                Submit
              </Button>
            </div>
          </StepWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-fog-500 text-sm">{label}</span>
      <span className="text-fog-200 text-sm text-right max-w-[60%]">{value}</span>
    </div>
  );
}

const scalePoints: { label: string; value: number }[] = [
  { label: 'Safe', value: 1 },
  { label: 'Balanced', value: 3 },
  { label: 'Bold', value: 5 },
];

function RiskSlider({
  mode,
  value,
  touched,
  onChange,
}: {
  mode: NonNullable<GatewayMode>;
  value: number;
  touched: boolean;
  onChange: (v: number) => void;
}) {
  const tooltipText = riskLabels[mode][value - 1];
  const shortLabel = riskShortLabel[value - 1];
  const pct = ((value - 1) / 4) * 100;

  return (
    <div className="mt-auto pt-4 border-t border-navy-700/60">
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-fog-400 text-xs font-medium">Risk tolerance</span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
            touched ? 'bg-wave-600/20 text-wave-400' : 'bg-navy-700 text-fog-500 animate-pulse'
          }`}
        >
          {touched ? shortLabel : 'Adjust to continue ↓'}
        </span>
      </div>

      {/* Track + visible thumb */}
      <div className="relative mb-1 py-2">
        {/* Track background — ring acts as the "stroke" border */}
        <div
          className={`relative h-2 rounded-full bg-navy-700 transition-all ${
            !touched ? 'ring-1 ring-wave-600/50' : 'ring-0'
          }`}
        >
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-wave-600 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
          {/* Thumb — circle with green stroke (the "stroke" in Photoshop terms) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-wave-600 shadow-lg transition-all duration-150"
            style={{
              left: `${pct}%`,
              boxShadow: touched
                ? '0 0 0 2px #4ade80, 0 0 0 4px rgba(74,222,128,0.25)'
                : '0 0 0 2px #4ade80, 0 0 8px 2px rgba(74,222,128,0.4)',
            }}
          />
        </div>

        {/* Hidden native input — full hit area */}
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-grab active:cursor-grabbing h-full"
          aria-label="Risk tolerance"
        />
      </div>

      {/* Clickable scale labels — Safe / Balanced / Bold */}
      <div className="flex justify-between mb-3">
        {scalePoints.map((pt) => (
          <button
            key={pt.value}
            type="button"
            onClick={() => onChange(pt.value)}
            className={`text-xs font-medium px-2 py-1 rounded-lg transition-all ${
              value === pt.value && touched
                ? 'text-wave-400 bg-wave-600/15'
                : 'text-fog-500 hover:text-wave-400 hover:bg-wave-600/10'
            }`}
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Tooltip */}
      <div
        className={`rounded-xl px-3 py-2 text-xs leading-relaxed transition-all ${
          touched
            ? 'bg-wave-600/10 border border-wave-600/25 text-fog-300'
            : 'bg-navy-900/60 border border-navy-700/80 text-fog-500'
        }`}
      >
        {touched ? (
          <>
            <span className="text-wave-500 font-medium">{shortLabel}: </span>
            {tooltipText}
          </>
        ) : (
          'Drag the slider or tap Safe / Balanced / Bold — this shapes which business options we match you with.'
        )}
      </div>
    </div>
  );
}
