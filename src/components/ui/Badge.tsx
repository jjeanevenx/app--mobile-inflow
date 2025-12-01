import { colors } from '@/src/constants/colors';
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[styles.base, styles[`variant_${variant}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderWidth: 1,
    gap: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Default variant
  variant_default: {
    backgroundColor: colors.primary,
    borderColor: 'transparent',
  },
  text_default: {
    color: '#ffffff',
  },

  // Secondary variant
  variant_secondary: {
    backgroundColor: '#ececf0',
    borderColor: 'transparent',
  },
  text_secondary: {
    color: colors.text,
  },

  // Destructive variant
  variant_destructive: {
    backgroundColor: colors.error,
    borderColor: 'transparent',
  },
  text_destructive: {
    color: '#ffffff',
  },

  // Success variant
  variant_success: {
    backgroundColor: colors.success,
    borderColor: 'transparent',
  },
  text_success: {
    color: '#ffffff',
  },

  // Outline variant
  variant_outline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  text_outline: {
    color: colors.text,
  },
});
