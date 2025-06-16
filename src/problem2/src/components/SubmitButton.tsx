import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full cursor-pointer flex justify-center p-3 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
    >
      Swap
    </button>
  );
};

export default SubmitButton; 