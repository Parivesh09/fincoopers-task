export const THEME_COLORS = {
  primary: {
    light: 'hsl(221.2 83.2% 53.3%)',
    dark: 'hsl(217.2 91.2% 59.8%)',
  },
  
  success: {
    light: 'hsl(142.1 76.2% 36.3%)',
    dark: 'hsl(142.1 70.6% 45.3%)',
  },
  warning: {
    light: 'hsl(38 92% 50%)',
    dark: 'hsl(48 96% 89%)',
  },
  info: {
    light: 'hsl(199 89% 48%)',
    dark: 'hsl(199 89% 48%)',
  },
  destructive: {
    light: 'hsl(0 84.2% 60.2%)',
    dark: 'hsl(0 62.8% 30.6%)',
  },
} as const;

export const THEME_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  default: 'default',
} as const;

type ThemeVariant = keyof typeof THEME_VARIANTS;

export const COMPONENT_THEMES = {
  card: {
    default: 'bg-card text-card-foreground border-border',
    primary: 'bg-primary text-primary-foreground border-primary',
    secondary: 'bg-secondary text-secondary-foreground border-secondary',
    success: 'bg-success text-success-foreground border-success',
    warning: 'bg-warning text-warning-foreground border-warning',
    destructive: 'bg-destructive text-destructive-foreground border-destructive',
  },
  button: {
    default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    success: 'bg-success text-success-foreground hover:bg-success/90',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  },
  badge: {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  },
} as const;

export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  scaleIn: 'animate-scale-in',
  spin: 'animate-spin',
} as const;

export const SHADOWS = {
  sm: 'shadow-sm',
  default: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

export const BORDER_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  default: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export function getThemeColor(color: keyof typeof THEME_COLORS, theme: 'light' | 'dark' = 'light') {
  return THEME_COLORS[color][theme];
}

export function getComponentTheme(component: keyof typeof COMPONENT_THEMES, variant: ThemeVariant = 'default') {
  const componentThemes = COMPONENT_THEMES[component] as Record<ThemeVariant, string>;
  return componentThemes[variant] || componentThemes.default;
}

export const CSS_VARS = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  popover: 'hsl(var(--popover))',
  'popover-foreground': 'hsl(var(--popover-foreground))',
  
  primary: 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  
  secondary: 'hsl(var(--secondary))',
  'secondary-foreground': 'hsl(var(--secondary-foreground))',
  
  muted: 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  
  accent: 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
  
  success: 'hsl(var(--success))',
  'success-foreground': 'hsl(var(--success-foreground))',
  warning: 'hsl(var(--warning))',
  'warning-foreground': 'hsl(var(--warning-foreground))',
  info: 'hsl(var(--info))',
  'info-foreground': 'hsl(var(--info-foreground))',
  destructive: 'hsl(var(--destructive))',
  'destructive-foreground': 'hsl(var(--destructive-foreground))',
  
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
} as const; 
