import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  Key,
  Mail,
  Moon,
  Shield,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={tokens.colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferências do App */}
        <FadeIn delay={0} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferências do App</Text>

            {/* Notificações Push */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Bell size={20} color={tokens.colors.foreground} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Notificações Push</Text>
                  <Text style={styles.settingDescription}>
                    Receber alertas de novos conteúdos
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#E5E7EB', true: '#A5B4FC' }}
                thumbColor={pushNotifications ? '#6366F1' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
              />
            </View>

            {/* Notificações por Email */}
            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Mail size={20} color={tokens.colors.foreground} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Notificações por Email</Text>
                  <Text style={styles.settingDescription}>Receber resumos semanais</Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E5E7EB', true: '#A5B4FC' }}
                thumbColor={emailNotifications ? '#6366F1' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
              />
            </View>

            {/* Modo Escuro */}
            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Moon size={20} color={tokens.colors.foreground} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Modo Escuro</Text>
                  <Text style={styles.settingDescription}>Tema escuro para o app</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#A5B4FC' }}
                thumbColor={darkMode ? '#6366F1' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
              />
            </View>

            {/* Idioma */}
            <TouchableOpacity
              style={[styles.settingItem, styles.settingItemBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Globe size={20} color={tokens.colors.foreground} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Idioma</Text>
                  <Text style={styles.settingDescription}>Português (Brasil)</Text>
                </View>
              </View>
              <ChevronRight size={20} color={tokens.colors.mutedForeground} />
            </TouchableOpacity>
          </View>
        </FadeIn>

        {/* Conta e Segurança */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conta e Segurança</Text>

            {/* Alterar senha */}
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Key size={20} color={tokens.colors.foreground} />
                </View>
                <Text style={styles.settingLabelSimple}>Alterar senha</Text>
              </View>
              <ChevronRight size={20} color={tokens.colors.mutedForeground} />
            </TouchableOpacity>

            {/* Privacidade e segurança */}
            <TouchableOpacity
              style={[styles.settingItem, styles.settingItemBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Shield size={20} color={tokens.colors.foreground} />
                </View>
                <Text style={styles.settingLabelSimple}>Privacidade e segurança</Text>
              </View>
              <ChevronRight size={20} color={tokens.colors.mutedForeground} />
            </TouchableOpacity>
          </View>
        </FadeIn>

        {/* Suporte e Informações */}
        <FadeIn delay={200} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suporte e Informações</Text>

            {/* Ajuda e suporte */}
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <HelpCircle size={20} color={tokens.colors.foreground} />
                </View>
                <Text style={styles.settingLabelSimple}>Ajuda e suporte</Text>
              </View>
              <ChevronRight size={20} color={tokens.colors.mutedForeground} />
            </TouchableOpacity>

            {/* Sobre o Inflow */}
            <TouchableOpacity
              style={[styles.settingItem, styles.settingItemBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Info size={20} color={tokens.colors.foreground} />
                </View>
                <Text style={styles.settingLabelSimple}>Sobre o Inflow</Text>
              </View>
              <ChevronRight size={20} color={tokens.colors.mutedForeground} />
            </TouchableOpacity>
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
  backButton: {
    padding: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  headerSpacer: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  settingDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 20,
    marginTop: 2,
  },
  settingLabelSimple: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
