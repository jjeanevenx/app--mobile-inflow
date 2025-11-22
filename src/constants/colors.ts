import { tokens } from './tokens';

export const colors = tokens.colors;
export const spacing = tokens.spacing;
export const radius = tokens.radius;
export const shadow = tokens.shadow;



// Backwards compatibility (código antigo)
export default {
  // Brand
  primary: tokens.colors.primary,
  secondary: tokens.colors.secondary,
  
  // Base
  background: tokens.colors.background,
  
  // Text
  text: tokens.colors.text,
  textSecondary: tokens.colors.textSecondary,
  
  // UI
  border: tokens.colors.border,
  card: tokens.colors.card,
  
  // Status
  success: tokens.colors.success,
  warning: tokens.colors.warning,
  error: tokens.colors.error,
  
};