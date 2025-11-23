import {
    Award,
    Book,
    BookOpen,
    Calendar,
    CheckCircle2,
    Zap
} from 'lucide-react-native';

  // Mock Data
export const USER_LEVEL = {
  current: 12,
  currentXP: 2845,
  nextLevelXP: 3000,
  xpToNextLevel: 155,
};

export const STATS = [
  {
    id: '1',
    icon: BookOpen,
    iconColor: '#155DFC',
    iconBg: '#E3EDFF',
    value: 47,
    label: 'Artigos lidos',
  },
  {
    id: '2',
    icon: CheckCircle2,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    value: 5,
    label: 'Trilhas completas',
  },
  {
    id: '3',
    icon: Calendar,
    iconColor: '#FF6B35',
    iconBg: '#FFE8E0',
    value: 23,
    label: 'Dias seguidos',
  },
  {
    id: '4',
    icon: Award,
    iconColor: '#8b5cf6',
    iconBg: '#EDE9FE',
    value: 8,
    label: 'Conquistas',
  },
];

export const ACHIEVEMENTS = [
  {
    id: '1',
    icon: Zap,
    iconColor: '#FFA500',
    iconBg: '#FFE5B4',
    title: 'Maratonista',
    description: '7 dias consecutivos',
    status: 'unlocked',
    badgeText: 'Desbloqueado',
  },
  {
    id: '2',
    icon: Book,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Leitor Voraz',
    description: 'Leia 50 artigos',
    status: 'locked',
    progress: 47,
    total: 50,
  },
  {
    id: '3',
    icon: Award,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Mestre do Conhecimento',
    description: 'Complete 10 trilhas',
    status: 'locked',
    progress: 5,
    total: 10,
  },
];

export const RECENT_ACTIVITIES = [
  {
    id: '1',
    title: 'IA e o Futuro do Trabalho',
    date: 'Hoje',
    xp: 50,
  },
  {
    id: '2',
    title: 'Machine Learning Básico - Aula',
    date: 'Hoje',
    xp: 75,
  },
  {
    id: '3',
    title: 'Fundamentos de IA',
    date: 'Ontem',
    xp: 500,
  },
  {
    id: '4',
    title: 'Deep Learning Explicado',
    date: '2 dias atrás',
    xp: 50,
  },
];