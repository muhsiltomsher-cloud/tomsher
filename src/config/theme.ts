
export const theme = {
  colors: {
    primary: '#003d88',
    secondary: '#bee1e6',
    accent: '#faede9',
    primaryDark: '#002a5c',
    primaryLight: '#0052b3',
    secondaryDark: '#9bc5ca',
    secondaryLight: '#d4f0f3',
    accentDark: '#f5d5c9',
    accentLight: '#fff9f7',
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  fonts: {
    family: {
      primary: '"Manrope", sans-serif',
      fallback: 'system-ui, -apple-system, sans-serif',
    },
    size: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    spring: '600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in',
    fadeOut: 'fadeOut 0.3s ease-out',
    slideUp: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    slideDown: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    scaleIn: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  
  hover: {
    scale: 'scale(1.05)',
    scaleSmall: 'scale(1.02)',
    lift: 'translateY(-4px)',
    liftSmall: 'translateY(-2px)',
  },
  
  focus: {
    ring: '0 0 0 3px rgba(0, 61, 136, 0.1)',
    ringOffset: '0 0 0 2px white, 0 0 0 4px rgba(0, 61, 136, 0.2)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

export const createGradient = (from: string, to: string, direction: string = '135deg'): string => {
  return `linear-gradient(${direction}, ${from} 0%, ${to} 100%)`;
};

export const cssKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.9);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const smoothTransition = (properties: string[] = ['all']): string => {
  return properties.map(prop => `${prop} ${theme.transitions.base}`).join(', ');
};

export const hoverEffect = (type: 'scale' | 'lift' | 'scaleSmall' | 'liftSmall' = 'scale'): string => {
  return theme.hover[type];
};

export default theme;
