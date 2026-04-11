import { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | MindWave Jamaica",
  description: "Explore MindWave's innovative projects including AI-powered tools, transparency platforms, and ecosystem initiatives.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1">
      <ProjectsHero />
      <ProjectsGrid />
    </main>
  );
}
