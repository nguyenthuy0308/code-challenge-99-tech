import React, { useState, useRef, useEffect } from 'react';
import { getTokenIconUrl } from '../hooks/useTokenPrices'
import defaultCoinImg from '../../public/assets/default-coin.png'

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-w-[140px] cursor-pointer inline-flex items-center justify-between p-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <div className="flex items-center gap-2 ">
          <img
            src={getTokenIconUrl(value)}
            alt={value}
            className="w-6 h-6 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultCoinImg;
            }}
          />
          <span>{value}</span>
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`w-full cursor-pointer flex items-center gap-2 p-2 text-sm hover:bg-yellow-50 ${option === value ? 'bg-yellow-100 text-yellow-900' : 'text-gray-900'
                }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <img
                src={getTokenIconUrl(option)}
                alt={option}
                className="w-6 h-6 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultCoinImg;
                }}
              />
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect; 