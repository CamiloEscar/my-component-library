import { headerPlugins } from '../plugins/headers';
import { footerPlugins } from '../plugins/footers';
import { cardPlugins } from '../plugins/cards';
import { formPlugins } from '../plugins/forms';
import { buttonPlugins } from '../plugins/buttons';
import { layoutPlugins } from '../plugins/layout';
import { uiPlugins } from '../plugins/ui';

export interface CustomizableProp {
  type: 'text' | 'color' | 'number' | 'boolean' | 'select';
  label: string;
  options?: string[];
}

export interface ComponentConfig {
  name: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  customizableProps: Record<string, CustomizableProp>;
  description: string;
}

export interface ComponentRegistry {
  [key: string]: ComponentConfig[];
}

const componentRegistry: ComponentRegistry = {
  Headers: headerPlugins,
  Cards: cardPlugins,
  Forms: formPlugins,
  Buttons: buttonPlugins,
  Layout: layoutPlugins,
  Footers: footerPlugins,
  UI: uiPlugins,
};

export default componentRegistry;