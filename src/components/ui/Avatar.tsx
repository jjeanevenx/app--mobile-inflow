import { colors } from '@/src/constants/colors';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface AvatarProps {
  source?: { uri: string } | number;
  fallback?: string;
  size?: number;
  style?: ViewStyle;
  fallbackStyle?: ViewStyle;
  fallbackTextStyle?: TextStyle;
}

export function Avatar({
  source,
  fallback = '?',
  size = 40,
  style,
  fallbackStyle,
  fallbackTextStyle,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const containerStyle = [
    styles.container,
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ];

  const fallbackContainerStyle = [
    styles.fallback,
    { width: size, height: size, borderRadius: size / 2 },
    fallbackStyle,
  ];

  const textStyle = [
    styles.fallbackText,
    { fontSize: size * 0.4 },
    fallbackTextStyle,
  ];

  if (!source || imageError) {
    return (
      <View style={fallbackContainerStyle}>
        <Text style={textStyle}>{fallback.charAt(0).toUpperCase()}</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image
        source={source}
        style={styles.image}
        onError={() => setImageError(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    backgroundColor: '#ececf0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
