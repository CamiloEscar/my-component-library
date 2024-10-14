import React from 'react';

interface CustomBodyProps {
  backgroundColor: string;
  textColor: string;
  content: string;
  padding: 'small' | 'medium' | 'large';
  maxWidth: 'none' | 'small' | 'medium' | 'large';
}

export const CustomBody: React.FC<CustomBodyProps> = ({
  backgroundColor,
  textColor,
  content,
  padding,
  maxWidth,
}) => {
  const paddingClass = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-12',
  }[padding];

  const maxWidthClass = {
    none: '',
    small: 'max-w-2xl',
    medium: 'max-w-4xl',
    large: 'max-w-6xl',
  }[maxWidth];

  return (
    <div 
      className={`min-h-screen ${paddingClass}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className={`mx-auto ${maxWidthClass}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export const customBodyConfig = {
  name: 'CustomBody',
  component: CustomBody,
  defaultProps: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    content: '<h1>Welcome to our website</h1><p>This is the main content area.</p>',
    padding: 'medium',
    maxWidth: 'medium',
  },
  customizableProps: {
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    content: { type: 'text' as const, label: 'HTML Content' },
    padding: { 
      type: 'select' as const, 
      label: 'Padding', 
      options: ['small', 'medium', 'large'] 
    },
    maxWidth: { 
      type: 'select' as const, 
      label: 'Max Width', 
      options: ['none', 'small', 'medium', 'large'] 
    },
  },
  description: 'A customizable body component for the main content area.',
};