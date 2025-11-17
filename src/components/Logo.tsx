import { colors } from '@/src/utils/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export function Logo({ 
  variant = 'full', 
  size = 'md', 
  showTagline = false,
}: LogoProps) {
  const dimensions = {
    sm: { icon: 24, text: 14, tagline: 10 },
    md: { icon: 32, text: 18, tagline: 12 },
    lg: { icon: 48, text: 24, tagline: 14 },
    xl: { icon: 64, text: 32, tagline: 16 },
  };

  const dim = dimensions[size];

  const LogoIcon = () => (
    <Svg width={dim.icon} height={dim.icon} viewBox="0 0 32 32" fill="none">
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
          <Stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        d="M8 4 L24 4 C26.2 4 28 5.8 28 8 L28 24 C28 26.2 26.2 28 24 28 L8 28 C5.8 28 4 26.2 4 24 L4 8 C4 5.8 5.8 4 8 4 Z"
        fill="url(#grad1)"
      />
      <Path
        d="M12 10 L12 22 M16 10 L16 22 M20 10 L20 22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M10 16 L22 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  return (
    <View style={styles.container}>
      {variant === 'full' && <LogoIcon />}
      <View style={variant === 'full' ? styles.textContainer : undefined}>
        <Text style={[styles.logoText, { fontSize: dim.text }]}>Inflow</Text>
        {showTagline && (
          <Text style={[styles.tagline, { fontSize: dim.tagline }]}>
            Sempre Relevante
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  logoText: {
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    color: colors.textSecondary,
    marginTop: 2,
  },
});
