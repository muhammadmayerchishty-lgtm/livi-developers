import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedPropertiesContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  clearAll: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'livi_saved_properties';

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export const SavedPropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read saved properties from localStorage:', e);
    }
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
      }
    } catch (e) {
      console.warn('Could not persist saved properties to localStorage:', e);
    }
  }, [savedIds]);

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSavedIds([]);
  };

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSave,
        clearAll,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export function useSavedProperties() {
  const ctx = useContext(SavedPropertiesContext);
  if (!ctx) {
    throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
  }
  return ctx;
}
