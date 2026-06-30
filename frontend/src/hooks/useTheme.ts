import { useTheme as useNextTheme } from '@/components/providers/ThemeProvider';

export const useTheme = () => {
    const { theme, toggleTheme } = useNextTheme();
    return { theme, toggleTheme };
};