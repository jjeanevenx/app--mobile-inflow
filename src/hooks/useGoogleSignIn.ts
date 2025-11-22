import { GoogleAccount } from '@/src/components/GoogleAccountPicker';
import { auth } from '@/src/services/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Haptics from 'expo-haptics';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useGoogleSignIn() {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    async function configureGoogleSignIn() {
      try {
        // Configure o Google Sign In com seu Web Client ID
        // Você pode obter isso no Google Cloud Console
        await GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'YOUR_WEB_CLIENT_ID',
          offlineAccess: true,
          scopes: ['profile', 'email'],
        });

        setIsConfigured(true);

        // Verificar se há usuário já logado
        const hasPreviousSignIn =  GoogleSignin.hasPreviousSignIn();
        
        if (hasPreviousSignIn) {
          const currentUser =  GoogleSignin.getCurrentUser();
          
          if (currentUser) {
            const account: GoogleAccount = {
              id: currentUser.user.id,
              name: currentUser.user.name || '',
              email: currentUser.user.email,
              photoUrl: currentUser.user.photo || undefined,
            };
            
            setAccounts([account]);
          }
        }
      } catch (error) {
        console.error('Error configuring Google Sign In:', error);
      }
    }

    configureGoogleSignIn();
  }, []);

  /**
   * Abre o modal de seleção de contas
   */
  const openPicker = async () => {
    if (!isConfigured) {
      Alert.alert(
        'Configuração Pendente',
        'Google Sign In ainda não está configurado. Configure o Web Client ID nas variáveis de ambiente.'
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Buscar contas disponíveis
      const hasPreviousSignIn =  GoogleSignin.hasPreviousSignIn();
      
      if (hasPreviousSignIn) {
        const currentUser =  GoogleSignin.getCurrentUser();
        
        if (currentUser) {
          const account: GoogleAccount = {
            id: currentUser.user.id,
            name: currentUser.user.name || '',
            email: currentUser.user.email,
            photoUrl: currentUser.user.photo || undefined,
          };
          
          setAccounts([account]);
        }
      } else {
        setAccounts([]);
      }
      
      setIsPickerVisible(true);
    } catch (error) {
      console.error('Error opening picker:', error);
      Alert.alert('Erro', 'Não foi possível carregar as contas do Google');
    }
  };

  /**
   * Fecha o modal
   */
  const closePicker = () => {
    setIsPickerVisible(false);
  };

  /**
   * Faz login com conta Google selecionada
   */
  const handleSelectAccount = async (account: GoogleAccount) => {
    setLoading(true);

    try {
      // Fazer login com Google
      const userInfo = await GoogleSignin.signIn();
      
      // Obter o ID token
      const idToken = userInfo.data?.idToken;
      
      if (!idToken) {
        throw new Error('Não foi possível obter o token de autenticação');
      }

      // Criar credencial do Firebase com o token do Google
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Fazer login no Firebase
      await signInWithCredential(auth, credential);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      Alert.alert(
        'Login realizado',
        `Bem-vindo, ${account.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              closePicker();
              setLoading(false);
            },
          },
        ]
      );
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
      let errorMessage = 'Erro ao fazer login com Google';
      
      if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Login cancelado';
      } else if (error.code === 'IN_PROGRESS') {
        errorMessage = 'Login já em andamento';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services não disponível';
      }
      
      console.error('Error signing in:', error);
      Alert.alert('Erro', errorMessage);
      setLoading(false);
    }
  };

  /**
   * Adicionar e fazer login com outra conta Google
   */
  const handleUseAnotherAccount = async () => {
    setLoading(true);

    try {
      // Deslogar da conta atual (se houver)
      await GoogleSignin.signOut();
      
      // Fazer novo login (abrirá o seletor de contas do Google)
      const userInfo = await GoogleSignin.signIn();
      
      const idToken  = userInfo.data?.idToken;
      
      if (!idToken) {
        throw new Error('Não foi possível obter o token de autenticação');
      }

      // Criar credencial do Firebase
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Fazer login no Firebase
      await signInWithCredential(auth, credential);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      Alert.alert(
        'Login realizado',
        `Bem-vindo, ${userInfo.data?.user?.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              closePicker();
              setLoading(false);
            },
          },
        ]
      );
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
      let errorMessage = 'Erro ao adicionar conta';
      
      if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Login cancelado';
      } else if (error.code === 'IN_PROGRESS') {
        errorMessage = 'Login já em andamento';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services não disponível';
      }
      
      console.error('Error using another account:', error);
      Alert.alert('Erro', errorMessage);
      setLoading(false);
    }
  };

  return {
    isPickerVisible,
    accounts,
    loading,
    isConfigured,
    openPicker,
    closePicker,
    handleSelectAccount,
    handleUseAnotherAccount,
  };
}