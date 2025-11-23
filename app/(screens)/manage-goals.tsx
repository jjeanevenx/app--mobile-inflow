import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Target, Trash2 } from 'lucide-react-native';
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

const MAX_GOALS = 5;

interface Goal {
  id: string;
  text: string;
}

export default function ManageGoalsScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Completar 10 trilhas de aprendizado' },
    { id: '2', text: 'Ler 3 artigos por semana' },
    { id: '3', text: 'Alcançar nível 20' },
  ]);
  const [currentGoal, setCurrentGoal] = useState('');

  const addGoal = () => {
    if (currentGoal.trim()) {
      if (goals.length < MAX_GOALS) {
        const newGoal: Goal = {
          id: Date.now().toString(),
          text: currentGoal.trim(),
        };
        setGoals((prev) => [...prev, newGoal]);
        setCurrentGoal('');
      } else {
        Alert.alert(
          'Limite atingido',
          `Você pode adicionar no máximo ${MAX_GOALS} metas.`
        );
      }
    }
  };

  const removeGoal = (id: string) => {
    Alert.alert('Remover Meta', 'Tem certeza que deseja remover esta meta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          setGoals((prev) => prev.filter((goal) => goal.id !== id));
        },
      },
    ]);
  };

  const handleSave = () => {
    // Aqui você salvaria no backend/AsyncStorage
    Alert.alert('Sucesso', 'Metas atualizadas com sucesso!', [
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
        <Text style={styles.headerTitle}>Minhas Metas</Text>
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
        {/* Adicionar Nova Meta */}
        <FadeIn delay={0} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Adicionar Meta ({goals.length}/{MAX_GOALS})
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua meta..."
                placeholderTextColor="#A0A0A0"
                value={currentGoal}
                onChangeText={setCurrentGoal}
                maxLength={100}
                multiline
                returnKeyType="done"
                onSubmitEditing={addGoal}
              />
              <TouchableOpacity
                style={[
                  styles.addButton,
                  !currentGoal.trim() && styles.addButtonDisabled,
                ]}
                onPress={addGoal}
                activeOpacity={0.7}
                disabled={!currentGoal.trim()}
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>

        {/* Metas Atuais */}
        {goals.length > 0 && (
          <FadeIn delay={100} duration={400}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suas Metas</Text>
              <View style={styles.goalsContainer}>
                {goals.map((goal, index) => (
                  <FadeIn key={goal.id} delay={150 + index * 50} duration={300}>
                    <View style={styles.goalCard}>
                      <View style={styles.goalLeft}>
                        <View style={styles.goalIconContainer}>
                          <Target size={20} color={tokens.colors.primary} />
                        </View>
                        <Text style={styles.goalText}>{goal.text}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeGoal(goal.id)}
                        style={styles.deleteButton}
                        activeOpacity={0.7}
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </FadeIn>
                ))}
              </View>
            </View>
          </FadeIn>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <FadeIn delay={100} duration={400}>
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Target size={48} color="#A0A0A0" />
              </View>
              <Text style={styles.emptyTitle}>Nenhuma meta definida</Text>
              <Text style={styles.emptyDescription}>
                Adicione suas metas de aprendizado para acompanhar seu progresso
              </Text>
            </View>
          </FadeIn>
        )}

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
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
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
    minHeight: 44,
    maxHeight: 88,
    textAlignVertical: 'top',
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
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    gap: 12,
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: tokens.colors.foreground,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#717182',
    lineHeight: 20,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 32,
  },
});
