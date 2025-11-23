# Diagramas de Sequência - InFlow App

Este documento contém os diagramas de sequência dos principais fluxos do aplicativo InFlow.

## 1. Fluxo de Login

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LS as LoginScreen
    participant Auth as useAuth Hook
    participant AS as AuthService
    participant FB as Firebase Auth
    participant FS as Firestore
    participant Tabs as (tabs)/index

    U->>LS: Acessa tela de login
    LS->>LS: Valida email e senha
    
    alt Validação falha
        LS->>U: Exibe erros de validação
    else Validação OK
        U->>LS: Clica em "Entrar"
        LS->>Auth: signIn({email, password})
        Auth->>AS: signIn({email, password})
        AS->>FB: signInWithEmailAndPassword()
        
        alt Credenciais inválidas
            FB-->>AS: Erro de autenticação
            AS-->>Auth: Erro traduzido
            Auth-->>LS: Erro
            LS->>U: Exibe alerta de erro
        else Login bem-sucedido
            FB-->>AS: UserCredential
            AS->>FS: updateDoc(lastActiveAt)
            AS-->>Auth: {user}
            Auth->>Auth: onAuthStateChanged dispara
            Auth->>FS: getUserProfile(userId)
            FS-->>Auth: UserProfile
            Auth->>LS: Estado atualizado
            LS->>Tabs: router.replace('/(tabs)')
            Tabs->>U: Exibe tela principal
        end
    end
```

## 2. Fluxo de Signup (Cadastro)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant SS as SignupScreen
    participant Auth as useAuth Hook
    participant AS as AuthService
    participant FB as Firebase Auth
    participant FS as Firestore
    participant OB as OnboardingScreen

    U->>SS: Acessa tela de cadastro
    U->>SS: Preenche nome, email, senha
    U->>SS: Aceita termos de uso
    U->>SS: Clica em "Criar conta"
    
    SS->>SS: Valida campos
    
    alt Validação falha
        SS->>U: Exibe erros de validação
    else Validação OK
        SS->>Auth: signUp({email, password, name})
        Auth->>AS: signUp({email, password, name})
        AS->>FB: createUserWithEmailAndPassword()
        
        alt Email já existe
            FB-->>AS: Erro
            AS-->>Auth: Erro traduzido
            Auth-->>SS: Erro
            SS->>U: Exibe alerta de erro
        else Cadastro bem-sucedido
            FB-->>AS: UserCredential
            AS->>FB: updateProfile({displayName: name})
            AS->>FS: setDoc(userProfile)
            Note over FS: Cria perfil com:<br/>level: 1, xp: 0,<br/>interests: [], goals: []
            AS-->>Auth: {user}
            Auth->>Auth: onAuthStateChanged dispara
            Auth->>FS: getUserProfile(userId)
            FS-->>Auth: UserProfile
            Auth->>SS: Estado atualizado
            SS->>OB: router.replace('/(auth)/onboarding)')
            OB->>U: Exibe tela de onboarding
        end
    end
```

## 3. Fluxo de Onboarding

```mermaid
sequenceDiagram
    participant U as Usuário
    participant OB as OnboardingScreen
    participant PS as PostSignupLoading
    participant FS as Firestore
    participant Tabs as (tabs)/index

    Note over U,Tabs: Passo 1: Profissão e Nível
    U->>OB: Preenche profissão
    U->>OB: Seleciona nível de experiência
    U->>OB: Clica em "Continuar"
    OB->>OB: Valida dados
    OB->>OB: setStep(2)
    
    Note over U,Tabs: Passo 2: Interesses
    OB->>U: Exibe interesses disponíveis
    U->>OB: Seleciona interesses (máx 5)
    U->>OB: Adiciona interesses customizados
    U->>OB: Clica em "Continuar"
    OB->>OB: Valida seleção
    OB->>OB: setStep(3)
    
    Note over U,Tabs: Passo 3: Metas
    OB->>U: Exibe campo para metas
    U->>OB: Adiciona metas pessoais (máx 5)
    U->>OB: Clica em "Finalizar"
    OB->>OB: Coleta todos os dados
    Note over OB: {profession, experienceLevel,<br/>interests, goals}
    OB->>PS: router.replace('/(auth)/post-signup-loading')
    
    Note over PS: Tela de Loading
    PS->>PS: Anima ícone (3 steps)
    PS->>PS: Step 1: "Analisando perfil"
    PS->>PS: Step 2: "Carregando conteúdos"
    PS->>PS: Step 3: "Configurando jornada"
    
    Note over PS,FS: TODO: Salvar dados no Firebase
    PS->>FS: updateUserProfile(profession, interests, goals)
    FS-->>PS: Confirmação
    
    PS->>Tabs: router.replace('/(tabs)')
    Tabs->>U: Exibe tela principal
```

## 4. Fluxo de Visualização de Conteúdo (Vídeo/Artigo)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant HS as HomeScreen
    participant VP as VideoPlayerScreen
    participant AR as ArticleReaderScreen
    participant Router as Expo Router
    participant FS as Firestore (Opcional)

    Note over U,FS: Cenário: Visualizar Vídeo
    U->>HS: Clica em card de vídeo
    HS->>HS: handleNavigateToVideo(item)
    HS->>Router: router.push('/(screens)/video-player', params)
    Router->>VP: Navega para VideoPlayerScreen
    VP->>VP: Parse params (id, title, author, etc.)
    VP->>U: Exibe player de vídeo
    
    U->>VP: Assistir vídeo
    U->>VP: Marcar como completo
    VP->>FS: updateUserXP(userId, xpGained)
    Note over FS: Ganha XP e atualiza progresso
    
    Note over U,FS: Cenário: Visualizar Artigo
    U->>HS: Clica em card de artigo
    HS->>HS: handleNavigateToArticle(item)
    HS->>Router: router.push('/(screens)/article-reader', params)
    Router->>AR: Navega para ArticleReaderScreen
    AR->>AR: Parse params (id, title, author, etc.)
    AR->>U: Exibe conteúdo do artigo
    
    U->>AR: Ler artigo
    U->>AR: Clica em "Marcar como completo"
    AR->>AR: setCompleted(true)
    AR->>FS: updateUserXP(userId, xpGained)
    Note over FS: Ganha XP e atualiza progresso
    
    U->>AR: Clica em "Abrir no navegador" (se houver URL)
    AR->>AR: Linking.openURL(articleUrl)
```

## 5. Fluxo de Navegação em Trilhas de Aprendizado

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LPS as LearningPathsScreen
    participant LPLS as LearningPathLessonsScreen
    participant VP as VideoPlayerScreen
    participant AR as ArticleReaderScreen
    participant Router as Expo Router

    U->>LPS: Acessa tela de trilhas
    LPS->>LPS: Carrega LEARNING_PATHS mock
    LPS->>U: Exibe lista de trilhas
    
    U->>LPS: Clica em uma trilha
    LPS->>Router: router.push('/(screens)/learning-path-lessons', {pathId})
    Router->>LPLS: Navega para LearningPathLessonsScreen
    LPLS->>LPLS: Carrega MOCK_PATH_DATA[pathId]
    LPLS->>U: Exibe módulos e lições da trilha
    
    U->>LPLS: Clica em uma lição
    
    alt Tipo: Vídeo
        LPLS->>LPLS: createVideoFromLesson(lesson)
        LPLS->>Router: router.push('/(screens)/video-player', params)
        Router->>VP: Navega para VideoPlayerScreen
        VP->>U: Exibe player de vídeo
    else Tipo: Leitura
        LPLS->>LPLS: createArticleFromLesson(lesson)
        LPLS->>Router: router.push('/(screens)/article-reader', params)
        Router->>AR: Navega para ArticleReaderScreen
        AR->>U: Exibe conteúdo do artigo
    else Tipo: Quiz
        LPLS->>LPLS: Preparar quiz (TODO)
        Note over LPLS: Funcionalidade futura
    end
    
    U->>VP/AR: Completa conteúdo
    VP/AR->>VP/AR: Atualiza progresso da trilha
    Note over VP/AR: Atualiza completedLessons<br/>e progressPercentage
```

## 6. Fluxo de Inicialização do App

```mermaid
sequenceDiagram
    participant App as App Inicial
    participant RL as RootLayout
    participant AuthP as AuthProvider
    participant FB as Firebase Auth
    participant Index as app/index.tsx
    participant Welcome as WelcomeScreen
    participant Tabs as (tabs)/index

    App->>RL: Inicia aplicativo
    RL->>RL: SplashScreen.preventAutoHideAsync()
    RL->>AuthP: Renderiza AuthProvider
    AuthP->>FB: onAuthStateChanged listener
    
    alt Usuário não autenticado
        FB-->>AuthP: null
        AuthP->>AuthP: setUser(null), setProfile(null)
        AuthP->>RL: loading = false
        RL->>RL: SplashScreen.hideAsync()
        RL->>Index: Renderiza index.tsx
        Index->>Index: useAuth() - user = null
        Index->>Welcome: Redirect href="/(auth)/onboarding"
        Welcome->>Welcome: Exibe tela de boas-vindas
    else Usuário autenticado
        FB-->>AuthP: User object
        AuthP->>AuthP: setUser(user)
        AuthP->>AuthP: getUserProfile(userId)
        AuthP->>AuthP: setProfile(profile)
        AuthP->>RL: loading = false
        RL->>RL: SplashScreen.hideAsync()
        RL->>Index: Renderiza index.tsx
        Index->>Index: useAuth() - user exists
        Index->>Tabs: Redirect href="/"
        Tabs->>Tabs: Exibe tela principal
    end
```

## 7. Fluxo de Navegação entre Telas Principais

```mermaid
sequenceDiagram
    participant U as Usuário
    participant Tabs as Tab Navigator
    participant Home as HomeScreen
    participant Discover as DiscoverScreen
    participant Journey as JourneyScreen
    participant Profile as ProfileScreen
    participant News as NewsScreen
    participant Paths as LearningPathsScreen

    U->>Tabs: Abre app (usuário autenticado)
    Tabs->>Home: Exibe Home tab
    
    U->>Tabs: Clica em "Descobrir"
    Tabs->>Discover: Navega para Discover tab
    Discover->>U: Exibe conteúdo destacado
    
    U->>Discover: Clica em categoria
    Discover->>Discover: router.push('/(screens)/category-content')
    
    U->>Tabs: Clica em "Jornada"
    Tabs->>Journey: Navega para Journey tab
    Journey->>U: Exibe nível, XP, estatísticas
    
    U->>Tabs: Clica em "Perfil"
    Tabs->>Profile: Navega para Profile tab
    Profile->>U: Exibe informações do usuário
    
    U->>Home: Clica em "Ver todas" (notícias)
    Home->>News: router.push('/(screens)/news')
    News->>U: Exibe lista de notícias
    
    U->>Home: Clica em "Ver todas" (trilhas)
    Home->>Paths: router.push('/(screens)/learning-paths')
    Paths->>U: Exibe lista de trilhas
```

## 8. Fluxo de Atualização de XP e Nível

```mermaid
sequenceDiagram
    participant U as Usuário
    participant Screen as Qualquer Tela
    participant AS as AuthService
    participant FS as Firestore
    participant Auth as useAuth Hook
    participant UI as Interface

    U->>Screen: Completa conteúdo (vídeo/artigo)
    Screen->>AS: updateUserXP(userId, xpGained)
    AS->>FS: getUserProfile(userId)
    FS-->>AS: UserProfile atual
    
    AS->>AS: Calcula novo XP: newXP = profile.xp + xpGained
    AS->>AS: Calcula novo nível: level = floor(newXP / 1000) + 1
    
    alt Nível aumentou
        AS->>FS: updateDoc({xp: newXP, level: newLevel})
        FS-->>AS: Confirmação
        AS-->>Screen: {xp: newXP, level: newLevel}
        Screen->>Auth: refreshProfile()
        Auth->>FS: getUserProfile(userId)
        FS-->>Auth: UserProfile atualizado
        Auth->>UI: Atualiza estado global
        UI->>U: Exibe notificação de nível up
    else Apenas XP aumentou
        AS->>FS: updateDoc({xp: newXP})
        FS-->>AS: Confirmação
        AS-->>Screen: {xp: newXP, level: currentLevel}
        Screen->>Auth: refreshProfile()
        Auth->>UI: Atualiza estado global
    end
```

## 9. Fluxo de Recuperação de Senha

```mermaid
sequenceDiagram
    participant U as Usuário
    participant LS as LoginScreen
    participant AS as AuthService
    participant FB as Firebase Auth

    U->>LS: Clica em "Esqueceu a senha?"
    LS->>LS: Exibe modal/input de email
    
    U->>LS: Digita email
    U->>LS: Clica em "Enviar"
    LS->>LS: Valida email
    
    alt Email inválido
        LS->>U: Exibe erro de validação
    else Email válido
        LS->>AS: resetPassword(email)
        AS->>FB: sendPasswordResetEmail(auth, email)
        
        alt Email não encontrado
            FB-->>AS: Erro auth/user-not-found
            AS-->>LS: "Usuário não encontrado"
            LS->>U: Exibe alerta de erro
        else Email enviado
            FB-->>AS: Sucesso
            AS-->>LS: Sucesso
            LS->>U: Exibe mensagem de sucesso
            Note over U: Email de recuperação enviado
        end
    end
```

## 10. Fluxo de Logout

```mermaid
sequenceDiagram
    participant U as Usuário
    participant PS as ProfileScreen
    participant Auth as useAuth Hook
    participant AS as AuthService
    participant FB as Firebase Auth
    participant Index as app/index.tsx
    participant Welcome as WelcomeScreen

    U->>PS: Acessa tela de perfil
    U->>PS: Clica em "Sair"
    PS->>PS: Exibe confirmação (opcional)
    U->>PS: Confirma logout
    PS->>Auth: signOut()
    Auth->>AS: signOut()
    AS->>FB: firebaseSignOut(auth)
    FB-->>AS: Confirmação
    AS-->>Auth: Sucesso
    Auth->>Auth: setUser(null), setProfile(null)
    Auth->>Auth: onAuthStateChanged dispara
    Auth-->>PS: Estado atualizado
    PS->>Index: router.replace('/')
    Index->>Index: useAuth() - user = null
    Index->>Welcome: Redirect href="/(auth)/onboarding"
    Welcome->>U: Exibe tela de boas-vindas
```

---

## Legenda

- **Participantes**: Componentes, telas, serviços e sistemas envolvidos no fluxo
- **Setas sólidas**: Chamadas diretas ou navegação
- **Setas tracejadas**: Respostas ou callbacks
- **Notas**: Informações adicionais sobre o processo
- **Alt/Else**: Condições e fluxos alternativos

## Observações Importantes

1. **Autenticação Persistente**: O Firebase Auth mantém a sessão do usuário automaticamente usando AsyncStorage no React Native.

2. **Estado Global**: O `useAuth` hook gerencia o estado de autenticação globalmente através do Context API.

3. **Navegação**: O app usa Expo Router para navegação baseada em arquivos.

4. **Firestore**: Os dados do usuário (perfil, XP, nível) são armazenados no Firestore.

5. **Mocks**: Atualmente, muitos dados são mockados (trilhas, conteúdos). A integração completa com Firebase está parcialmente implementada.

6. **TODOs Identificados**:
   - Salvar dados de onboarding no Firebase
   - Implementar sistema de quiz
   - Implementar tracking de progresso de trilhas
   - Implementar sistema de recomendações baseado em interesses

