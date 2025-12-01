# Configuração das Regras do Firestore

Este guia explica como configurar as regras de segurança do Firestore para resolver erros de permissão.

## Problema: "Missing or insufficient permissions"

Este erro ocorre quando o Firestore bloqueia uma operação devido às regras de segurança.

## Solução

### Opção 1: Deploy via Firebase CLI (Recomendado)

Execute no terminal:

```bash
# 1. Instalar Firebase CLI (se ainda não tiver)
npm install -g firebase-tools

# 2. Login no Firebase
firebase login

# 3. Inicializar Firebase no projeto (se ainda não fez)
firebase init firestore

# 4. Configurar o projeto (selecione o projeto correto)
firebase use <project-id>

# 5. Deploy das regras
firebase deploy --only firestore:rules
```

### Opção 2: Configurar Manualmente no Console (Rápido)

1. Acesse: https://console.firebase.google.com
2. Selecione seu projeto
3. Vá em **Firestore Database** → **Regras**
4. Copie o conteúdo do arquivo `firestore.rules`
5. Cole no editor de regras
6. Clique em **Publicar**

⚠️ **Importante**: As regras precisam ser aplicadas para resolver o erro de permissões!

### 2. Estrutura do Arquivo `firestore.rules`

O arquivo `firestore.rules` foi criado na raiz do projeto com as seguintes regras:

- **usuarios**: Usuário pode ler/atualizar apenas seu próprio perfil
- **conteudos_recomendados**: Usuário pode ler apenas seus próprios conteúdos
- **trilhas**: Usuário pode ler apenas suas próprias trilhas
- **ultimas_noticias**: Usuário pode ler apenas suas próprias notícias
- **usuario_progresso**: Usuário pode ler/atualizar apenas seu próprio progresso
- **usuario_bookmarks**: Usuário pode gerenciar seus próprios bookmarks
- **conquistas**: Todos os usuários autenticados podem ler

### 3. Regras Temporárias para Desenvolvimento (NÃO USAR EM PRODUÇÃO)

Se precisar testar rapidamente, você pode usar regras temporárias no Console do Firebase:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **ATENÇÃO**: Essas regras permitem que qualquer usuário autenticado acesse qualquer documento. Use apenas para testes!

### 4. Verificar Regras Atuais

No Console do Firebase:
1. Acesse: https://console.firebase.google.com
2. Selecione seu projeto
3. Vá em **Firestore Database** → **Regras**
4. Verifique se as regras estão corretas

### 5. Estrutura Esperada dos Dados

As regras assumem que os documentos têm:

- `conteudos_recomendados/{docId}`: `{ userId: string, contents: [...] }`
- `usuarios/{userId}`: `{ uid: string, email: string, ... }`
- `trilhas/{docId}`: `{ userId: string, ... }`
- `ultimas_noticias/{docId}`: `{ userId: string, ... }`

### 6. Testar Regras

Você pode testar as regras no Firebase Console usando o simulador de regras.

## Troubleshooting

### Erro persiste após deploy

1. Verifique se o usuário está autenticado:
   ```typescript
   const { user } = useAuth();
   console.log('User authenticated:', !!user);
   ```

2. Verifique o ID do usuário:
   ```typescript
   console.log('User UID:', user?.uid);
   ```

3. Verifique se o documento tem o campo `userId` correto

4. Verifique os logs no Firebase Console para ver qual regra está falhando

### Regras não estão sendo aplicadas

- Aguarde alguns minutos após o deploy (propagação)
- Limpe o cache do app
- Verifique se está usando o projeto correto no Firebase CLI

---

## Comandos Úteis

```bash
# Ver regras atuais
firebase firestore:rules:get

# Deploy apenas das regras
firebase deploy --only firestore:rules

# Deploy de regras e índices
firebase deploy --only firestore
```

