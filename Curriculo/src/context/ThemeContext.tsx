import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeType {
  background: string;
  text: string;
  primary: string;
  card: string;
}

interface ThemeContextData {
  isDark: boolean;
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const theme: ThemeType = {
    background: isDark ? '#000000' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    primary: isDark ? '#D21F3C' : '#FFC1CC', // Cereja no Dark, Rosa no Light
    card: isDark ? '#1A1A1A' : '#F8F8F8',
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);