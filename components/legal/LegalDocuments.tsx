"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import legalData from "@/content/legal.json";

interface Section {
  heading: string;
  content: string;
}

interface LegalDocument {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  sections: Section[];
}

export function LegalDocuments() {
  const [expandedDoc, setExpandedDoc] = useState<string>("legal-001");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["legal-001-0"])
  );

  const documents: LegalDocument[] = legalData.documents;

  const toggleSection = (docId: string, sectionIndex: number) => {
    const sectionId = `${docId}-${sectionIndex}`;
    const newSections = new Set(expandedSections);
    if (newSections.has(sectionId)) {
      newSections.delete(sectionId);
    } else {
      newSections.add(sectionId);
    }
    setExpandedSections(newSections);
  };

  const toggleDocument = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? "" : docId);
  };

  return (
    <div className="space-y-6">
      {/* Document Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-charcoal-100 dark:border-border-primary">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              toggleDocument(doc.id);
              setExpandedSections(new Set([`${doc.id}-0`]));
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              expandedDoc === doc.id
                ? "bg-brand-red text-white dark:bg-brand-red dark:text-charcoal-900"
                : "bg-charcoal-50 text-charcoal-700 dark:bg-bg-tertiary dark:text-text-secondary hover:bg-charcoal-100 dark:hover:bg-bg-elevated"
            }`}
          >
            {doc.title}
          </button>
        ))}
      </div>

      {/* Documents */}
      <div className="space-y-4">
        <AnimatePresence>
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={false}
              animate={{ opacity: expandedDoc === doc.id ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={expandedDoc !== doc.id ? "opacity-50 pointer-events-none" : ""}>
                <div className="bg-white dark:bg-bg-secondary rounded-3xl overflow-hidden border border-charcoal-100 dark:border-border-primary">
                  {/* Document Header */}
                  <div
                    className="p-6 bg-charcoal-50 dark:bg-bg-tertiary cursor-pointer flex justify-between items-center hover:bg-charcoal-100 dark:hover:bg-bg-elevated transition-colors"
                    onClick={() => toggleDocument(doc.id)}
                  >
                    <div className="text-left flex-1">
                      <h2 className="text-2xl font-bold text-primary dark:text-text-primary mb-1">
                        {doc.title}
                      </h2>
                      <p className="text-sm text-secondary dark:text-text-tertiary">
                        Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedDoc === doc.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-secondary dark:text-text-secondary" />
                    </motion.div>
                  </div>

                  {/* Document Content */}
                  <AnimatePresence>
                    {expandedDoc === doc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-4 space-y-3">
                          {doc.sections.map((section, sectionIndex) => {
                            const sectionId = `${doc.id}-${sectionIndex}`;
                            const isExpanded = expandedSections.has(sectionId);

                            return (
                              <div
                                key={sectionId}
                                className="border border-charcoal-100 dark:border-border-primary rounded-xl overflow-hidden"
                              >
                                <button
                                  onClick={() => toggleSection(doc.id, sectionIndex)}
                                  className="w-full p-4 bg-charcoal-50 dark:bg-bg-tertiary hover:bg-charcoal-100 dark:hover:bg-bg-elevated transition-colors flex justify-between items-center text-left"
                                >
                                  <h3 className="font-semibold text-primary dark:text-text-primary">
                                    {section.heading}
                                  </h3>
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDown className="w-5 h-5 text-secondary dark:text-text-secondary flex-shrink-0" />
                                  </motion.div>
                                </button>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <div className="px-4 py-3 bg-fog-50 dark:bg-bg-primary border-t border-charcoal-100 dark:border-border-primary">
                                        <p className="text-base text-secondary dark:text-text-secondary leading-relaxed">
                                          {section.content}
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
