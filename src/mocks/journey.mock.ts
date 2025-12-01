import {
  Award,
  Book,
  BookOpen,
  Calendar,
  CheckCircle2,
  Zap,
  Target,
  Trophy,
  Star,
} from 'lucide-react-native';

// Mock Data - Nível do Usuário
export const USER_LEVEL = {
  current: 12,
  currentXP: 2845,
  nextLevelXP: 3000,
  xpToNextLevel: 155,
};

// Mock Data - Estatísticas
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

// Mock Data - Conquistas
export const ACHIEVEMENTS = [
  {
    id: '1',
    icon: Zap,
    iconColor: '#FFA500',
    iconBg: '#FFE5B4',
    title: 'Maratonista',
    description: '7 dias consecutivos de aprendizado',
    status: 'unlocked',
    badgeText: 'Desbloqueado',
  },
  {
    id: '2',
    icon: Book,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Leitor Voraz',
    description: 'Leia 50 artigos para desbloquear',
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
    description: 'Complete 10 trilhas para desbloquear',
    status: 'locked',
    progress: 5,
    total: 10,
  },
  {
    id: '4',
    icon: Target,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Foco Total',
    description: 'Complete 5 trilhas em sequência',
    status: 'locked',
    progress: 2,
    total: 5,
  },
  {
    id: '5',
    icon: Trophy,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Campeão',
    description: 'Alcance o nível 20',
    status: 'locked',
    progress: 12,
    total: 20,
  },
  {
    id: '6',
    icon: Star,
    iconColor: '#A0A0A0',
    iconBg: '#F5F5F5',
    title: 'Estrela em Ascensão',
    description: 'Ganhe 5000 XP no total',
    status: 'locked',
    progress: 2845,
    total: 5000,
  },
];

// Mock Data - Atividades Recentes
export const RECENT_ACTIVITIES = [
  {
    id: '1',
    title: 'IA e o Futuro do Trabalho',
    date: 'Hoje, 14:30',
    xp: 50,
  },
  {
    id: '2',
    title: 'Machine Learning Básico - Aula 3',
    date: 'Hoje, 10:15',
    xp: 75,
  },
  {
    id: '3',
    title: 'Fundamentos de IA - Trilha Completa',
    date: 'Ontem, 18:45',
    xp: 500,
  },
  {
    id: '4',
    title: 'Deep Learning Explicado',
    date: 'Ontem, 15:20',
    xp: 50,
  },
  {
    id: '5',
    title: 'Python para Data Science - Módulo 2',
    date: '2 dias atrás, 16:00',
    xp: 100,
  },
  {
    id: '6',
    title: 'Blockchain e Web3: Fundamentos',
    date: '3 dias atrás, 11:30',
    xp: 75,
  },
];
