import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSecret } from '../services/secretService';

const ApiUrlContext = createContext<string | null>(null);

export const useApiUrl = () => {
    return useContext(ApiUrlContext);
};

type ApiUrlProviderProps = {
  children: React.ReactNode;
};

export const ApiUrlProvider: React.FC<ApiUrlProviderProps> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSecret() {
      const url = await getSecret("API_URL");
      setApiUrl(url);
    }
    
    fetchSecret();
  }, []);

  return (
    <ApiUrlContext.Provider value={apiUrl}>
      {children}
    </ApiUrlContext.Provider>
  );
};
