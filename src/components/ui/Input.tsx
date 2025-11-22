import { colors } from '@/src/constants/colors';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
        placeholderTextColor={colors.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    height: 36,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f3f3f5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.secondary,
    borderWidth: 2,
    backgroundColor: colors.card,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: '#ececf0',
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});
