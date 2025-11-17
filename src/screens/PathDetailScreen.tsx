import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { Award, CheckCircle, ChevronLeft, Clock, Lock, PlayCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PathDetailScreenProps {
  navigation: any;
  route: {
    params: {
      pathId: string;
    };
  };
}

const MOCK_PATH = {
  id: '1',
  title: 'Desenvolvedor React Native',
  description: 'Domine o desenvolvimento mobile multiplataforma com React Native. Aprenda desde os conceitos básicos até técnicas avançadas de otimização e publicação de apps.',
  category: 'Tecnologia',
  difficulty: 'Intermediário',
  totalHours: 40,
  modules: [
    {
      id: '1',
      title: 'Introdução ao React Native',
      description: 'Configuração do ambiente e primeiros passos',
      duration: '2h 30min',
      lessons: 8,
      completed: true,
    },
    {
      id: '2',
      title: 'Componentes e Estilização',
      description: 'Aprenda a criar e estilizar componentes',
      duration: '3h 15min',
      lessons: 10,
      completed: true,
    },
    {
      id: '3',
      title: 'Navegação e Rotas',
      description: 'React Navigation e fluxos de telas',
      duration: '2h 45min',
      lessons: 7,
      completed: true,
    },
    {
      id: '4',
      title: 'Estado e Contexto',
      description: 'Gerenciamento de estado com hooks',
      duration: '4h 00min',
      lessons: 12,
      completed: true,
    },
    {
      id: '5',
      title: 'APIs e Backend',
      description: 'Integração com serviços externos',
      duration: '3h 30min',
      lessons: 9,
      completed: true,
      current: true,
    },
    {
      id: '6',
      title: 'Animações',
      description: 'Animated API e Reanimated',
      duration: '3h 20min',
      lessons: 8,
      completed: false,
      locked: false,
    },
    {
      id: '7',
      title: 'Performance',
      description: 'Otimização e melhores práticas',
      duration: '2h 50min',
      lessons: 6,
      completed: false,
      locked: false,
    },
    {
      id: '8',
      title: 'Testing',
      description: 'Testes unitários e E2E',
      duration: '3h 10min',
      lessons: 7,
      completed: false,
      locked: false,
    },
    {
      id: '9',
      title: 'Publicação',
      description: 'Deploy na App Store e Play Store',
      duration: '2h 40min',
      lessons: 5,
      completed: false,
      locked: false,
    },
  ],
};

export function PathDetailScreen({ navigation, route }: PathDetailScreenProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  
  const { pathId } = route.params;
  const path = MOCK_PATH; // Em produção, buscar pelo ID

  const completedModules = path.modules.filter(m => m.completed).length;
  const progress = (completedModules / path.modules.length) * 100;

  const getModuleIcon = (module: typeof path.modules[0]) => {
    if (module.completed) {
      return <CheckCircle size={24} color={colors.success} fill={colors.success} />;
    } else if (module.locked) {
      return <Lock size={24} color={colors.textSecondary} />;
    } else if (module.current) {
      return <PlayCircle size={24} color={colors.primary} fill={colors.primary} />;
    } else {
      return <PlayCircle size={24} color={colors.textSecondary} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trilha de Aprendizado</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Path Info Card */}
        <Card style={styles.infoCard}>
          <CardContent style={styles.infoContent}>
            <View style={styles.badges}>
              <Badge variant="secondary">{path.category}</Badge>
              <Badge variant="outline">{path.difficulty}</Badge>
            </View>

            <Text style={styles.pathTitle}>{path.title}</Text>
            <Text style={styles.pathDescription}>{path.description}</Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Clock size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{path.totalHours}h total</Text>
              </View>
              <View style={styles.stat}>
                <Award size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{path.modules.length} módulos</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Seu Progresso</Text>
                <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
              </View>
              <Progress value={progress} />
              <Text style={styles.progressText}>
                {completedModules} de {path.modules.length} módulos completos
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Modules List */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Módulos</Text>
          
          {path.modules.map((module, index) => (
            <Card key={module.id} style={styles.moduleCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (!module.locked) {
                    // TODO: Navigate to module content
                  }
                }}
                disabled={module.locked}
              >
                <CardContent style={styles.moduleContent}>
                  <View style={styles.moduleHeader}>
                    <View style={styles.moduleIcon}>
                      {getModuleIcon(module)}
                    </View>
                    
                    <View style={styles.moduleInfo}>
                      <View style={styles.moduleTop}>
                        <Text style={styles.moduleNumber}>Módulo {index + 1}</Text>
                        {module.current && (
                          <Badge variant="default" style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>Em andamento</Text>
                          </Badge>
                        )}
                      </View>
                      
                      <Text 
                        style={[
                          styles.moduleTitle,
                          module.locked && styles.moduleLockedText,
                        ]}
                      >
                        {module.title}
                      </Text>
                      
                      <Text 
                        style={[
                          styles.moduleDescription,
                          module.locked && styles.moduleLockedText,
                        ]}
                      >
                        {module.description}
                      </Text>

                      <View style={styles.moduleStats}>
                        <Text style={styles.moduleStatText}>
                          {module.lessons} aulas
                        </Text>
                        <Text style={styles.moduleDivider}>•</Text>
                        <Text style={styles.moduleStatText}>
                          {module.duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CardContent>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  infoContent: {
    padding: 20,
    gap: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  pathTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  pathDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modulesSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  moduleCard: {
    marginBottom: 12,
  },
  moduleContent: {
    padding: 16,
  },
  moduleHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  moduleIcon: {
    paddingTop: 2,
  },
  moduleInfo: {
    flex: 1,
    gap: 6,
  },
  moduleTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moduleNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentBadgeText: {
    fontSize: 10,
    color: '#ffffff',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  moduleDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  moduleLockedText: {
    opacity: 0.5,
  },
  moduleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moduleStatText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moduleDivider: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
