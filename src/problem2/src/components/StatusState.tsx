import React from 'react';

interface StatusProps {
  message: string;
}

const StatusState: React.FC<StatusProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div className="text-red-600 text-xl">{message}</div>
  </div>
  );
};

export default StatusState;
