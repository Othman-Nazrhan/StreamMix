import { useState, useEffect, createContext, useContext } from 'react';

// Theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState('');

  const updateTheme = () => {
    const hour = new Date().getHours();
    const newTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const updateBackground = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  useEffect(() => {
    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const value = {
    theme,
    backgroundImage,
    updateBackground,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
