import React from 'react';

interface SimpleHeaderProps {
  title: string;
  backgroundColor: string;
  textColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({ title, backgroundColor, textColor, fontSize }) => {
  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[fontSize];

  return (
    <header style={{ backgroundColor, color: textColor }} className="p-4">
      <h1 className={`font-bold ${fontSizeClass}`}>{title}</h1>
    </header>
  );
};

export const simpleHeaderConfig = {
  name: 'SimpleHeader',
  component: SimpleHeader,
  defaultProps: { 
    title: 'Simple Header',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: 'medium'
  },
  customizableProps: {
    title: { type: 'text' as const, label: 'Title' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    fontSize: { 
      type: 'select' as const, 
      label: 'Font Size', 
      options: ['small', 'medium', 'large'] 
    },
  },
  description: 'A simple header with customizable title, background color, text color, and font size.',
};