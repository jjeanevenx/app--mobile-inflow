import { tokens } from '@/src/constants/tokens';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  variant?: 'colorful' | 'white' | 'monochrome';
}

const SIZES = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 120,
};

export function Logo({ 
  size = 'md', 
  style, 
  variant = 'colorful' 
}: LogoProps) {
  const logoSize = SIZES[size];
  
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          background: 'rgba(255, 255, 255, 0.15)',
          wave: '#ffffff',
          border: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 2,
          useGradient: false,
        };
      case 'monochrome':
        return {
          background: tokens.colors.muted,
          wave: tokens.colors.foreground,
          border: 'transparent',
          borderWidth: 0,
          useGradient: false,
        };
      case 'colorful':
      default:
        return {
          background: 'transparent', 
          wave: '#ffffff',
          border: 'transparent',
          borderWidth: 0,
          useGradient: true,
        };
    }
  };

  const colors = getColors();

  return (
    <View style={[{ width: logoSize, height: logoSize }, style]}>
      <Svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 100 100"
        style={{ width: '100%', height: '100%' }}
      >
        <Defs>
          <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={tokens.colors.primary} stopOpacity="1" />
            <Stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <Stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="22"
          fill={colors.useGradient ? 'url(#logoGradient)' : colors.background}
          stroke={colors.border}
          strokeWidth={colors.borderWidth}
        />

        <Path
          d="M 25 55 Q 35 45, 45 50 T 65 50 Q 70 52, 75 48"
          stroke={colors.wave}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <Path
          d="M 25 62 Q 35 52, 45 57 T 65 57 Q 70 59, 75 55"
          stroke={colors.wave}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />

        <Path
          d="M 25 48 Q 35 38, 45 43 T 65 43 Q 70 45, 75 41"
          stroke={colors.wave}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        />
      </Svg>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
