export function getComputedHSL(variableName: string): string {
    if (typeof window === 'undefined') return '#ffffff';
    const rootStyles = getComputedStyle(document.documentElement);
    const value = rootStyles.getPropertyValue(variableName);
    return `hsl(${value.trim()})`;
  }