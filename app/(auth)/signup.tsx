import { FadeIn } from '@/src/components/animated';
import { Logo } from '@/src/components/Logo';
import { Button, Input } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { useAuth } from '@/src/hooks/useAuth';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // resetar erros
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setTermsError('');

    // validar nome
    let hasError = false;
    if (!name) {
      setNameError('Nome é obrigatório');
      hasError = true;
    } else if (name.length < 3) {
      setNameError('Nome deve ter pelo menos 3 caracteres');
      hasError = true;
    }

    // validar email
    if (!email) {
      setEmailError('Email é obrigatório');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Email inválido');
      hasError = true;
    }

    // validar senha
    if (!password) {
      setPasswordError('Senha é obrigatória');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Senha deve ter pelo menos 8 caracteres');
      hasError = true;
    }

    if (!agreeTerms) {
      setTermsError('Você deve concordar com os termos');
      hasError = true;
    }

    if (hasError) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setLoading(true);
    try {
      await signUp({ email, password, name });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(auth)/onboarding');
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Erro no cadastro', error.message);
      setLoading(false);
    }
  };



  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  // togglear termos
  const toggleTerms = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAgreeTerms(!agreeTerms);
    setTermsError('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.background} />
      
      
      <FadeIn delay={0} duration={300}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color={tokens.colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Criar uma nova conta</Text>
        </View>
      </FadeIn>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo "i" Circle */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.logoContainer}>
            <Logo size="md" variant="colorful" />
          </View>
        </FadeIn>

        <FadeIn delay={200} duration={400}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>
              Crie sua conta para começar a usar o inFlow
            </Text>
          </View>
        </FadeIn>
        <View style={styles.form}>


          {/* Nome */}
          <FadeIn delay={400} duration={400}>
            <Input
              label="Nome"
              placeholder="Seu nome completo"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError('');
              }}
              autoCapitalize="words"
              error={nameError}
            />
          </FadeIn>

          {/* Email */}
          <FadeIn delay={450} duration={400}>
            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
            />
          </FadeIn>

          {/* Senha */}
          <FadeIn delay={500} duration={400}>
            <Input
              label="Senha"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry
              autoCapitalize="none"
              error={passwordError}
            />
          </FadeIn>

          {/* Checkbox Termos */}
          <FadeIn delay={550} duration={400}>
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={toggleTerms}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  agreeTerms && styles.checkboxChecked,
                  termsError && styles.checkboxError,
                ]}>
                  {agreeTerms && (
                    <Text style={styles.checkboxCheck}>✓</Text>
                  )}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    Ao continuar, você concorda com nossos{' '}
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.termsLink}>Termos de Uso</Text>
                  </TouchableOpacity>
                  <Text style={styles.termsText}> e </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.termsLink}>Política de Privacidade</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {termsError && (
                <Text style={styles.termsErrorText}>{termsError}</Text>
              )}
            </View>
          </FadeIn>

          {/* Botão Criar Conta */}
          <FadeIn delay={600} duration={400}>
            <Button
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              size="lg"
            >
              Criar conta
            </Button>
          </FadeIn>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: tokens.fontSize.base,
    color: tokens.colors.mutedForeground,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  titleContainer: {
    marginBottom: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.fontSize['3xl'],
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.foreground,
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    fontSize: tokens.fontSize.base,
    color: tokens.colors.mutedForeground,
    lineHeight: 24,
  },
  form: {
    gap: tokens.spacing.md,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: tokens.fontSize['2xl'],
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.primary,
    marginRight: tokens.spacing.sm,
  },
  googleButtonText: {
    fontSize: tokens.fontSize.base,
    color: tokens.colors.foreground,
    fontWeight: tokens.fontWeight.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: tokens.spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: tokens.colors.border,
  },
  dividerText: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.mutedForeground,
    marginHorizontal: tokens.spacing.md,
  },
  
  // Checkbox Termos
  termsContainer: {
    marginTop: tokens.spacing.sm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: tokens.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: tokens.colors.primary,
    borderColor: tokens.colors.primary,
  },
  checkboxError: {
    borderColor: tokens.colors.destructive,
  },
  checkboxCheck: {
    color: tokens.colors.background,
    fontSize: 14,
    fontWeight: tokens.fontWeight.bold,
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  termsText: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.mutedForeground,
    lineHeight: 20,
  },
  termsLink: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.primary,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: 20,
  },
  termsErrorText: {
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.destructive,
    marginTop: tokens.spacing.xs,
    marginLeft: 28, // Alinhado com o texto
  },
});