import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_COLOR_SCHEME } from '../config/constants';
import { colors } from '../config/pallette';

type Theme = {
  scheme: 'light' | 'dark';
  pallette: {
    [color: string]: {
      [shade: number]: string;
    };
  };
};

const ThemeContext = createContext<Theme>(colors[DEFAULT_COLOR_SCHEME]);

function setVariables(theme: Theme) {
  for (const color in theme.pallette) {
    for (const shade in (theme.pallette as any)[color]) {
      document?.documentElement?.style.setProperty(`--${color}-${shade}`, (theme.pallette as any)[color][shade]);
    }
  }
}

export const ThemeContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(colors[DEFAULT_COLOR_SCHEME]);

  useEffect(() => {
    const q = window?.matchMedia('(prefers-color-scheme: dark)');
    setTheme(q.matches ? colors.dark : colors.light);

    const listener = () => setTheme(q.matches ? colors.dark : colors.light);

    q.addEventListener('change', listener);
    return () => q.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    setVariables(theme);
    document?.querySelector('#favicon')?.setAttribute('href', `/favicon/${theme.scheme}/favicon.ico`);
  }, [theme, children]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
