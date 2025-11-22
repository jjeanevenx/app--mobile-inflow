import React from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeIn as RNFadeIn } from 'react-native-reanimated';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
  direction?: 'up' | 'down' | 'none';
}

/**
 * FadeIn Component
 * 
 * @param delay - Delay em ms antes de iniciar a animação (padrão: 0)
 * @param duration - Duração da animação em ms (padrão: 300)
 * @param direction - Direção da animação: 'up', 'down', 'none' (padrão: 'none')
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 300,
  direction = 'none',
  style 
}: FadeInProps) {
  const getAnimation = () => {
    //const baseConfig = { delay, duration };
    
    switch (direction) {
      case 'up':
        return FadeInUp.delay(delay).duration(duration);
      case 'down':
        return FadeInDown.delay(delay).duration(duration);
      default:
        return RNFadeIn.delay(delay).duration(duration);
    }
  };

  return (
    <Animated.View entering={getAnimation()} style={style}>
      {children}
    </Animated.View>
  );
}

/**
 * Anima múltiplos filhos com delay escalonado
 */
interface StaggerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'none';
}

export function Stagger({ 
  children, 
  staggerDelay = 100,
  initialDelay = 0,
  duration = 300,
  direction = 'none'
}: StaggerProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <FadeIn 
          key={index}
          delay={initialDelay + (index * staggerDelay)}
          duration={duration}
          direction={direction}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
}
