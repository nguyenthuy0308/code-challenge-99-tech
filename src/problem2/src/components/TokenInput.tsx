import React from 'react';
import { Field } from 'formik';
import CustomSelect from './CustomSelect';

interface TokenInputProps {
  name: string;
  label: string;
  token: string;
  onTokenChange: (value: string) => void;
  tokens: string[];
  price: number;
  error?: string;
  touched?: boolean;
  readOnly?: boolean;
  value?: string;
}

const TokenInput: React.FC<TokenInputProps> = ({
  name,
  label,
  token,
  onTokenChange,
  tokens,
  price,
  error,
  touched,
  readOnly = false,
  value,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        {readOnly ? (
          <div className="flex-1 min-w-0 block w-full p-3 rounded-l-md border outline-none border-gray-300 bg-gray-50">
            {value || '0.0'}
          </div>
        ) : (
          <Field
            type="number"
            name={name}
            className="flex-1 min-w-0 block w-full p-3 rounded-l-md border outline-none border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="0.0"
          />
        )}
        <CustomSelect
          value={token}
          onChange={onTokenChange}
          options={tokens}
        />
      </div>
      {error && touched && (
        <span className="text-red-500 text-sm italic mt-[0.5px]">{error}</span>
      )}
      <p className="text-md font-medium text-gray-500 mt-1">
        Price: ${price.toFixed(2)}
      </p>
    </div>
  );
};

export default TokenInput; 