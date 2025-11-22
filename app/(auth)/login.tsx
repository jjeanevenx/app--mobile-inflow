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

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {

    // resetar erros
    setEmailError('');
    setPasswordError('');

    // validar email
    let hasError = false;
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
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      hasError = true;
    }

    if (hasError) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setLoading(true);
    try {
      await signIn({ email, password });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // redirecionar para a tela de onboarding
      console.log('Login bem-sucedido, redirecionando para onboarding');
      router.replace('/(tabs)');
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Erro no login', error.message);
      setLoading(false);
    }
  };


  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.background} />
      
      
      {/* Header */}
      <FadeIn delay={0} duration={300}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color={tokens.colors.foreground} />
          </TouchableOpacity>
        </View>
      </FadeIn>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        <FadeIn delay={100} duration={400}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={200} duration={400}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bem-vindo de volta</Text>
            <Text style={styles.subtitle}>
              Entre para continuar sua jornada
            </Text>
          </View>
        </FadeIn>

        {/* Form */}
        <View style={styles.form}>
          <FadeIn delay={300} duration={400}>
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

          <FadeIn delay={350} duration={400}>
            <Input
              label="Senha"
              placeholder="••••••••"
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

          <FadeIn delay={400} duration={400}>
            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.7}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </FadeIn>

          <FadeIn delay={450} duration={400}>
            <Button
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              size="lg"
              style={styles.loginButton}
            >
              Entrar
            </Button>
          </FadeIn>
        </View>

        {/* Rodapé */}
        <FadeIn delay={600} duration={400}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/(auth)/signup');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.footerLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </FadeIn>
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
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
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
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.primary,
    fontWeight: tokens.fontWeight.medium,
  },
  loginButton: {
    marginTop: tokens.spacing.sm,
  },

  // Divider "ou"
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: tokens.spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: tokens.colors.border,
  },
  dividerText: {
    paddingHorizontal: tokens.spacing.md,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.mutedForeground,
  },

  // Google Button
  googleButton: {
    borderColor: tokens.colors.border,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.foreground,
  },
  googleButtonText: {
    fontSize: tokens.fontSize.base,
    color: tokens.colors.foreground,
    fontWeight: tokens.fontWeight.medium,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: tokens.spacing.xl,
  },
  footerText: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.mutedForeground,
  },
  footerLink: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.primary,
    fontWeight: tokens.fontWeight.semibold,
  },
});