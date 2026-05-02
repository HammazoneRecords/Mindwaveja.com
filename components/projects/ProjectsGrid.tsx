"use client";

import { motion } from "framer-motion";
import { ExternalLink, Zap, Globe2, Code2, Smartphone, TrendingUp, BookOpen } from "lucide-react";
import projectsData from "@/content/projects.json";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  name: string;
  type: string;
  status: string;
  tags: string[];
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  included: string[];
  featured: boolean;
  link: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  "Educational App": <Smartphone className="w-4 h-4" />,
  "Accounting Tool": <Code2 className="w-4 h-4" />,
  "Workplace Tool": <Code2 className="w-4 h-4" />,
  "Innovation Network": <TrendingUp className="w-4 h-4" />,
  "Advanced System": <Zap className="w-4 h-4" />,
  "Ecosystem Platform": <Globe2 className="w-4 h-4" />,
};

export function ProjectsGrid() {
  const projects: Project[] = projectsData.projects;
  const researchProjects: Project[] = projectsData.researchProjects;

  // Sort projects: featured first, then by type
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.type.localeCompare(b.type);
  });

  const sortedResearchProjects = [...researchProjects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.type.localeCompare(b.type);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      variants={itemVariants}
      className={`group relative elevation-2 rounded-2xl p-4 transition-all duration-300 border ${
        project.featured ? 'md:col-span-1 lg:col-span-1 ring-2' : ''
      }`}
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        borderColor: 'rgb(var(--color-border-primary))',
        ...(project.featured && {
          '--tw-ring-color': 'rgb(var(--color-brand-red))',
        } as React.CSSProperties),
      }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div
          className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: 'rgb(var(--color-brand-red))',
            color: '#ffffff',
          }}
        >
          Featured
        </div>
      )}

      {/* Icon and Type */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="p-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(var(--color-brand-red), 0.1)',
          }}
        >
          <div
            style={{
              color: 'rgb(var(--color-brand-red))',
            }}
          >
            {typeIcons[project.type] || <Zap className="w-4 h-4" />}
          </div>
        </div>
        <div>
          <p
            className="text-xs font-semibold"
            style={{
              color: 'rgb(var(--color-brand-red))',
            }}
          >
            {project.type}
          </p>
          <p
            className="text-xs"
            style={{
              color: 'rgb(var(--color-text-tertiary))',
            }}
          >
            Status: {project.status}
          </p>
        </div>
      </div>

      {/* Project Name */}
      <h3
        className="text-base font-bold mb-1.5"
        style={{
          color: 'rgb(var(--color-text-primary))',
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-3 line-clamp-2"
        style={{
          color: 'rgb(var(--color-text-secondary))',
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              backgroundColor: 'rgba(var(--color-brand-green), 0.1)',
              color: 'rgb(var(--color-brand-green))',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price/Access */}
      <div className="mb-3 pb-3 border-t" style={{ borderColor: 'rgb(var(--color-border-primary))' }}>
        <p
          className="text-sm font-semibold mb-1"
          style={{
            color: 'rgb(var(--color-text-tertiary))',
          }}
        >
          {project.price}
        </p>
        <p
          className="text-xs"
          style={{
            color: 'rgb(var(--color-text-tertiary))',
          }}
        >
          {project.priceNote}
        </p>
      </div>

      {/* Features */}
      <div className="mb-3">
        <p
          className="text-xs font-semibold mb-2"
          style={{
            color: 'rgb(var(--color-text-tertiary))',
          }}
        >
          Key Features
        </p>
        <ul className="space-y-1">
          {project.features.slice(0, 2).map((feature, idx) => (
            <li key={idx} className="flex gap-2">
              <span
                style={{
                  color: 'rgb(var(--color-brand-red))',
                }}
              >
                ✓
              </span>
              <span
                className="text-sm"
                style={{
                  color: 'rgb(var(--color-text-secondary))',
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:gap-3"
        style={{
          backgroundColor: 'rgb(var(--color-brand-red))',
          color: '#ffffff',
        }}
      >
        Learn More
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );

  return (
    <section
      className="py-8 md:py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'rgb(var(--color-bg-primary))',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Active Projects */}
        <div>
          <div className="mb-6">
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: 'rgb(var(--color-text-primary))',
              }}
            >
              Active Projects
            </h2>
            <p
              className="text-sm"
              style={{
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              Live tools and applications transforming Jamaica
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Research Projects */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen
                className="w-5 h-5"
                style={{
                  color: 'rgb(var(--color-brand-red))',
                }}
              />
              <h2
                className="text-2xl font-bold"
                style={{
                  color: 'rgb(var(--color-text-primary))',
                }}
              >
                Research Projects
              </h2>
            </div>
            <p
              className="text-sm"
              style={{
                color: 'rgb(var(--color-text-secondary))',
              }}
            >
              Experimental initiatives exploring next-generation ecosystems
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {sortedResearchProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
