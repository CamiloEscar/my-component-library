import React from 'react';

interface CardProps {
  title: string;
  content: string;
  backgroundColor?: string;
}

export const SimpleCard: React.FC<CardProps> = ({ title, content, backgroundColor = 'white' }) => (
  <div style={{ backgroundColor }} className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
  </div>
);

export const ImageCard: React.FC<CardProps & { imageUrl: string }> = ({ title, content, imageUrl, backgroundColor = 'white' }) => (
  <div style={{ backgroundColor }} className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt={title} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
  </div>
);

export const InteractiveCard: React.FC<CardProps> = ({ title, content, backgroundColor = 'white' }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div 
      style={{ backgroundColor }} 
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {isExpanded ? content : `${content.slice(0, 100)}...`}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {isExpanded ? 'Click to collapse' : 'Click to expand'}
        </span>
      </div>
    </div>
  );
};