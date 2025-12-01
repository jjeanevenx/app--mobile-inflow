import { FadeIn } from '@/src/components/animated';
import { Avatar } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

interface GoogleAccountPickerProps {
  visible: boolean;
  accounts: GoogleAccount[];
  onClose: () => void;
  onSelectAccount: (account: GoogleAccount) => void;
  onUseAnotherAccount: () => void;
  loading?: boolean;
}

export function GoogleAccountPicker({
  visible,
  accounts,
  onClose,
  onSelectAccount,
  onUseAnotherAccount,
  loading = false,
}: GoogleAccountPickerProps) {
  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const handleSelectAccount = (account: GoogleAccount) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelectAccount(account);
  };

  const handleUseAnother = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onUseAnotherAccount();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          <FadeIn delay={0} duration={300}>
            <View style={styles.modal}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Escolher uma conta</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                  activeOpacity={0.7}
                  disabled={loading}
                >
                  <X size={24} color={tokens.colors.mutedForeground} />
                </TouchableOpacity>
              </View>

              {/* Accounts List */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {accounts.map((account, index) => (
                  <FadeIn key={account.id} delay={100 + index * 50} duration={300}>
                    <TouchableOpacity
                      style={styles.accountItem}
                      onPress={() => handleSelectAccount(account)}
                      activeOpacity={0.7}
                      disabled={loading}
                    >
                      <Avatar
                        source={{uri: account.photoUrl ?? ''}}
                        fallback={account.name.charAt(0).toUpperCase()}
                        size={tokens.spacing.md}
                      />
                      <View style={styles.accountInfo}>
                        <Text style={styles.accountName} numberOfLines={1}>
                          {account.name}
                        </Text>
                        <Text style={styles.accountEmail} numberOfLines={1}>
                          {account.email}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </FadeIn>
                ))}

                {/* Use Another Account */}
                <FadeIn delay={100 + accounts.length * 50} duration={300}>
                  <TouchableOpacity
                    style={styles.useAnotherButton}
                    onPress={handleUseAnother}
                    activeOpacity={0.7}
                    disabled={loading}
                  >
                    <View style={styles.useAnotherIcon}>
                      <Text style={styles.useAnotherIconText}>+</Text>
                    </View>
                    <Text style={styles.useAnotherText}>Usar outra conta</Text>
                  </TouchableOpacity>
                </FadeIn>
              </ScrollView>

              {/* Footer */}
              <FadeIn delay={200 + accounts.length * 50} duration={300}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Ao continuar, você concorda com nossos{' '}
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.footerLink}>Termos de Serviço</Text>
                  </TouchableOpacity>
                  <Text style={styles.footerText}> e </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.footerLink}>Política de Privacidade</Text>
                  </TouchableOpacity>
                </View>
              </FadeIn>
            </View>
          </FadeIn>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  modal: {
    backgroundColor: tokens.colors.card,
    borderRadius: tokens.radius.xl,
    ...tokens.shadow.lg,
    overflow: 'hidden',
    maxHeight: '80%',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  title: {
    fontSize: tokens.fontSize.xl,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.foreground,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Scroll View
  scrollView: {
    maxHeight: 400,
  },
  scrollContent: {
    paddingVertical: tokens.spacing.sm,
  },

  // Account Item
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: tokens.fontSize.base,
    fontWeight: tokens.fontWeight.medium,
    color: tokens.colors.foreground,
    marginBottom: 2,
  },
  accountEmail: {
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.mutedForeground,
  },

  // Use Another Account
  useAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    gap: tokens.spacing.md,
    marginTop: tokens.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
  useAnotherIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: tokens.colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  useAnotherIconText: {
    fontSize: 24,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.mutedForeground,
  },
  useAnotherText: {
    fontSize: tokens.fontSize.base,
    fontWeight: tokens.fontWeight.medium,
    color: tokens.colors.foreground,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
  footerText: {
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.mutedForeground,
    textAlign: 'center',
  },
  footerLink: {
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.primary,
    fontWeight: tokens.fontWeight.medium,
  },
});
