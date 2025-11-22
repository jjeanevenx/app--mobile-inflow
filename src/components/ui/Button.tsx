import { colors } from '@/src/constants/colors';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'default' || variant === 'destructive' ? '#ffffff' : colors.primary}
        />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },

  // Variant styles
  variant_default: {
    backgroundColor: colors.primary,
  },
  text_default: {
    color: '#ffffff',
  },

  variant_destructive: {
    backgroundColor: colors.error,
  },
  text_destructive: {
    color: '#ffffff',
  },

  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text_outline: {
    color: colors.text,
  },

  variant_secondary: {
    backgroundColor: '#ececf0',
  },
  text_secondary: {
    color: colors.text,
  },

  variant_ghost: {
    backgroundColor: 'transparent',
  },
  text_ghost: {
    color: colors.text,
  },

  variant_link: {
    backgroundColor: 'transparent',
  },
  text_link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  // Size styles
  size_default: {
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textSize_default: {
    fontSize: 14,
  },

  size_sm: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  textSize_sm: {
    fontSize: 13,
  },

  size_lg: {
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  textSize_lg: {
    fontSize: 15,
  },

  size_icon: {
    width: 36,
    height: 36,
    padding: 0,
  },
  textSize_icon: {
    fontSize: 14,
  },
});