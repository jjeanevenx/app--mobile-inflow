import { FadeIn } from '@/src/components/animated';
import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Do seu mundo para todos os mundos possíveis';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(auth)/login');
  };

  const handleSignup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(auth)/signup');
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#a855f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      {/* Conteúdo Principal - Centralizado */}
      <View style={styles.content}>
        {/* Logo */}
        <FadeIn delay={0} duration={600}>
          <Logo 
            size="xl" 
            variant="white"
          />
        </FadeIn>

        {/* Texto Inflow */}
        <FadeIn delay={200} duration={500}>
          <Text style={styles.brandName}>inFlow</Text>
        </FadeIn>

        {/* Slogan com efeito typewriter */}
        <FadeIn delay={400} duration={500}>
          <View style={styles.sloganContainer}>
            <Text style={styles.sloganText}>
              {displayedText}
              <Text style={styles.cursor}>|</Text>
            </Text>
          </View>
        </FadeIn>
      </View>

      {/* Botões Inferiores */}
      <View style={styles.bottomSection}>
        <FadeIn delay={500} duration={500}>
          <Button 
            onPress={handleLogin}
            size="lg"
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          >
            Entrar
          </Button>
        </FadeIn>
        
        <FadeIn delay={600} duration={500}>
          <Button 
            onPress={handleSignup}
            variant="outline"
            size="lg"
            style={styles.signupButton}
            textStyle={styles.signupButtonText}
          >
            Criar Conta
          </Button>
        </FadeIn>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.xl,
  },
  
  // Nome da Marca
  brandName: {
    fontSize: 48,
    fontWeight: tokens.fontWeight.bold,
    color: '#ffffff',
    marginBottom: tokens.spacing.xs,
    letterSpacing: -1,
  },

  // Slogan
  sloganContainer: {
    marginTop: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.lg,
  },
  sloganText: {
    fontSize: tokens.fontSize.xl,
    lineHeight: 32,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: tokens.fontWeight.medium,
  },
  cursor: {
    color: '#ffffff',
    fontWeight: tokens.fontWeight.bold,
  },

  // Seção Inferior
  bottomSection: {
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing['4xl'],
    gap: tokens.spacing.md,
  },
  
  // Botão de Login (Primário - Fundo Branco)
  loginButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: tokens.radius.full,
  },
  loginButtonText: {
    color: tokens.colors.primary,
  },
  
  // Botão de Cadastro (Outline - Transparent com borda branca)
  signupButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: tokens.radius.full,
  },
  signupButtonText: {
    color: '#ffffff',
  },
});