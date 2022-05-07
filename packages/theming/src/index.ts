import {
  makeTheming,
  RecursivePartial,
  THEME,
  ThemeMode,
} from "./ThemeProvider";

export { makeTheming };
export type { RecursivePartial, ThemeMode, THEME };

interface Theme {
  spacing?: {
    sm: number;
    md: number;
    lg: number;
  };
  border?: {
    sm: number;
    md: number;
    lg: number;
  };
}

interface Pallette {
  light: string;
  main: string;
  dark: string;
}

interface Colors {
  primary: Pallette;
  secondary: Pallette;
}

interface MyComponentProps {
  disabled?: boolean;
}
