# Troubleshooting: Conteúdos Recomendados

## Problema
A tela Discover não está encontrando dados da coleção `conteudos_recomendados`.

## Diagnóstico

O hook `useRecommendedContent` adiciona logs detalhados para ajudar a identificar o problema. Verifique o console para:

1. **Logs de busca:**
   - `[useRecommendedContent] Fetching recommended content for user: <userId>`
   - `[useRecommendedContent] Collection: conteudos_recomendados`
   - `[useRecommendedContent] Documents found: <count>`

2. **Possíveis problemas:**

   a. **Nenhum documento encontrado:**
      - Verifique se existem documentos na coleção `conteudos_recomendados`
      - Verifique se o `userId` nos documentos corresponde ao usuário logado
   
   b. **Erro de permissão:**
      - Faça deploy das regras do Firestore
      - Verifique se as regras permitem leitura
   
   c. **Estrutura de dados diferente:**
      - O hook tenta diferentes estruturas (array `contents`, documento único, arrays aninhados)
      - Verifique a estrutura real dos documentos no Firestore

3. **Estratégias de busca:**
   - **Estratégia 1:** Query filtrada por `userId` (requer índice se necessário)
   - **Estratégia 2:** Busca todos os documentos e filtra no cliente (fallback)

## Como verificar no Firebase Console

1. Acesse Firestore Database
2. Navegue até a coleção `conteudos_recomendados`
3. Verifique:
   - Se existem documentos
   - Se os documentos têm campo `userId`
   - Qual é a estrutura dos dados (array `contents`, objeto único, etc.)

## Soluções

### Se não houver documentos:
- A cloud function `userInterestTrigger` ou `scheduledNewsTrigger` pode não ter executado ainda
- Aguarde ou execute manualmente a cloud function

### Se houver documentos mas não estão sendo encontrados:
- Verifique se o `userId` nos documentos corresponde ao UID do usuário logado
- Verifique a estrutura dos dados e ajuste o hook se necessário

### Se houver erro de permissão:
- Faça deploy das regras: `firebase deploy --only firestore:rules`
- Ou configure no Firebase Console

