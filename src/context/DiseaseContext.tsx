import React, { createContext, useContext, useState } from 'react';

interface DiseaseContextType {
  detectedDisease: string | null;
  setDetectedDisease: (disease: string | null) => void;
}

const DiseaseContext = createContext<DiseaseContextType | null>(null);

export const DiseaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedDisease, setDetectedDisease] = useState<string | null>(null);

  return (
    <DiseaseContext.Provider value={{ detectedDisease, setDetectedDisease }}>
      {children}
    </DiseaseContext.Provider>
  );
};

export const useDisease = () => {
  const context = useContext(DiseaseContext);
  if (!context) {
    throw new Error('useDisease must be used within a DiseaseProvider');
  }
  return context;
};
