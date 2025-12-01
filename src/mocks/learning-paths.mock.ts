import { CategoryType } from "@/src/types/categoryType";

// Mock Data - Estatísticas
export const STATS = {
  activePaths: 6,
  averageProgress: 42,
  lessonsWatched: 132,
};

// Mock Data - Trilhas
export const LEARNING_PATHS = [
  {
    id: '1',
    title: 'Fundamentos de Inteligência Artificial',
    level: 'Intermediário',
    levelColor: '#F0B100',
    totalLessons: 24,
    duration: '8 semanas',
    progress: 16,
    nextLesson: 'Redes Neurais Convolucionais',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NjM4MjA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Python para Ciência de Dados',
    level: 'Intermediário',
    levelColor: '#F0B100',
    totalLessons: 32,
    duration: '10 semanas',
    progress: 15,
    nextLesson: 'Pandas e Manipulação de Dados',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1667372531881-6f975b1c86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzYzODUwMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Design Thinking na Prática',
    level: 'Iniciante',
    levelColor: '#10B981',
    totalLessons: 18,
    duration: '6 semanas',
    progress: 0,
    nextLesson: 'Introdução ao Design Thinking',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1753162661552-530ba424fc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0aGlua2luZyUyMGNyZWF0aXZlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzODUwMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Análise de Dados Avançada',
    level: 'Avançado',
    levelColor: '#EF4444',
    totalLessons: 28,
    duration: '9 semanas',
    progress: 8,
    nextLesson: 'Machine Learning com Python',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjM4NTA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Gestão de Projetos Ágeis',
    level: 'Intermediário',
    levelColor: '#F0B100',
    totalLessons: 20,
    duration: '7 semanas',
    progress: 12,
    nextLesson: 'Scrum Framework na Prática',
    category: 'Negócios',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  },
  {
    id: '6',
    title: 'UI/UX Design Avançado',
    level: 'Avançado',
    levelColor: '#EF4444',
    totalLessons: 26,
    duration: '8 semanas',
    progress: 5,
    nextLesson: 'Design Systems e Componentes',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  },
];

export const CATEGORIES: { id: CategoryType; icon: string }[] = [
  { id: 'Todas', icon: '📚' },
  { id: 'Tecnologia', icon: '💻' },
  { id: 'Negócios', icon: '💼' },
  { id: 'Design', icon: '🎨' },
];
