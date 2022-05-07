import React, { useCallback, useContext, useMemo } from "react";
import deepmerge, { Options } from "deepmerge";
// @ts-ignore
import hoistNonReactStatics from "hoist-non-react-statics";

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeMode = `${THEME}`;

export const makeTheming = <Theme = {}, Colors = {}, ComponentTheme = {}>(
  defaultTheme?: {
    mode?: ThemeMode;
    lightColors?: RecursivePartial<Colors>;
    darkColors?: RecursivePartial<Colors>;
  } & Theme,
  customMerge?: deepmerge.Options["customMerge"]
) => {
  type ComponentFunctionProps<Components = ComponentTheme> = {
    [Key in keyof Components]?:
      | Components[Key]
      | ((props: Components[Key]) => Components[Key]);
  };

  type CreateThemeOptions = Partial<ComponentFunctionProps> &
    Partial<Theme> & {
      mode?: ThemeMode;
      lightColors?: RecursivePartial<Colors>;
      darkColors?: RecursivePartial<Colors>;
    };

  type FullTheme<T = ComponentTheme> = T &
    Theme & {
      mode: ThemeMode;
      colors: Colors;
    };

  type UpdateTheme = (
    myNewTheme:
      | CreateThemeOptions
      | ((myTheme: CreateThemeOptions) => CreateThemeOptions)
  ) => void;

  type ReplaceTheme = (
    updates:
      | CreateThemeOptions
      | ((myTheme: CreateThemeOptions) => CreateThemeOptions)
  ) => void;

  type ThemeOptions = FullTheme<ComponentFunctionProps>;

  type ThemeProviderProps<T = ThemeOptions> = {
    theme: T;
    updateTheme: UpdateTheme;
    replaceTheme: ReplaceTheme;
  };

  const ThemeContext = React.createContext<ThemeProviderProps>(
    {} as ThemeProviderProps
  );

  const createTheme = (theme: CreateThemeOptions): CreateThemeOptions => {
    return {
      ...theme,
      ...deepmerge<CreateThemeOptions>(
        defaultTheme as CreateThemeOptions,
        {
          lightColors: theme.lightColors || ({} as Colors),
          darkColors: theme.darkColors || ({} as Colors),
          mode: theme.mode || "light",
        } as CreateThemeOptions
      ),
    };
  };

  const separateColors = (
    theme: CreateThemeOptions,
    themeMode?: ThemeMode
  ): ThemeOptions => {
    const {
      darkColors: themeDarkColors = {},
      lightColors: themeLightColors = {},
      mode = themeMode,
      ...restTheme
    } = theme;

    const themeColors =
      mode === THEME.DARK ? themeDarkColors : themeLightColors;
    return {
      colors: themeColors as Colors,
      mode,
      ...restTheme,
    } as ThemeOptions;
  };

  const ThemeProvider: React.FC<{
    theme?: CreateThemeOptions;
    children?: React.ReactNode;
  }> = ({ theme = createTheme({}), children }) => {
    const [themeState, setThemeState] =
      React.useState<CreateThemeOptions>(theme);

    const updateTheme: UpdateTheme = React.useCallback((updatedTheme) => {
      setThemeState((oldTheme) => {
        const newTheme =
          typeof updatedTheme === "function"
            ? updatedTheme(oldTheme)
            : updatedTheme;
        return deepmerge<CreateThemeOptions>({ ...oldTheme }, newTheme);
      });
    }, []);

    const replaceTheme: ReplaceTheme = React.useCallback((replacedTheme) => {
      setThemeState((oldTheme) => {
        const newTheme =
          typeof replacedTheme === "function"
            ? replacedTheme(oldTheme)
            : replacedTheme;
        return deepmerge<CreateThemeOptions>(
          createTheme(defaultTheme as CreateThemeOptions),
          newTheme
        );
      });
    }, []);

    const ThemeContextValue = React.useMemo(
      () => ({
        theme: separateColors(themeState, themeState.mode),
        updateTheme,
        replaceTheme,
      }),
      [themeState, updateTheme, replaceTheme]
    );

    return (
      <ThemeContext.Provider value={ThemeContextValue}>
        {children}
      </ThemeContext.Provider>
    );
  };

  const ThemeConsumer = ThemeContext.Consumer;

  type UseTheme = {
    replaceTheme: ReplaceTheme;
    updateTheme: UpdateTheme;
    theme: ThemeOptions;
  };

  const useTheme = (): UseTheme => {
    return useContext(ThemeContext);
  };

  function useThemeMode() {
    const { updateTheme, theme } = useTheme();

    const setMode = useCallback(
      (mode: ThemeMode) => {
        updateTheme({ mode } as CreateThemeOptions);
      },
      [updateTheme]
    );

    return { mode: theme.mode, setMode };
  }

  function ThemedComponent(
    WrappedComponent: any,
    themeKey: keyof ComponentFunctionProps,
    displayName?: string
  ) {
    return Object.assign(
      (props: any, forwardedRef: any) => {
        const { children, ...rest } = props;

        const { theme, updateTheme, replaceTheme } = useTheme();

        if (!theme) {
          const newProps = {
            ...rest,
            children,
          };
          return isClassComponent(WrappedComponent) ? (
            <WrappedComponent ref={forwardedRef} {...newProps} />
          ) : (
            <WrappedComponent {...newProps} />
          );
        }

        const themedProps = useMemo(() => {
          const props = theme[themeKey];
          return typeof props === "function" ? props?.(rest) : props;
        }, []);

        const newProps = {
          theme: { colors: theme.colors, mode: theme.mode },
          updateTheme,
          replaceTheme,
          ...deepmerge<Theme>(themedProps || {}, rest, {
            customMerge,
            clone: false,
          }),
          children,
        };

        if (isClassComponent(WrappedComponent)) {
          return <WrappedComponent ref={forwardedRef} {...newProps} />;
        }
        return <WrappedComponent {...newProps} />;
      },
      { displayName: displayName }
    );
  }

  function withTheme<P = {}, T = {}>(
    WrappedComponent: React.ComponentType<P & ThemeProviderProps<T>>,
    themeKey?: string
  ): React.FunctionComponent<P> | React.ForwardRefExoticComponent<P> {
    const name = themeKey
      ? `Themed.${themeKey}`
      : `Themed.${
          WrappedComponent.displayName || WrappedComponent.name || "Component"
        }`;

    const Component = ThemedComponent(
      WrappedComponent,
      themeKey as keyof ComponentFunctionProps,
      name
    );

    if (isClassComponent(WrappedComponent)) {
      return hoistNonReactStatics(
        React.forwardRef(Component),
        WrappedComponent
      );
    }

    return Component;
  }

  return {
    ThemeProvider,
    ThemeConsumer,
    useTheme,
    useThemeMode,
    createTheme,
    withTheme,
  };
};

const isClassComponent = (Component: any) =>
  Boolean(Component?.prototype?.isReactComponent);
