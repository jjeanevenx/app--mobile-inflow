export const tokens = {
colors: {
    // Brand
    primary: '#6366f1',           // --primary: #6366f1
    primaryForeground: '#ffffff', // --primary-foreground: #ffffff
    primaryLight: '#e0e7ff',      // Para backgrounds de ícones
    
    secondary: '#a855f7',         // Roxo
    secondaryLight: '#f3e8ff',
    
    // Base
    background: '#ffffff',        // --background: #ffffff
    foreground: '#1F2937',        // --foreground: oklch(0.145 0 0)
    
    // UI Elements
    card: '#ffffff',              // --card: #ffffff
    cardForeground: '#1F2937',    // --card-foreground
    
    muted: '#ececf0',             // --muted: #ececf0
    mutedForeground: '#717182',   // --muted-foreground: #717182
    
    accent: '#f3f4ff',            // --accent: #f3f4ff
    accentForeground: '#030213',  // --accent-foreground: #030213
    
    // Status Colors
    destructive: '#d4183d',       // --destructive: #d4183d
    destructiveForeground: '#ffffff',
    
    success: '#10b981',           // Green
    successLight: '#dcfce7',
    
    warning: '#f59e0b',           // Orange
    warningLight: '#fef3c7',
    
    error: '#ef4444',             // Red
    errorLight: '#fee2e2',
    
    // Text
    text: '#1F2937',              // Primary text
    textSecondary: '#6B7280',     // Secondary text
    textTertiary: '#9CA3AF',      // Tertiary text
    
    // Borders & Inputs
    border: 'rgba(0, 0, 0, 0.1)', // --border: rgba(0, 0, 0, 0.1)
    input: '#f3f3f5',             // --input-background: #f3f3f5
    ring: '#a855f7',              // --ring: #a855f7 (focus ring)
    
    // Chart Colors (para futuros gráficos)
    chart1: '#6366f1',
    chart2: '#8b5cf6',
    chart3: '#a855f7',
    chart4: '#c084fc',
    chart5: '#e9d5ff',
  },
  
  /**
   * SPACING - Sistema 8pt grid
   * Usar para padding, margin, gap
   */
  spacing: {
    xs: 4,      // 0.25rem
    sm: 8,      // 0.5rem
    md: 16,     // 1rem
    lg: 24,     // 1.5rem
    xl: 32,     // 2rem
    '2xl': 48,  // 3rem
    '3xl': 64,  // 4rem
    '4xl': 80,  // 5rem
  },
  
  /**
   * BORDER RADIUS
   */
  radius: {
    sm: 6,      // Pequeno
    md: 10,     // Médio (0.625rem do web)
    lg: 16,     // Grande
    xl: 24,     // Extra grande
    full: 9999, // Circular
  },
  
  /**
   * TYPOGRAPHY - Type Scale
   */
  fontSize: {
    xs: 12,     // Caption
    sm: 14,     // Small
    base: 16,   // Body
    lg: 18,     // Large body
    xl: 20,     // h4
    '2xl': 24,  // h3
    '3xl': 30,  // h2
    '4xl': 36,  // h1
  },
  
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  lineHeight: {
    tight: 1.25,   // Headings
    normal: 1.5,   // Body text
    relaxed: 1.75, // Comfortable reading
  },
  
  /**
   * SHADOWS - Elevação
   */
  shadow: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 25,
      elevation: 8,
    },
  },
  
  /**
   * BREAKPOINTS (para futuros layouts responsivos)
   */
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  
  /**
   * Z-INDEX
   */
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

// Type helpers
export type TokenColors = typeof tokens.colors;
export type TokenSpacing = typeof tokens.spacing;
export type TokenRadius = typeof tokens.radius;
export type TokenFontSize = typeof tokens.fontSize;
export type TokenFontWeight = typeof tokens.fontWeight;
export type TokenShadow = typeof tokens.shadow;
