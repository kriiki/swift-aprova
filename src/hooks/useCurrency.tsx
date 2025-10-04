import { useState, useEffect } from "react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Country {
  name: { common: string };
  currencies?: Record<string, { name: string; symbol: string }>;
}

export const useCurrency = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    // Check for admin role (default INR)
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") return "INR";
    
    // Check for user nationality
    const userNationality = localStorage.getItem("userNationality");
    if (userNationality) return userNationality;
    
    return "USD";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies");
        const data: Country[] = await response.json();
        
        const currencyMap = new Map<string, Currency>();
        
        data.forEach((country) => {
          if (country.currencies) {
            Object.entries(country.currencies).forEach(([code, curr]) => {
              if (!currencyMap.has(code)) {
                currencyMap.set(code, {
                  code,
                  name: curr.name,
                  symbol: curr.symbol,
                });
              }
            });
          }
        });

        const currencyList = Array.from(currencyMap.values()).sort((a, b) =>
          a.code.localeCompare(b.code)
        );
        
        setCurrencies(currencyList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const getCurrencySymbol = (code: string): string => {
    const currency = currencies.find((c) => c.code === code);
    return currency?.symbol || code;
  };

  const formatAmount = (amount: number, currencyCode?: string): string => {
    const code = currencyCode || selectedCurrency;
    const symbol = getCurrencySymbol(code);
    return `${symbol}${amount.toLocaleString()}`;
  };

  return {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    getCurrencySymbol,
    formatAmount,
    loading,
  };
};
