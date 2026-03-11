
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Shape: Hexagon symbolizing structure/enterprise */}
      <path 
        d="M50 10 L85 27.5 V72.5 L50 90 L15 72.5 V27.5 Z" 
        fill="url(#logoGradient)" 
        fillOpacity="0.15" 
        stroke="url(#logoGradient)" 
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Stylized 'N' representing Nexus/Network */}
      <g filter="url(#glow)">
        <path 
            d="M35 35 V65" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
        />
        <path 
            d="M65 35 V65" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
        />
        <path 
            d="M35 35 L65 65" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
        />
      </g>

      {/* Connection Nodes (AI/Data Points) */}
      <circle cx="35" cy="35" r="5" fill="white" />
      <circle cx="65" cy="65" r="5" fill="white" />
      
      {/* Accent Points showing activity/processing */}
      <circle cx="65" cy="35" r="4" fill="#ea580c" />
      <circle cx="35" cy="65" r="3" fill="#dc2626" />
    </svg>
  );
};

export default Logo;
