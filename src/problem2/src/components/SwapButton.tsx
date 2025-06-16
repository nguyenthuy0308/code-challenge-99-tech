import React from 'react';

interface SwapButtonProps {
  onClick: () => void;
  isActiveAnimation?: boolean;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick,isActiveAnimation }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={`w-[60px] h-[60px] cursor-pointer border-2 border-yellow-600 rounded-full bg-yellow-100 text-yellow-600 text-3xl hover:bg-yellow-200 ${isActiveAnimation ? 'animate-[bounce_0.8s_ease-in-out_infinite]' : ''}`}
        onClick={onClick}
      >
        ↓↑
      </button>
    </div>
  );
};

export default SwapButton; 