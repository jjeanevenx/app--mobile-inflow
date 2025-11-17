import { colors } from '@/src/utils/colors';

export const CATEGORIES = [
  { id: 'all', label: 'Todos', color: colors.primary },
  { id: 'tech', label: 'Tecnologia', color: '#3b82f6' },
  { id: 'design', label: 'Design', color: '#8b5cf6' },
  { id: 'business', label: 'Negócios', color: '#10b981' },
  { id: 'marketing', label: 'Marketing', color: '#f59e0b' },
  { id: 'data', label: 'Dados', color: '#06b6d4' },
];


export const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', label: 'Todas', count: 24 },
  { id: 'unlocked', label: 'Desbloqueadas', count: 12 },
  { id: 'locked', label: 'Bloqueadas', count: 12 },
];