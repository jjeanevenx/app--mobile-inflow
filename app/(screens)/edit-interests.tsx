import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PRESET_INTERESTS = [
  'Carreira',
  'Tecnologia',
  'Liderança',
  'Inovação',
  'Empreendedorismo',
  'Marketing',
  'Vendas',
  'Finanças',
  'Produtividade',
  'Design',
  'Negócios',
  'Desenvolvimento Pessoal',
];

const MAX_INTERESTS = 5;

export default function EditInterestsScreen() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Tecnologia',
    'Liderança',
    'Inovação',
  ]);
  const [customInterest, setCustomInterest] = useState('');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((i) => i !== interest));
    } else {
      if (selectedInterests.length < MAX_INTERESTS) {
        setSelectedInterests((prev) => [...prev, interest]);
      } else {
        Alert.alert(
          'Limite atingido',
          `Você pode selecionar no máximo ${MAX_INTERESTS} interesses.`
        );
      }
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim()) {
      if (selectedInterests.length < MAX_INTERESTS) {
        if (!selectedInterests.includes(customInterest.trim())) {
          setSelectedInterests((prev) => [...prev, customInterest.trim()]);
          setCustomInterest('');
        } else {
          Alert.alert('Interesse duplicado', 'Este interesse já foi adicionado.');
        }
      } else {
        Alert.alert(
          'Limite atingido',
          `Você pode selecionar no máximo ${MAX_INTERESTS} interesses.`
        );
      }
    }
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleSave = () => {
    // Aqui você salvaria no backend/AsyncStorage
    Alert.alert('Sucesso', 'Interesses atualizados com sucesso!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={tokens.colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Interesses</Text>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Interesses Selecionados */}
        {selectedInterests.length > 0 && (
          <FadeIn delay={0} duration={400}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Selecionados ({selectedInterests.length}/{MAX_INTERESTS})
              </Text>
              <View style={styles.selectedContainer}>
                {selectedInterests.map((interest, index) => (
                  <FadeIn key={interest} delay={index * 50} duration={300}>
                    <View style={styles.selectedChip}>
                      <Text style={styles.selectedChipText}>{interest}</Text>
                      <TouchableOpacity
                        onPress={() => removeInterest(interest)}
                        activeOpacity={0.7}
                      >
                        <X size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </FadeIn>
                ))}
              </View>
            </View>
          </FadeIn>
        )}

        {/* Adicionar Interesse Personalizado */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Adicionar Interesse Personalizado</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite um interesse..."
                placeholderTextColor="#A0A0A0"
                value={customInterest}
                onChangeText={setCustomInterest}
                maxLength={30}
                returnKeyType="done"
                onSubmitEditing={addCustomInterest}
              />
              <TouchableOpacity
                style={[
                  styles.addButton,
                  !customInterest.trim() && styles.addButtonDisabled,
                ]}
                onPress={addCustomInterest}
                activeOpacity={0.7}
                disabled={!customInterest.trim()}
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>

        {/* Interesses Sugeridos */}
        <FadeIn delay={200} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sugestões</Text>
            <View style={styles.chipsContainer}>
              {PRESET_INTERESTS.map((interest, index) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <FadeIn key={interest} delay={250 + index * 30} duration={300}>
                    <TouchableOpacity
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => toggleInterest(interest)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[styles.chipText, isSelected && styles.chipTextSelected]}
                      >
                        {interest}
                      </Text>
                    </TouchableOpacity>
                  </FadeIn>
                );
              })}
            </View>
          </View>
        </FadeIn>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 24,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.primary,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    marginBottom: 16,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: tokens.colors.primary,
    borderRadius: 999,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 12,
  },
  selectedChipText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    height: 44,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: tokens.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: tokens.colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  chipTextSelected: {
    color: tokens.colors.primary,
  },
  bottomSpacer: {
    height: 32,
  },
});
