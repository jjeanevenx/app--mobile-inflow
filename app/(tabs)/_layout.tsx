import { colors } from '@/src/constants/colors';
import { Tabs } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { Compass, Home, User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const systemButtonAreaHeight = Math.max(insets.bottom, 0);
  
  // Configurar a cor da barra de navegação do sistema no Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Definir cor escura para os botões do sistema ficarem claros e visíveis
      SystemUI.setBackgroundColorAsync('#000000');
    }
    
    // Cleanup: restaurar cor padrão ao sair
    return () => {
      if (Platform.OS === 'android') {
        SystemUI.setBackgroundColorAsync('#ffffff');
      }
    };
  }, []);
  
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 60 + systemButtonAreaHeight,
            paddingBottom: systemButtonAreaHeight,
            paddingTop: 8,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Descobrir',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      </Tabs>
    </>
  );
}
