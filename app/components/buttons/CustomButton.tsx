import React from 'react';

interface CustomButtonProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  size: 'small' | 'medium' | 'large';
  rounded: boolean;
  fullWidth: boolean;
  onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  backgroundColor,
  textColor,
  size,
  rounded,
  fullWidth,
  onClick,
}) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size];

  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`font-bold ${sizeClasses} ${roundedClass} ${widthClass} transition-colors duration-300 ease-in-out hover:opacity-80`}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const customButtonConfig = {
  name: 'CustomButton',
  component: CustomButton,
  defaultProps: {
    text: 'Click me',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    size: 'medium',
    rounded: false,
    fullWidth: false,
    onClick: () => alert('Button clicked!'),
  },
  customizableProps: {
    text: { type: 'text' as const, label: 'Button Text' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    size: { 
      type: 'select' as const, 
      label: 'Size', 
      options: ['small', 'medium', 'large'] 
    },
    rounded: { type: 'boolean' as const, label: 'Rounded' },
    fullWidth: { type: 'boolean' as const, label: 'Full Width' },
  },
  description: 'A customizable button component with various style options.',
};