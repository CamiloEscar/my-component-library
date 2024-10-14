import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ProjectsShowcaseProps {
  title: string;
  projects: Project[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  title,
  projects,
  backgroundColor,
  textColor,
  accentColor
}) => {
  return (
    <section className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  className="inline-flex items-center font-semibold hover:underline"
                  style={{ color: accentColor }}
                >
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const projectsShowcaseConfig = {
  name: 'ProjectsShowcase',
  component: ProjectsShowcase,
  defaultProps: {
    title: 'Our Projects',
    projects: [
      {
        id: '1',
        title: 'Project Alpha',
        description: 'A revolutionary app that changes the way we think about productivity.',
        imageUrl: '/placeholder.svg?height=300&width=400',
        link: '#'
      },
      {
        id: '2',
        title: 'Project Beta',
        description: 'An innovative solution for managing complex data structures.',
        imageUrl: '/placeholder.svg?height=300&width=400',
        link: '#'
      },
      {
        id: '3',
        title: 'Project Gamma',
        description: 'A cutting-edge platform for real-time collaboration.',
        imageUrl: '/placeholder.svg?height=300&width=400',
        link: '#'
      }
    ],
    backgroundColor: '#f3f4f6',
    textColor: '#1f2937',
    accentColor: '#3b82f6'
  },
  customizableProps: {
    title: { type: 'text' as const, label: 'Section Title' },
    projects: { type: 'text' as const, label: 'Projects (JSON format)' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    accentColor: { type: 'color' as const, label: 'Accent Color' }
  },
  description: 'A showcase section for displaying multiple projects with a professional UI.',
};