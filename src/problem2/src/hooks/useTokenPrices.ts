import { useQuery } from '@tanstack/react-query';

export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

const fetchTokenPrices = async (): Promise<TokenPrice[]> => {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useTokenPrices = () => {
  return useQuery({
    queryKey: ['tokenPrices'],
    queryFn: fetchTokenPrices,
    staleTime: 30000, // Data will be considered fresh for 30 seconds
  });
};

export const getTokenIconUrl = (tokenSymbol: string) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${tokenSymbol.toUpperCase()}.svg`;
}; 