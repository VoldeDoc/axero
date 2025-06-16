import { useState, useEffect } from 'react';

interface Country {
  name: string;
  code: string;
  currency: string;
  flag: string;
  language: string;
}

const countries: Country[] = [
  { name: "United States", code: "US", currency: "USD", flag: "🇺🇸", language: "en" },
  { name: "United Kingdom", code: "UK", currency: "GBP", flag: "🇬🇧", language: "en" },
  { name: "Canada", code: "CA", currency: "CAD", flag: "🇨🇦", language: "en" },
  { name: "Australia", code: "AU", currency: "AUD", flag: "🇦🇺", language: "en" },
  { name: "Germany", code: "DE", currency: "EUR", flag: "🇩🇪", language: "de" },
  { name: "France", code: "FR", currency: "EUR", flag: "🇫🇷", language: "fr" },
  { name: "Japan", code: "JP", currency: "JPY", flag: "🇯🇵", language: "ja" },
  { name: "India", code: "IN", currency: "INR", flag: "🇮🇳", language: "hi" },
  { name: "Nigeria", code: "NG", currency: "NGN", flag: "🇳🇬", language: "en" },
  { name: "Brazil", code: "BR", currency: "BRL", flag: "🇧🇷", language: "pt" },
];

const exchangeRates: Record<string, number> = {
  "USD": 0.0013, "GBP": 0.0010, "CAD": 0.0017, "AUD": 0.0019,
  "EUR": 0.0011, "JPY": 0.15, "INR": 0.10, "NGN": 1, "BRL": 0.0063,
};

export const useCountryTranslate = () => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(countries[8]); // Default Nigeria

  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      const country = countries.find(c => c.code === savedCountry);
      if (country) setSelectedCountryState(country);
    }
  }, []);

  const formatPrice = (price: number): string => {
    const rate = exchangeRates[selectedCountry.currency] || 1;
    const convertedPrice = price * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCountry.currency,
      minimumFractionDigits: selectedCountry.currency === 'JPY' ? 0 : 2
    }).format(convertedPrice);
  };

  return {
    selectedCountry,
    formatPrice,
    countries
  };
};