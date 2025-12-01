# Documentação do InFlow App

Documentação técnica do aplicativo InFlow.

## 📋 Índice

### Diagramas de Sequência
- **[Diagramas de Sequência - mobile](./docs/sequence-diagrams.md)** - Diagramas detalhados dos principais fluxos do aplicativo
- **[Fluxo de dados - client/server](./docs/fluxo-dados.md)** - Diagramas detalhados dos principais fluxos do aplicativo

## Backend repo:
**[service--app-mobile-inflow](https://github.com/jjeanevenx/service--app-mobile-inflow)** 

## 🔄 Fluxos Documentados

### Autenticação
1. **Login** - Fluxo de autenticação de usuários existentes
2. **Signup** - Fluxo de cadastro de novos usuários
3. **Onboarding** - Processo de configuração inicial do perfil
5. **Logout** - Processo de saída do aplicativo

### Navegação
6. **Inicialização do App** - Fluxo de boot e verificação de autenticação
7. **Navegação entre Telas** - Fluxo de navegação entre as principais telas

### Conteúdo
8. **Visualização de Conteúdo** - Fluxo de visualização de vídeos e artigos
9. **Trilhas de Aprendizado** - Navegação e progresso em trilhas educacionais
10. **Atualização de XP e Nível** - Sistema de gamificação e progresso

## 📊 Formato dos Diagramas

Os diagramas estão em formato **Mermaid**, que pode ser visualizado em:
- GitHub (renderização automática)
- VS Code (com extensão Mermaid)
- Editores online como [Mermaid Live Editor](https://mermaid.live)

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo Router** - Roteamento baseado em arquivos
- **Firebase Auth** - Autenticação
- **Firestore** - Banco de dados
- **TypeScript** - Tipagem estática

## 📝 Notas Importantes

- Os diagramas mostram o estado atual da implementação
- Algumas funcionalidades estão marcadas como TODO
- Mocks são utilizados para dados de desenvolvimento
- A integração completa com Firebase está em progresso

## 🔍 Como Usar

1. Abra o arquivo `sequence-diagrams.md`
2. Use um visualizador Mermaid para ver os diagramas renderizados
3. Cada diagrama mostra um fluxo específico do aplicativo

## 📚 Estrutura do Projeto

```
app/
├── (auth)/          # Telas de autenticação
├── (tabs)/          # Telas principais (tabs)
└── (screens)/       # Telas de navegação
src/
├── services/        # Serviços (Auth, Firebase)
├── hooks/           # Hooks customizados
├── components/      # Componentes reutilizáveis
└── mocks/           # Dados mockados
```

## 🚀 Como Testar Localmente

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente): `npm install -g expo-cli`
- **Expo Go** (app instalado no seu dispositivo móvel) - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **Firebase CLI** (opcional, para deploy das regras): `npm install -g firebase-tools`

### Passo 1: Instalar Dependências

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd app--mobile-inflow

# Instalar dependências
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

O app precisa das credenciais do Firebase para funcionar. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
FIREBASE_API_KEY=sua-api-key
FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
FIREBASE_SENDER_ID=seu-sender-id
FIREBASE_APP_ID=seu-app-id
```

**Onde encontrar essas credenciais:**
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Role até **Seus apps** e selecione o app web (ou crie um novo)
5. Copie as credenciais do objeto `firebaseConfig`

### Passo 3: Configurar o Backend

⚠️ **IMPORTANTE**: O app requer que as funções do Firebase estejam deployadas. Siga as instruções no README do repositório do backend:

**[service--app-mobile-inflow](https://github.com/jjeanevenx/service--app-mobile-inflow)**

Certifique-se de que:
- As Cloud Functions estão deployadas
- As regras do Firestore estão configuradas (veja [firestore-rules-deploy.md](./docs/firestore-rules-deploy.md))

### Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
# Iniciar o servidor Expo
npm start

# Ou com cache limpo (se tiver problemas)
npm run start:clear
```

Isso abrirá o **Metro Bundler** no terminal e um QR code será exibido.

### Passo 5: Testar no Dispositivo ou Simulador

#### Opção A: Usando Expo Go (Recomendado para testes rápidos)

**No dispositivo físico:**
1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR code exibido no terminal
3. O app será carregado automaticamente

**Nota**: Certifique-se de que seu dispositivo e computador estão na mesma rede Wi-Fi.

#### Opção B: Usando Simulador/Emulador

**Android:**
```bash
# Iniciar emulador Android
npm run android

# Ou usar o comando direto
expo start --android
```

**Pré-requisitos para simuladores:**
- **Android**: Android Studio instalado com um emulador configurado

### Comandos Úteis

```bash
# Limpar cache e reiniciar
npm run start:clear

# Executar lint
npm run lint

# Iniciar no web (para testes básicos)
npm run web
```

### Troubleshooting

**Problema: "Firebase config not found"**
- Verifique se o arquivo `.env` existe e contém todas as variáveis necessárias
- Certifique-se de que as variáveis estão corretas (sem espaços extras, aspas desnecessárias)

**Problema: "Network request failed"**
- Verifique se o backend está deployado e funcionando
- Confirme que as Cloud Functions estão ativas no Firebase Console

**Problema: QR code não funciona no Expo Go**
- Certifique-se de que o dispositivo e computador estão na mesma rede Wi-Fi
- Tente usar o modo "Tunnel" no Expo: pressione `s` no terminal e selecione "Tunnel"

**Problema: Erro ao instalar dependências**
- Limpe o cache: `npm cache clean --force`
- Delete `node_modules` e `package-lock.json`, depois execute `npm install` novamente