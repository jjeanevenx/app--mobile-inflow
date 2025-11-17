import { colors } from '@/src/utils/colors';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface ProgressProps {
  value?: number;
  max?: number;
  style?: ViewStyle;
  indicatorColor?: string;
  backgroundColor?: string;
}

export function Progress({
  value = 0,
  max = 100,
  style,
  indicatorColor = colors.primary,
  backgroundColor = 'rgba(99, 102, 241, 0.2)',
}: ProgressProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedWidth]);

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: indicatorColor,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    borderRadius: 9999,
  },
});
