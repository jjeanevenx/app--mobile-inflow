import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

interface WelcomeScreenProps {
  navigation: any;
}

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Do seu mundo para todos os mundos possíveis';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Top Section with Logo */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Logo variant="full" size="xl" showTagline />
        </View>
      </View>

      {/* Middle Section with Dynamic Slogan */}
      <View style={styles.middleSection}>
        <View style={styles.sloganCard}>
          <Text style={styles.sloganText}>
            {displayedText}
            <Text style={styles.cursor}>|</Text>
          </Text>
        </View>
      </View>

      {/* Bottom Section with Buttons */}
      <View style={styles.bottomSection}>
        <View style={styles.buttonContainer}>
          <Button 
            onPress={() => navigation.navigate('Signup')}
            size="lg"
            style={styles.primaryButton}
          >
            Começar Agora
          </Button>
          
          <Button 
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            size="lg"
            style={styles.secondaryButton}
          >
            Já tenho conta
          </Button>
        </View>

        <Text style={styles.footerText}>
          Personalize sua jornada de aprendizado
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sloganCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minHeight: 100,
    justifyContent: 'center',
    width: '100%',
  },
  sloganText: {
    fontSize: 20,
    lineHeight: 28,
    color: colors.text,
    textAlign: 'center',
  },
  cursor: {
    color: colors.primary,
    fontWeight: '700',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 24,
  },
});
