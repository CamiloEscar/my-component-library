import React from 'react';

interface RotatingPlanetProps {
  planetColor: string;
  satelliteColor: string;
  speed: number;
}

export const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  planetColor,
  satelliteColor,
  speed
}) => {
  return (
    <div className="relative w-64 h-64">
      <div 
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: planetColor }}
      ></div>
      <div 
        className="absolute w-4 h-4 rounded-full"
        style={{ 
          backgroundColor: satelliteColor,
          animation: `orbit ${speed}s linear infinite`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export const rotatingPlanetConfig = {
  name: 'RotatingPlanet',
  component: RotatingPlanet,
  defaultProps: {
    planetColor: '#3b82f6',
    satelliteColor: '#ef4444',
    speed: 5
  },
  customizableProps: {
    planetColor: { type: 'color' as const, label: 'Planet Color' },
    satelliteColor: { type: 'color' as const, label: 'Satellite Color' },
    speed: { type: 'number' as const, label: 'Rotation Speed (seconds)' }
  },
  description: 'A customizable rotating planet with a satellite.',
};