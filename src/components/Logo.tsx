import React from 'react';

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  monochrome?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  showWordmark = false,
  monochrome = false,
  className = '',
}) => {
  const charcoalColor = '#171717';
  const orangeColor = monochrome ? '#171717' : '#E45A2A';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 
        Symbol: Fall → Return → Forward
        - An outer circular arc in Charcoal that travels clockwise, with a distinct gap/dip (the fall)
        - An inner curve returning upward and driving cleanly forward to the right (the return & forward)
        - An accent stepping point dot in Comeback Orange at the forward path terminus
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="Comeback Logo Symbol"
      >
        {/* Background circular guide (ultra subtle) */}
        <circle cx="24" cy="24" r="21" stroke={charcoalColor} strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 3" />

        {/* 
          1. The Main Arc (Charcoal):
          Starts near top-right (35, 13), loops around left to bottom-left (15, 35),
          creating the intentional descent/fall gap.
        */}
        <path
          d="M 34 13 C 28 8 18 10 12 18 C 6 26 8 36 17 40"
          stroke={charcoalColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 
          2. The Return Stroke (Comeback Orange):
          Picks up from the descent point (19, 39), loops upward and drives 
          forward horizontally through the center/upper right
        */}
        <path
          d="M 19 39 C 25 41 29 36 28 29 C 27 24 32 23 38 23 H 40"
          stroke={orangeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 
          3. The Forward Point (Comeback Orange):
          Geometric step marker on the forward trajectory
        */}
        <circle
          cx="41"
          cy="23"
          r="2.8"
          fill={orangeColor}
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-lg text-[#171717]">
            کامبک
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#E45A2A] -mt-0.5">
            comeback
          </span>
        </div>
      )}
    </div>
  );
};
