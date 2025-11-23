import { FadeIn } from '@/src/components/animated';
import { Button } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Check, TrendingUp, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { EXPERIENCE_LEVELS, PRESET_INTERESTS } from '@/src/constants/onboarding.data';
import { styles } from '@/src/styles/onboarding.styles';


const MAX_INTERESTS = 5;
const MAX_GOALS = 5;

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Profissão/Nível, 2: Interesses, 3: Metas
  
  // Step 1 - Profissão e Nível
  const [profession, setProfession] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  
  // Step 2 - Interesses
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState('');

  // Step 3 - Metas Pessoais
  const [goals, setGoals] = useState<string[]>([]);
  const [currentGoal, setCurrentGoal] = useState('');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < MAX_INTERESTS) {
        setSelectedInterests(prev => [...prev, interest]);
      }
    }
  };

  const addCustomInterest = () => {
    const trimmed = customInterest.trim();
    if (
      trimmed &&
      !selectedInterests.includes(trimmed) &&
      selectedInterests.length < MAX_INTERESTS
    ) {
      setSelectedInterests(prev => [...prev, trimmed]);
      setCustomInterest('');
    }
  };

  const removeCustomInterest = (interest: string) => {
    setSelectedInterests(prev => prev.filter(i => i !== interest));
  };

  // Separar interesses personalizados dos presets
  const customInterests = selectedInterests.filter(i => !PRESET_INTERESTS.includes(i));

  const handleContinueStep1 = () => {
    if (profession.trim() && experienceLevel) {
      setStep(2);
    }
  };

  const handleContinueStep2 = () => {
    if (selectedInterests.length > 0) {
      setStep(3);
    }
  };

  const handleAddGoal = () => {
    const trimmed = currentGoal.trim();
    if (
      trimmed &&
      !goals.includes(trimmed) &&
      goals.length < MAX_GOALS
    ) {
      setGoals(prev => [...prev, trimmed]);
      setCurrentGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setGoals(prev => prev.filter(g => g !== goal));
  };

  const handleFinish = () => {
    // TODO: Save all data to Firebase
    const userData = {
      profession: profession.trim(),
      experienceLevel,
      interests: selectedInterests,
      goals,
    };
    console.log('User onboarding data:', userData);
    router.replace('/(auth)/post-signup-loading');
  };

  const canSelectMore = selectedInterests.length < MAX_INTERESTS;
  const remainingSlots = MAX_INTERESTS - selectedInterests.length;
  const canContinueStep1 = profession.trim() && experienceLevel;

  // STEP 1: Profissão e Nível de Experiência
  if (step === 1) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={tokens.colors.primary} />
        
        <LinearGradient
          colors={[tokens.colors.primary, tokens.colors.secondary, 'transparent']}
          locations={[0, 0.5, 1]}
          style={styles.topGradient}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <FadeIn delay={0} duration={400}>
            <View style={styles.header}>
              <Text style={styles.title}>Bem-vindo ao InFlow!</Text>
              <Text style={styles.subtitle}>
                Vamos conhecer você melhor para personalizar sua experiência
              </Text>
            </View>
          </FadeIn>

          {/* Indicador de Progresso */}
          <FadeIn delay={100} duration={400}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '50%' }]} />
              </View>
              <Text style={styles.progressText}>Passo 1 de 3</Text>
            </View>
          </FadeIn>

          {/* A Profissão */}
          <FadeIn delay={200} duration={400}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconContainer}>
                  <Briefcase size={20} color={tokens.colors.primary} />
                </View>
                <Text style={styles.sectionTitle}>Sua Profissão</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: Designer UX, Desenvolvedor, Gestor..."
                placeholderTextColor={tokens.colors.mutedForeground}
                value={profession}
                onChangeText={setProfession}
                returnKeyType="next"
                maxLength={50}
              />
              <Text style={styles.helpText}>
                Isso nos ajuda a recomendar conteúdos relevantes para você
              </Text>
            </View>
          </FadeIn>

          {/* Nível de Experiência */}
          <FadeIn delay={300} duration={400}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconContainer}>
                  <TrendingUp size={20} color={tokens.colors.success} />
                </View>
                <Text style={styles.sectionTitle}>Nível de Experiência</Text>
              </View>
              <View style={styles.experienceGrid}>
                {EXPERIENCE_LEVELS.map((level, index) => {
                  const isSelected = experienceLevel === level.id;
                  return (
                    <FadeIn key={level.id} delay={350 + (index * 60)} duration={400}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setExperienceLevel(level.id)}
                        style={[
                          styles.experienceCard,
                          isSelected && styles.experienceCardSelected,
                        ]}
                      >
                        <View style={styles.experienceHeader}>
                          <Text
                            style={[
                              styles.experienceLabel,
                              isSelected && styles.experienceLabelSelected,
                            ]}
                          >
                            {level.label}
                          </Text>
                          {isSelected && (
                            <View style={styles.checkCircle}>
                              <Check size={14} color={tokens.colors.primaryForeground} strokeWidth={3} />
                            </View>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.experienceDescription,
                            isSelected && styles.experienceDescriptionSelected,
                          ]}
                        >
                          {level.description}
                        </Text>
                      </TouchableOpacity>
                    </FadeIn>
                  );
                })}
              </View>
            </View>
          </FadeIn>

          <View style={styles.spacer} />
        </ScrollView>

        <LinearGradient
          colors={['transparent', tokens.colors.primary, tokens.colors.secondary]}
          locations={[0, 0.7, 1]}
          style={styles.bottomGradient}
          pointerEvents="none"
        />

        <FadeIn delay={600} duration={400}>
          <View style={styles.footer}>
            <Button
              onPress={handleContinueStep1}
              disabled={!canContinueStep1}
              size="lg"
              style={styles.continueButton}
            >
              Continuar para Interesses
            </Button>
          </View>
        </FadeIn>
      </View>
    );
  }

  // STEP 2: Interesses
  if (step === 2) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={tokens.colors.primary} />
        
        <LinearGradient
          colors={[tokens.colors.primary, tokens.colors.secondary, 'transparent']}
          locations={[0, 0.5, 1]}
          style={styles.topGradient}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <FadeIn delay={0} duration={400}>
            <View style={styles.header}>
              <Text style={styles.title}>Seus Interesses</Text>
              <Text style={styles.subtitle}>
                Selecione até 5 áreas de interesse para personalizar seu aprendizado
              </Text>
            </View>
          </FadeIn>

          {/* Indicador de Progresso */}
          <FadeIn delay={100} duration={400}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '100%' }]} />
              </View>
              <Text style={styles.progressText}>Passo 2 de 3</Text>
            </View>
          </FadeIn>

          {/* Contagem de Interesses Selecionados */}
          <FadeIn delay={150} duration={400}>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>
                {selectedInterests.length} de {MAX_INTERESTS} selecionados
              </Text>
              {!canSelectMore && (
                <Text style={styles.maxReachedText}>
                  Limite máximo atingido
                </Text>
              )}
            </View>
          </FadeIn>

          {/* Campo de Interesse Personalizado*/}
          {canSelectMore && (
            <FadeIn delay={200} duration={400}>
              <View style={styles.customInterestContainer}>
                <Text style={styles.customInterestLabel}>
                  Adicionar interesse personalizado
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Inteligência Artificial"
                    placeholderTextColor={tokens.colors.mutedForeground}
                    value={customInterest}
                    onChangeText={setCustomInterest}
                    onSubmitEditing={addCustomInterest}
                    returnKeyType="done"
                    maxLength={30}
                  />
                  {customInterest.trim() && (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={addCustomInterest}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.remainingText}>
                  Você pode adicionar mais {remainingSlots} {remainingSlots === 1 ? 'interesse' : 'interesses'}
                </Text>
              </View>
            </FadeIn>
          )}

          {/* Lista de Interesses Personalizados */}
          {customInterests.length > 0 && (
            <FadeIn delay={250} duration={400}>
              <View style={styles.customInterestsList}>
                <Text style={styles.customInterestsLabel}>
                  Seus interesses personalizados
                </Text>
                <View style={styles.customInterestsGrid}>
                  {customInterests.map((interest) => (
                    <TouchableOpacity
                      key={interest}
                      activeOpacity={0.7}
                      onPress={() => removeCustomInterest(interest)}
                      style={styles.customInterestChip}
                    >
                      <Text style={styles.customInterestText}>{interest}</Text>
                      <View style={styles.customCheckMark}>
                        <X size={14} color={tokens.colors.primary} strokeWidth={3} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.customInterestsHint}>
                  Clique para remover
                </Text>
              </View>
            </FadeIn>
          )}

          {/* Grade de Interesses Sugeridos */}
          <FadeIn delay={300} duration={400}>
            <View style={styles.presetInterestsContainer}>
              <Text style={styles.presetInterestsLabel}>
                Sugestões de interesses
              </Text>
              <View style={styles.interestsGrid}>
                {PRESET_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  const isDisabled = !isSelected && !canSelectMore;

                  return (
                    <TouchableOpacity
                      key={interest}
                      activeOpacity={0.7}
                      onPress={() => toggleInterest(interest)}
                      disabled={isDisabled}
                      style={[
                        styles.interestChip,
                        isSelected && styles.interestChipSelected,
                        isDisabled && styles.interestChipDisabled,
                      ]}
                    >
                      <Text
                        style={[
                          styles.interestText,
                          isSelected && styles.interestTextSelected,
                          isDisabled && styles.interestTextDisabled,
                        ]}
                      >
                        {interest}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkMark}>
                          <X size={14} color={tokens.colors.primaryForeground} strokeWidth={3} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </FadeIn>

          <View style={styles.spacer} />
        </ScrollView>

        <LinearGradient
          colors={['transparent', tokens.colors.primary, tokens.colors.secondary]}
          locations={[0, 0.7, 1]}
          style={styles.bottomGradient}
          pointerEvents="none"
        />

        <FadeIn delay={400} duration={400}>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => setStep(1)}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Button
              onPress={handleContinueStep2}
              disabled={selectedInterests.length === 0}
              size="lg"
              style={styles.continueButton}
            >
              Continuar para Metas
            </Button>
          </View>
        </FadeIn>
      </View>
    );
  }

  // STEP 3: Metas Pessoais
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={tokens.colors.primary} />
      
      <LinearGradient
        colors={[tokens.colors.primary, tokens.colors.secondary, 'transparent']}
        locations={[0, 0.5, 1]}
        style={styles.topGradient}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn delay={0} duration={400}>
          <View style={styles.header}>
            <Text style={styles.title}>Suas Metas Pessoais</Text>
            <Text style={styles.subtitle}>
              Defina até 5 metas para ajudar a direcionar seu aprendizado
            </Text>
          </View>
        </FadeIn>

          {/* Indicador de Progresso */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>Passo 3 de 3</Text>
          </View>
        </FadeIn>

        {/* Contagem de Metas Selecionadas */}
        <FadeIn delay={150} duration={400}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {goals.length} de {MAX_GOALS} metas
            </Text>
            {goals.length >= MAX_GOALS && (
              <Text style={styles.maxReachedText}>
                Limite máximo atingido
              </Text>
            )}
          </View>
        </FadeIn>

        {/* Campo de Meta Pessoal */}
        {goals.length < MAX_GOALS && (
          <FadeIn delay={200} duration={400}>
            <View style={styles.customInterestContainer}>
              <Text style={styles.customInterestLabel}>
                Adicionar meta pessoal
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Aprender IA até o fim do ano"
                  placeholderTextColor={tokens.colors.mutedForeground}
                  value={currentGoal}
                  onChangeText={setCurrentGoal}
                  onSubmitEditing={handleAddGoal}
                  returnKeyType="done"
                  maxLength={50}
                />
                {currentGoal.trim() && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddGoal}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.addButtonText}>Adicionar</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.remainingText}>
                Você pode adicionar mais {MAX_GOALS - goals.length} {MAX_GOALS - goals.length === 1 ? 'meta' : 'metas'}
              </Text>
            </View>
          </FadeIn>
        )}

        {/* Goals List */}
        {goals.length > 0 && (
          <FadeIn delay={250} duration={400}>
            <View style={styles.customInterestsList}>
              <Text style={styles.customInterestsLabel}>
                Suas metas pessoais
              </Text>
              <View style={styles.customInterestsGrid}>
                {goals.map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    activeOpacity={0.7}
                    onPress={() => removeGoal(goal)}
                    style={styles.customGoalChip}
                  >
                    <Text style={styles.customGoalText}>{goal}</Text>
                    <View style={styles.customCheckMark}>
                      <X size={14} color={tokens.colors.primaryForeground} strokeWidth={3} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.customInterestsHint}>
                Clique para remover
              </Text>
            </View>
          </FadeIn>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      <LinearGradient
        colors={['transparent', tokens.colors.primary, tokens.colors.secondary]}
        locations={[0, 0.7, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      <FadeIn delay={400} duration={400}>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => setStep(2)}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Button
            onPress={handleFinish}
            disabled={goals.length === 0}
            size="lg"
            style={styles.finishButton}
          >
            Começar sua jornada
          </Button>
        </View>
      </FadeIn>
    </View>
  );
}
