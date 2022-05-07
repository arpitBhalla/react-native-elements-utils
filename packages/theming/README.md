# @rneui/theming

- [Installation](#installation)
- [Usage](#usage)
  - [Declare types (if using typescript)](#declare-types-if-using-typescript)
  - [Using use-theme hook](#using-use-theme-hook)
  - [Using with-theme HOC](#using-with-theme-hoc)
  - [Using default props for components](#using-default-props-for-components)

Your components with our theme provider

## Installation

```bash
npm install @rneui/theming
```

```bash
yarn add @rneui/theming
```

## Usage

### Declare types (if using typescript)

```tsx
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
```

```tsx
const { createTheme, useTheme, ThemeProvider } = makeTheming<Theme, Colors>({
  spacing: { sm: 8, md: 10, lg: 12 },
  border: { sm: 8, md: 10, lg: 12 },
});

export { createTheme, useTheme, ThemeProvider };
```

```tsx
const theme = createTheme({
  darkColors: {
    primary: {
      main: "#02f300",
    },
  },
  lightColors: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "",
    },
  },
  spacing: {
    sm: 10,
    md: 20,
    lg: 30,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Button title="Hello" />
  </ThemeProvider>
);
```

### Using use-theme hook

```tsx
const Button = () => {
  const { theme, replaceTheme } = useTheme();

  const handleClick = () => {
    replaceTheme({ darkColors: { primary: { main: "red" } } });
  };

  return (
    <MyComponent color={theme.colors.primary.main} padding={theme.spacing.sm} />
  );
};
```

### Using with-theme HOC

```tsx
interface MyComponentProps {
  disabled?: boolean;
}
```

### Using default props for components

```tsx
interface ComponentTheme {
  MyComponent: MyComponentProps;
}

const { createTheme, withTheme, ThemeProvider } = makeTheming<
  {},
  Colors,
  ComponentTheme
>();

const theme = createTheme({
  MyComponent: {
    disabled: false,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
};

const MyComponent = withTheme<MyComponentProps>((props) => {
  return <Button color={props.theme.colors.primary.main}></Button>;
});
```
