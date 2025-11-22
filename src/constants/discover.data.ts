import { colors } from './colors';

export	const CATEGORIES = [
    { id: 'all', label: 'Todos', color: colors.primary },
    { id: 'tech', label: 'Tecnologia', color: '#3b82f6' },
    { id: 'design', label: 'Design', color: '#8b5cf6' },
    { id: 'business', label: 'Negócios', color: '#10b981' },
    { id: 'marketing', label: 'Marketing', color: '#f59e0b' },
    { id: 'data', label: 'Dados', color: '#06b6d4' },
  ];
  
export const CONTENT = [
    {
      id: '1',
      title: 'Introdução ao React Native',
      category: 'Tecnologia',
      author: 'Ana Silva',
      duration: '3h 30min',
      rating: 4.8,
      students: 1250,
      level: 'intermediário'
    },
    {
      id: '2',
      title: 'Design System do Zero',
      category: 'Design',
      author: 'Carlos Mendes',
      duration: '2h 15min',
      rating: 4.9,
      students: 890,
      level: 'intermediário'
    },
    {
      id: '3',
      title: 'Growth Hacking Avançado',
      category: 'Marketing',
      author: 'Maria Santos',
      duration: '4h 00min',
      rating: 4.7,
      students: 2100,
      level: 'intermediário'
    },
    {
      id: '4',
      title: 'Data Science com Python',
      category: 'Dados',
      author: 'Pedro Costa',
      duration: '5h 45min',
      rating: 4.9,
      students: 3400,
      level: 'intermediário'
    },
    {
      id: '5',
      title: 'Estratégias de Produto',
      category: 'Negócios',
      author: 'Julia Martins',
      duration: '3h 20min',
      rating: 4.6,
      students: 1680,
      level: 'intermediário'
    },
  ];