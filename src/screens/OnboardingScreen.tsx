import { Logo } from '@/src/components/Logo';
import { Badge, Button } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { Check } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface OnboardingScreenProps {
  navigation: any;
}

const INTERESTS = [
  { id: 'technology', label: 'Tecnologia' },
  { id: 'design', label: 'Design' },
  { id: 'business', label: 'Negócios' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'data', label: 'Dados & Analytics' },
  { id: 'programming', label: 'Programação' },
  { id: 'ai', label: 'Inteligência Artificial' },
  { id: 'productivity', label: 'Produtividade' },
  { id: 'leadership', label: 'Liderança' },
  { id: 'finance', label: 'Finanças' },
  { id: 'health', label: 'Saúde & Bem-estar' },
  { id: 'languages', label: 'Idiomas' },
  { id: 'arts', label: 'Artes' },
  { id: 'music', label: 'Música' },
  { id: 'writing', label: 'Escrita' },
];

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      if (selectedInterests.length < 10) {
        setSelectedInterests([...selectedInterests, id]);
      }
    }
  };

  const handleContinue = async () => {
    if (selectedInterests.length < 3) return;

    setLoading(true);
    // TODO: Salvar interesses no Supabase
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Main');
    }, 1500);
  };

  const canContinue = selectedInterests.length >= 3;
  const isMaxSelected = selectedInterests.length >= 10;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Logo variant="full" size="lg" />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Personalize sua jornada</Text>
          <Text style={styles.subtitle}>
            Selecione no mínimo 3 áreas de interesse para começar
          </Text>
        </View>

        {/* Counter */}
        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {selectedInterests.length} de 10 selecionados
            </Text>
          </View>
          {canContinue && (
            <Badge variant="success">
              <Check size={12} color="#ffffff" />
              <Text style={styles.badgeText}>Pronto!</Text>
            </Badge>
          )}
        </View>

        {/* Interests Grid */}
        <View style={styles.interestsGrid}>
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestChip,
                  isSelected && styles.interestChipSelected,
                  !isSelected && isMaxSelected && styles.interestChipDisabled,
                ]}
                onPress={() => toggleInterest(interest.id)}
                activeOpacity={0.7}
                disabled={!isSelected && isMaxSelected}
              >
                <Text
                  style={[
                    styles.interestText,
                    isSelected && styles.interestTextSelected,
                  ]}
                >
                  {interest.label}
                </Text>
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <Check size={14} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Button
          onPress={handleContinue}
          loading={loading}
          disabled={!canContinue}
          size="lg"
          style={styles.continueButton}
        >
          Continuar
        </Button>
        
        {!canContinue && (
          <Text style={styles.helperText}>
            Selecione pelo menos {3 - selectedInterests.length} interesse(s)
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  counter: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  counterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  badgeText: {
    color: '#ffffff',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestChip: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interestChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  interestChipDisabled: {
    opacity: 0.4,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  interestTextSelected: {
    color: '#ffffff',
  },
  checkIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButton: {
    width: '100%',
  },
  helperText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
});
