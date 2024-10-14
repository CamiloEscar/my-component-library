import { rotatingPlanetConfig } from '../components/ui/RotatingPlanet';
import { projectsShowcaseConfig } from '../components/ui/ProjectsShowcase';
import { ComponentConfig } from '../utils/componentRegistry';

export const uiPlugins: ComponentConfig[] = [
  rotatingPlanetConfig,
  projectsShowcaseConfig,
  // Puedes agregar más configuraciones de componentes UI aquí en el futuro
];