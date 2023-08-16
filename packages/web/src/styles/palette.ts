type ThemeVariables = {
  bg_page1: string;
  bg_page2: string;
  bg_element1: string;
  bg_element2: string;
  bg_element3: string;
  bg_element4: string;
  bg_element5: string;
  bg_element6: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
  border1: string;
  border2: string;
  border3: string;
  border4: string;
  primary1: string;
  primary2: string;
  primary3: string;
  danger1: string;
  danger2: string;
  danger3: string;
  button_text1: string;
  button_text2: string;
  shadow1: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page1: '#f8f9fa',
    bg_page2: '#ffffff',
    bg_element1: '#ffffff',
    bg_element2: '#f8f9fa',
    bg_element3: '#E9ECEF',
    bg_element4: '#DEE2E6',
    bg_element5: '#282828',
    bg_element6: '#3F3F3F',
    text1: '#212529',
    text2: '#495057',
    text3: '#868e96',
    text4: '#ACACAC',
    text5: '#ffdfc9',
    button_text1: '#FFFFFF',
    button_text2: '#121212',
    border1: '#343a40',
    border2: '#adb5bd',
    border3: '#dee2e6',
    border4: '#f1f3f5',
    primary1: '#ff7417',
    primary2: '#ff8537',
    primary3: '#EB6D19',
    danger1: '#fb4e4e',
    danger2: '#fc7171',
    danger3: '#E94646',
    shadow1: 'rgba(0, 0, 0, 0.02)',
  },
  dark: {
    bg_page1: '#121212',
    bg_page2: '#121212',
    bg_element1: '#1e1e1e',
    bg_element2: '#1e1e1e',
    bg_element3: '#282828',
    bg_element4: '#2E2E2E',
    bg_element5: '#F1F3F5',
    bg_element6: '#F8F9FA',
    text1: '#ececec',
    text2: '#d9d9d9',
    text3: '#acacac',
    text4: '#999999',
    text5: '#666666',
    button_text1: '#121212',
    button_text2: '#FFFFFF',
    border1: '#e0e0e0',
    border2: '#a0a0a0',
    border3: '#4d4d4d',
    border4: '#2e2e2e',
    primary1: '#f7863e',
    primary2: '#d67e45',
    primary3: '#BE662E',
    danger1: '#ed6d5f',
    danger2: '#be574c',
    danger3: '#98443B',
    shadow1: 'rgba(0, 0, 0, 0.02)',
  },
};

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as (keyof ThemeVariables)[];
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    ''
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};

const cssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;

const variableKeys = Object.keys(themeVariableSets.light) as VariableKey[];

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce(
  (acc, current) => {
    acc[current] = cssVar(current);
    return acc;
  },
  {} as ThemedPalette
);
