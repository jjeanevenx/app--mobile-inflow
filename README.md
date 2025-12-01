# Documentação do InFlow App

Esta pasta contém a documentação técnica do aplicativo InFlow.

## 📋 Índice

### Diagramas de Sequência
- **[Diagramas de Sequência](./sequence-diagrams.md)** - Diagramas detalhados dos principais fluxos do aplicativo

## 🔄 Fluxos Documentados

### Autenticação
1. **Login** - Fluxo de autenticação de usuários existentes
2. **Signup** - Fluxo de cadastro de novos usuários
3. **Onboarding** - Processo de configuração inicial do perfil
4. **Recuperação de Senha** - Fluxo de reset de senha
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
4. As notas explicam decisões de design e implementação

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

