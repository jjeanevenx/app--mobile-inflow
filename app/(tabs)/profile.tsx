import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import {
  Edit2,
  Settings,
  Target,
  TrendingUp
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleEditProfile = () => {
    // Implementar navegação para editar perfil
  };

  const handleEditInterests = () => {
    // Implementar navegação para editar interesses
  };

  const handleManageGoals = () => {
    // Implementar navegação para gerenciar metas
  };

  const handleViewReport = () => {
    router.push('/(screens)/progress');
  };

  const handleViewJourney = () => {
    router.push('/(screens)/journey');
  };

  const handleViewPaths = () => {
    router.push('/(tabs)/learn');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header simples */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={tokens.colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card de Perfil */}
        <FadeIn delay={0} duration={400}>
          <View style={styles.profileCard}>
            {/* Avatar e Info */}
            <View style={styles.profileInfo}>
              {/* Avatar com iniciais */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MS</Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>Maria Santos</Text>
                <Text style={styles.profileEmail}>maria.santos@gmail.com</Text>
              </View>
            </View>

            {/* Botão Editar Perfil */}
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Edit2 size={16} color={tokens.colors.foreground} />
              <Text style={styles.editProfileText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </FadeIn>

        {/* Cards de Estatísticas - 3 colunas */}
        <View style={styles.statsContainer}>
          {/* Card Concluídos */}
          <FadeIn delay={100} duration={400}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <TrendingUp size={20} color={tokens.colors.primary} />
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Concluídos</Text>
            </View>
          </FadeIn>

          {/* Card Em progresso */}
          <FadeIn delay={150} duration={400}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Target size={20} color={tokens.colors.primary} />
              </View>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Em progresso</Text>
            </View>
          </FadeIn>

          {/* Card Dias ativos */}
          <FadeIn delay={200} duration={400}>
            <View style={styles.statCard}>
              <View style={styles.statActiveIndicator}>
                <View style={styles.activeDot} />
              </View>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Dias ativos</Text>
            </View>
          </FadeIn>
        </View>

        {/* Card Meus Interesses */}
        <FadeIn delay={250} duration={400}>
          <View style={styles.interestsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Meus Interesses</Text>
              <TouchableOpacity onPress={handleEditInterests}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDescription}>
              Adicione seus interesses para receber conteúdo personalizado
            </Text>
          </View>
        </FadeIn>

        {/* Card Minhas Metas */}
        <FadeIn delay={300} duration={400}>
          <View style={styles.goalsCard}>
            <View style={styles.cardHeader}>
              <View style={styles.goalsHeaderLeft}>
                <Target size={20} color={tokens.colors.primary} />
                <Text style={styles.cardTitle}>Minhas Metas</Text>
              </View>
              <TouchableOpacity onPress={handleManageGoals}>
                <Text style={styles.editButton}>Gerenciar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDescription}>
              Defina suas metas de aprendizado
            </Text>
          </View>
        </FadeIn>

        {/* Card Ações Rápidas */}
        <FadeIn delay={350} duration={400}>
          <View style={styles.actionsCard}>
            <Text style={styles.cardTitle}>Ações Rápidas</Text>
            
            {/* Botões de Ação */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewReport}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Ver Relatório Completo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewJourney}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Minha Jornada</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewPaths}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Trilhas de Aprendizado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: tokens.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    padding: 25,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    gap: 40,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: tokens.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '400',
    color: tokens.colors.primaryForeground,
    lineHeight: 32,
  },
  profileTextContainer: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  profileEmail: {
    fontSize: 14,
    color: tokens.colors.textSecondary,
    lineHeight: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 36,
    backgroundColor: tokens.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    gap: 32,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  statIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statActiveIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.colors.primary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
  },
  interestsCard: {
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    padding: 21,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    gap: 36,
  },
  goalsCard: {
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    padding: 21,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    gap: 36,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  editButton: {
    fontSize: 14,
    color: tokens.colors.primary,
    fontWeight: '400',
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 14,
    color: tokens.colors.textSecondary,
    lineHeight: 20,
  },
  actionsCard: {
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    padding: 21,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    gap: 36,
  },
  actionsContainer: {
    gap: 8,
  },
  actionButton: {
    height: 36,
    backgroundColor: tokens.colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 24,
  },
});