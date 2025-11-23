import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import { CheckCircle2, Loader2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function PostSignupLoadingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Animações
  const [iconRotation] = useState(new Animated.Value(0));
  const [iconScale] = useState(new Animated.Value(0));
  const [step1Opacity] = useState(new Animated.Value(0));
  const [step2Opacity] = useState(new Animated.Value(0));
  const [step3Opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animação do ícone principal - escala
    Animated.spring(iconScale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Animação do ícone principal - rotação contínua
    Animated.loop(
      Animated.timing(iconRotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Sequência de steps
    const timer1 = setTimeout(() => {
      setCurrentStep(1);
      Animated.timing(step1Opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 500);

    const timer2 = setTimeout(() => {
      setCurrentStep(2);
      Animated.timing(step2Opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 2500);

    const timer3 = setTimeout(() => {
      setCurrentStep(3);
      Animated.timing(step3Opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 4500);

    // Redirecionar após completar
    //TODO: Verificar se o usuário está logado e se tem perfil completo
    const finalTimer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finalTimer);
    };
  }, []);

  const iconRotate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getStepOpacity = (stepNumber: number) => {
    if (stepNumber === 1) return step1Opacity;
    if (stepNumber === 2) return step2Opacity;
    return step3Opacity;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Ícone Animado */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              { scale: iconScale },
              { rotate: iconRotate },
            ],
          },
        ]}
      >
        <View style={styles.iconGlow} />
        <View style={styles.iconContent}>
          {/* Estrela */}
          <Svg width="118" height="118" viewBox="0 0 118 118" fill="none">
            <Path
              d="M58.768 9.79465L71.9733 49.1893L107.741 58.768L71.9733 68.3466L58.768 107.741L49.1893 71.9733L9.79465 58.768L49.1893 49.1893L58.768 9.79465Z"
              stroke="#4F39F6"
              strokeWidth="9.79465"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M97.9465 9.79465V29.384"
              stroke="#4F39F6"
              strokeWidth="9.79465"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M107.741 19.5893H88.1519"
              stroke="#4F39F6"
              strokeWidth="9.79465"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M19.5893 107.741L9.79465 97.9465L19.5893 88.1519L29.384 97.9465L19.5893 107.741Z"
              stroke="#4F39F6"
              strokeWidth="9.79465"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </Animated.View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Preparando tudo para você</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Estamos personalizando sua experiência com base no seu perfil
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {/* Step 1 - Analisando perfil */}
          <Animated.View
            style={[styles.stepItem, { opacity: getStepOpacity(1) }]}
          >
            {currentStep >= 1 ? (
              <CheckCircle2 size={20} color="#00A63E" strokeWidth={2} />
            ) : (
              <View style={styles.stepIconPlaceholder} />
            )}
            <Text
              style={[
                styles.stepText,
                currentStep >= 1 && styles.stepTextActive,
              ]}
            >
              Analisando seu perfil profissional
            </Text>
          </Animated.View>

          {/* Step 2 - Carregando conteúdos */}
          <Animated.View
            style={[styles.stepItem, { opacity: getStepOpacity(2) }]}
          >
            {currentStep > 2 ? (
              <CheckCircle2 size={20} color="#00A63E" strokeWidth={2} />
            ) : currentStep === 2 ? (
              <Animated.View
                style={{
                  transform: [{ rotate: iconRotate }],
                }}
              >
                <Loader2 size={20} color="#4F39F6" strokeWidth={2} />
              </Animated.View>
            ) : (
              <View style={styles.stepIconPlaceholder} />
            )}
            <Text
              style={[
                styles.stepText,
                currentStep >= 2 && styles.stepTextActive,
              ]}
            >
              Carregando conteúdos relevantes
            </Text>
          </Animated.View>

          {/* Step 3 - Configurando jornada */}
          <Animated.View
            style={[styles.stepItem, { opacity: getStepOpacity(3) }]}
          >
            {currentStep > 3 ? (
              <CheckCircle2 size={20} color="#00A63E" strokeWidth={2} />
            ) : currentStep === 3 ? (
              <Animated.View
                style={{
                  transform: [{ rotate: iconRotate }],
                }}
              >
                <Loader2 size={20} color="#4F39F6" strokeWidth={2} />
              </Animated.View>
            ) : (
              <View style={styles.stepIconPlaceholder} />
            )}
            <Text
              style={[
                styles.stepText,
                currentStep >= 3 && styles.stepTextActive,
              ]}
            >
              Configurando sua jornada
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    position: 'absolute',
    top: 75,
    left: 77,
    width: 118,
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 9999,
    backgroundColor: 'rgba(79, 57, 246, 0.2)',
    // React Native não suporta blur nativamente, mas podemos simular com opacity
  },
  iconContent: {
    width: 118,
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    top: 368,
    left: 24,
    right: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  stepsContainer: {
    marginTop: 16,
    gap: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIconPlaceholder: {
    width: 20,
    height: 20,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 20,
  },
  stepTextActive: {
    color: '#717182',
  },
});