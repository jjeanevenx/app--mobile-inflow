import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        //headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen name="news" options={{ title: 'Notícias' }} />
      <Stack.Screen name="journey" options={{ title: 'Minha Jornada' }} />
      <Stack.Screen name="progress" options={{ title: 'Estatísticas' }} />
      <Stack.Screen name="achievements" options={{ title: 'Conquistas' }} />
      <Stack.Screen name="favorites" options={{ title: 'Favoritos' }} />
      <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
      <Stack.Screen name="help" options={{ title: 'Ajuda e Suporte' }} />
    </Stack>
  );
}
