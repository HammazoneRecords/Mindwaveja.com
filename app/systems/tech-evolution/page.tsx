'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  children?: NodeData[];
}

const ERA_COLORS: Record<string, string> = {
  'theme':                    '#A4CF4C',
  'prehistoric':              '#F59E0B',
  'industrial-revolutions':   '#94A3B8',
  'digital-revolution':       '#38BDF8',
  'fourth-industrial':        '#4ADE80',
  'future':                   '#A78BFA',
};

const ERA_LABELS: Record<string, string> = {
  'theme':                    'Theme: The S-Curve',
  'prehistoric':              'I. Prehistoric Technology',
  'industrial-revolutions':   'II. Industrial Revolutions',
  'digital-revolution':       'III. Digital Revolution',
  'fourth-industrial':        'IV. 4th Industrial Revolution',
  'future':                   'V. Future & Emerging',
};

const mindMapData: NodeData = {
  id: 'tech-evolution',
  name: 'Tech Evolution: A Journey of Accelerating Change',
  children: [
    {
      id: 'theme',
      name: 'Overall Theme: Rapid Acceleration and Exponential Growth',
      children: [
        { id: 'change-speed', name: 'Technological change has shifted from being extremely slow to extraordinarily fast.' },
        { id: 'unimaginable-common', name: 'Technologies once unimaginable become common within a single generation.' },
        {
          id: 's-curve',
          name: 'S-Curve Model of Innovation Adoption',
          children: [
            { id: 's-curve-1', name: 'Phase 1: Visionaries recognize a problem/opportunity.' },
            { id: 's-curve-2', name: 'Phase 2: Innovators move concepts to prototypes (Proof of Concept).' },
            { id: 's-curve-3', name: 'Phase 3: Early Adopters form niche markets.' },
            { id: 's-curve-4', name: 'Phase 4: System Integration reaches the mass market.' },
            { id: 's-curve-5', name: 'Phase 5: Market Expansion and saturation.' },
          ],
        },
        { id: 's-curve-drivers', name: 'Drivers of S-Curve Growth: learning curves, economies of scale, social diffusion.' },
        { id: 'combinatorial-explosion', name: 'Inventions result from recombining existing knowledge, leading to a "combinatorial explosion".' },
      ],
    },
    {
      id: 'prehistoric',
      name: 'I. Prehistoric Technology (Began ~3.4M years ago)',
      children: [
        {
          id: 'stone-age',
          name: 'Stone Age',
          children: [
            { id: 'stone-tools', name: 'Earliest stone tools (~3.3M years ago)' },
            { id: 'fire', name: 'Control and use of fire (~2.4M years ago)' },
            { id: 'bone-tools', name: 'Systematic bone tool production (~1.5M years ago)' },
            { id: 'navigation', name: 'Early navigation and seafaring' },
            { id: 'hafting', name: 'Hafted hunting technology (spears)' },
            { id: 'wood-structures', name: 'Use of wood for structures (~476,000 years ago)' },
            { id: 'clothing', name: 'Clothing and bone tools for clothing (~120,000–90,000 years ago)' },
            { id: 'symbolic-expression', name: 'Symbolic expression (engraved ochre, beads) (~100,000 years ago)' },
            { id: 'microliths', name: 'Microlithic tools (~80,000 years ago)' },
            { id: 'bow-arrow', name: 'Compound adhesives, bow-and-arrow technology (~70,000–60,000 years ago)' },
            { id: 'mining', name: 'Oldest known mines (Eswatini, ~47,000 years ago)' },
            { id: 'music', name: 'Musical instruments (flute, ~42,000 years ago)' },
            { id: 'ceramics', name: 'Ceramics and weaving (~28,000 years ago)' },
            { id: 'pottery', name: 'Pottery (China, ~20,000–16,000 years ago)' },
            { id: 'bread', name: 'Bread (Jordan, ~14,500 years ago)' },
          ],
        },
        {
          id: 'neolithic',
          name: 'Neolithic Revolution / Agricultural Era (~12,000 years ago)',
          children: [
            { id: 'settled-life', name: 'Shift from nomadic to settled lifestyles' },
            { id: 'urban-revolution', name: 'Led to "Urban Revolution" with towns' },
          ],
        },
        { id: 'bronze-age', name: 'Bronze Age: Adoption of bronze technology' },
        { id: 'iron-age', name: 'Iron Age: Adoption of iron/steel smelting' },
      ],
    },
    {
      id: 'industrial-revolutions',
      name: 'II. Industrial Revolutions',
      children: [
        {
          id: 'first-industrial',
          name: 'First Industrial Revolution (c. 1760 – c. 1840)',
          children: [
            { id: 'textiles', name: 'Mechanized Textile Production (spinning jenny)' },
            { id: 'steam-power', name: 'Steam Power (James Watt)' },
            { id: 'factory-system', name: 'Factory System' },
            { id: 'transport', name: 'Improved Transportation (canals, railways)' },
            { id: 'social-impact-1', name: 'Social Impact: Urbanization, child labor, Luddite movements' },
          ],
        },
        {
          id: 'second-industrial',
          name: 'Second Industrial Revolution (Late 19th - early 20th century)',
          children: [
            { id: 'standardization', name: 'Focus on standardization' },
            { id: 'electricity', name: 'Powered by electricity and preliminary automation' },
            { id: 'research-labs', name: 'Rise of industrial laboratories and research universities' },
          ],
        },
      ],
    },
    {
      id: 'digital-revolution',
      name: 'III. Third Industrial Revolution / Digital Revolution (Mid-20th century – early 2000s)',
      children: [
        {
          id: 'origins-3rd',
          name: 'Origins (1947–1969)',
          children: [
            { id: 'transistor', name: 'Transistor (1947): Foundational development' },
            { id: 'mosfet', name: 'MOSFET (1960): Revolutionized computing' },
            { id: 'early-computers', name: 'Early Computers (ENIAC, Z3)' },
            { id: 'ic', name: 'Integrated Circuit (1958-59)' },
          ],
        },
        {
          id: 'home-computers-internet',
          name: 'Rise of Home Computers & Internet (1969–1989)',
          children: [
            { id: 'arpanet', name: 'ARPANET (1969)' },
            { id: 'personal-computers', name: 'Personal computers become viable' },
            { id: 'www', name: 'World Wide Web proposed (Tim Berners-Lee, 1989)' },
          ],
        },
        {
          id: 'mainstreaming',
          name: 'Mainstreaming of Internet & Web 1.0 (1989–2005)',
          children: [
            { id: 'web-public', name: 'Web becomes publicly accessible (1991)' },
            { id: 'majority-pcs', name: 'Most U.S. households own a PC (2000)' },
          ],
        },
        {
          id: 'web2',
          name: 'Web 2.0, Social Media, Smartphones (2005–Present)',
          children: [
            { id: 'iphone', name: 'Apple iPhone (2007)' },
            { id: 'streaming', name: 'Emergence of video-streaming (YouTube, Netflix)' },
            { id: 'cloud', name: 'Cloud computing becomes mainstream' },
          ],
        },
      ],
    },
    {
      id: 'fourth-industrial',
      name: 'IV. Fourth Industrial Revolution (4IR) (Early 2000s - Present)',
      children: [
        { id: 'cyber-physical', name: 'Defined by cyber-physical systems and intelligent computers' },
        {
          id: 'disruptive-tech',
          name: 'Four Foundational Disruptive Technologies',
          children: [
            { id: 'connectivity', name: '1. Connectivity, Data, and Computational Power (Cloud, 5G, IoT, Blockchain)' },
            { id: 'analytics', name: '2. Analytics and Intelligence (AI, Machine Learning, Quantum Computing)' },
            { id: 'hmi', name: '3. Human-Machine Interaction (VR/AR, Robotics, Automation)' },
            { id: 'advanced-eng', name: '4. Advanced Engineering (3D printing, renewable energy)' },
          ],
        },
        {
          id: 'impact-4ir',
          name: 'Impact on Workforce & Society',
          children: [
            { id: 'reskilling', name: 'Crucial emphasis on reskilling and upskilling' },
            { id: 'job-creation', name: 'Technology tends to create more jobs than it destroys' },
            { id: 'inequality', name: 'Concerns about economic inequality and structural unemployment' },
            { id: 'privacy', name: 'Growing concerns about privacy and data security' },
            { id: 'digital-divide', name: 'The digital divide remains a significant challenge' },
          ],
        },
      ],
    },
    {
      id: 'future',
      name: 'V. Potential Future Stages / Emerging Concepts',
      children: [
        { id: 'imagination-age', name: 'Imagination Age: Theorized stage after the Information Age' },
        { id: 'singularity', name: 'Post-industrial / Singularity / Emerging Technologies' },
        { id: 'metaverse-web3', name: 'Metaverse and Web 3.0' },
        { id: 'quantum-tech', name: 'Quantum Technologies' },
      ],
    },
  ],
};

function countDescendants(node: NodeData): number {
  if (!node.children || node.children.length === 0) return 0;
  return node.children.reduce((sum, child) => sum + 1 + countDescendants(child), 0);
}

function Node({
  node,
  level,
  eraColor,
  expandAll,
  expandKey,
}: {
  node: NodeData;
  level: number;
  eraColor: string;
  expandAll: boolean;
  expandKey: number;
}) {
  const [isOpen, setIsOpen] = useState(level < 1);
  const hasChildren = !!(node.children && node.children.length > 0);
  const hiddenCount = !isOpen && hasChildren ? countDescendants(node) : 0;
  const isEraNode = level === 1;

  useEffect(() => {
    if (level > 0) {
      setIsOpen(expandAll);
    }
  }, [expandKey]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: Math.min(level * 0.05, 0.3) }}
      className="relative flex items-start w-full"
      {...(isEraNode ? { 'data-era': node.id } : {})}
    >
      <div className="flex items-center w-full">
        <div
          className="flex items-center justify-between w-full md:min-w-[220px] md:max-w-[500px] backdrop-blur-sm border rounded-md px-3 py-2 text-sm transition-all duration-300"
          style={{
            background: isEraNode
              ? `${eraColor}12`
              : 'rgb(var(--color-bg-tertiary) / 0.8)',
            borderColor: isOpen
              ? `${eraColor}80`
              : 'rgb(var(--color-text-tertiary) / 0.25)',
            color: 'rgb(var(--color-text-primary))',
            cursor: hasChildren ? 'pointer' : 'default',
            boxShadow: isOpen && isEraNode ? `0 0 20px ${eraColor}18` : 'none',
          }}
          onClick={() => hasChildren && setIsOpen(!isOpen)}
        >
          <span className={isEraNode ? 'font-semibold' : ''}>{node.name}</span>

          <div className="flex items-center gap-2 ml-3 shrink-0">
            {!isOpen && hiddenCount > 0 && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  background: `${eraColor}20`,
                  color: eraColor,
                }}
              >
                +{hiddenCount}
              </span>
            )}
            {hasChildren && (
              <ChevronRight
                size={15}
                className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                style={{ color: eraColor }}
              />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pl-8 md:pl-12 pt-2 flex flex-col gap-2 w-full"
          >
            {/* Vertical connector line */}
            <div
              className="absolute left-[12px] md:left-[16px] top-0 bottom-2 w-px"
              style={{ background: `${eraColor}35` }}
            />

            {node.children?.map((child) => (
              <div key={child.id} className="relative w-full">
                {/* Horizontal connector tick */}
                <div
                  className="absolute -left-[19px] md:-left-[28px] top-[18px] h-px w-5 md:w-7"
                  style={{ background: `${eraColor}35` }}
                />
                <Node
                  node={child}
                  level={level + 1}
                  eraColor={eraColor}
                  expandAll={expandAll}
                  expandKey={expandKey}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TechEvolutionPage() {
  const [expandAll, setExpandAll] = useState(false);
  const [expandKey, setExpandKey] = useState(0);
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect active era via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eraId = entry.target.getAttribute('data-era');
            if (eraId) setActiveEra(eraId);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -50% 0px' }
    );

    const eraNodes = document.querySelectorAll('[data-era]');
    eraNodes.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function handleExpandAll() {
    setExpandAll(true);
    setExpandKey((k) => k + 1);
  }

  function handleCollapseAll() {
    setExpandAll(false);
    setExpandKey((k) => k + 1);
  }

  const eraColor = activeEra ? (ERA_COLORS[activeEra] ?? '#A4CF4C') : '#A4CF4C';
  const eraLabel = activeEra ? (ERA_LABELS[activeEra] ?? '') : '';

  return (
    <>
      {/* Sticky era header */}
      <AnimatePresence>
        {activeEra && (
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="sticky top-16 z-40 px-6 py-2 backdrop-blur-md border-b flex items-center gap-3"
            style={{
              background: `${eraColor}10`,
              borderColor: `${eraColor}30`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: eraColor }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: eraColor }}
            >
              {eraLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8 md:py-12" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
            Tech Evolution
          </h1>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] text-center max-w-3xl mx-auto mb-8">
            A journey of accelerating change — from prehistoric stone tools to the Fourth Industrial Revolution
          </p>

          {/* Expand / Collapse controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleExpandAll}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: 'rgb(var(--color-brand-green) / 0.4)',
                color: 'rgb(var(--color-brand-green))',
                background: 'rgb(var(--color-brand-green) / 0.08)',
              }}
            >
              <ChevronsUpDown size={14} />
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: 'rgb(var(--color-text-tertiary) / 0.3)',
                color: 'rgb(var(--color-text-secondary))',
                background: 'rgb(var(--color-bg-tertiary) / 0.5)',
              }}
            >
              <ChevronsDownUp size={14} />
              Collapse All
            </button>
          </div>
        </motion.div>

        {/* Era color legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {mindMapData.children?.map((era) => (
            <div
              key={era.id}
              className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{
                borderColor: `${ERA_COLORS[era.id]}40`,
                color: ERA_COLORS[era.id],
                background: `${ERA_COLORS[era.id]}10`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ERA_COLORS[era.id] }}
              />
              {ERA_LABELS[era.id]}
            </div>
          ))}
        </div>

        {/* Tree */}
        <div className="overflow-x-auto pb-8">
          <div className="w-full md:flex md:justify-center">
            <div className="w-full md:max-w-2xl">
            {mindMapData.children?.map((era) => (
              <div key={era.id} className="mb-6">
                <Node
                  node={era}
                  level={1}
                  eraColor={ERA_COLORS[era.id] ?? '#A4CF4C'}
                  expandAll={expandAll}
                  expandKey={expandKey}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
