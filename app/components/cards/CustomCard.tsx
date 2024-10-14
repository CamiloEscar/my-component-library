import React from 'react';

interface CustomCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  showShadow: boolean;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  content,
  imageUrl,
  backgroundColor,
  textColor,
  borderRadius,
  showShadow,
}) => {
  const borderRadiusClass = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
  }[borderRadius];

  return (
    <div 
      className={`overflow-hidden ${borderRadiusClass} ${showShadow ? 'shadow-lg' : ''}`}
      style={{ backgroundColor, color: textColor }}
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export const customCardConfig = {
  name: 'CustomCard',
  component: CustomCard,
  defaultProps: {
    title: 'Card Title',
    content: 'This is the card content.',
    imageUrl: '/placeholder.svg?height=300&width=400',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderRadius: 'medium',
    showShadow: true,
  },
  customizableProps: {
    title: { type: 'text' as const, label: 'Card Title' },
    content: { type: 'text' as const, label: 'Card Content' },
    imageUrl: { type: 'text' as const, label: 'Image URL' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    borderRadius: { 
      type: 'select' as const, 
      label: 'Border Radius', 
      options: ['none', 'small', 'medium', 'large'] 
    },
    showShadow: { type: 'boolean' as const, label: 'Show Shadow' },
  },
  description: 'A customizable card component with optional image, adjustable colors, and styling.',
};