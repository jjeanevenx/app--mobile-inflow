import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import {
  Edit2,
  Settings,
  Target,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 72) / 3; // (total width - paddings) / 3 cards

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/(screens)/settings')}
          activeOpacity={0.7}
        >
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
                <Text style={styles.avatarText}>JS</Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>João Silva</Text>
                <Text style={styles.profileEmail}>joao.silva@gmail.com</Text>
              </View>
            </View>

            {/* Botão Editar Perfil */}
            <TouchableOpacity
              style={styles.editProfileButton}
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
              <TouchableOpacity onPress={() => router.push('/(screens)/edit-interests')}>
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
              <TouchableOpacity onPress={() => router.push('/(screens)/manage-goals')}>
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
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(screens)/progress')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Ver Relatório Completo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(screens)/journey')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Minha Jornada</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(screens)/learning-paths')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Trilhas de Aprendizado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  settingsButton: {
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 25,
    gap: 40,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
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
    fontWeight: '400',
    color: '#717182',
    lineHeight: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
    height: 36,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 17,
    gap: 32,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statActiveIndicator: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#6366F1',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 16,
    textAlign: 'center',
  },
  interestsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 21,
    gap: 36,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  editButton: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.primary,
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 20,
  },
  goalsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 21,
    gap: 36,
    marginBottom: 24,
  },
  goalsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 21,
    gap: 36,
    marginBottom: 24,
  },
  actionsContainer: {
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});