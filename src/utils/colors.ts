export const colors = {
  // Primárias (tema Inflow)
  primary: '#6366f1',      // Indigo
  secondary: '#a855f7',    // Purple
  
  // Background
  background: '#f8f9fa',
  card: '#ffffff',
  
  // Texto
  text: '#030213',
  textSecondary: '#717182',
  textMuted: '#9ca3af',
  
  // Borders
  border: 'rgba(0, 0, 0, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.05)',
  
  // Status
  success: '#15803d',
  successLight: '#dcfce7',
  error: '#b91c1c',
  errorLight: '#fee2e2',
  warning: '#a16207',
  warningLight: '#fef3c7',
  info: '#1d4ed8',
  infoLight: '#dbeafe',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Gradientes
  gradientStart: '#6366f1',
  gradientEnd: '#a855f7',
};

export type ColorKey = keyof typeof colors;
