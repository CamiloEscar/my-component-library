import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: 'small' | 'medium' | 'large';
  showSearch?: boolean;
  navItems?: string;
  logoUrl?: string;
  sticky?: boolean;
}

export const SimpleHeader: React.FC<HeaderProps> = ({ 
  title, 
  backgroundColor = 'white',
  textColor = 'black',
  fontSize = 'medium'
}) => {
  const fontSizeClass = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl'
  }[fontSize];

  return (
    <header style={{ backgroundColor }} className="shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className={`${fontSizeClass} font-bold`} style={{ color: textColor }}>{title}</h1>
      </div>
    </header>
  );
};

export const NavigationHeader: React.FC<HeaderProps> = ({ 
  title, 
  backgroundColor = 'white', 
  textColor = 'black',
  showSearch = false, 
  navItems = 'Home,About,Contact',
  logoUrl,
  sticky = false
}) => {
  const headerClass = `shadow ${sticky ? 'sticky top-0 z-50' : ''}`;

  return (
    <header style={{ backgroundColor }} className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 w-auto mr-4" />}
            <h1 className="text-3xl font-bold" style={{ color: textColor }}>{title}</h1>
          </div>
          <nav className="flex items-center">
            <ul className="flex space-x-4">
              {navItems.split(',').map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-gray-900" style={{ color: textColor }}>{item.trim()}</a>
                </li>
              ))}
            </ul>
            {showSearch && (
              <div className="ml-4">
                <Search className="h-6 w-6" style={{ color: textColor }} />
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};