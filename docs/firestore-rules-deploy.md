# Deploy das Regras do Firestore

## ⚠️ IMPORTANTE: Regras atuais permitem TUDO (apenas para desenvolvimento)

As regras atuais em `firestore.rules` permitem todas as operações (`allow read, write: if true`). **Isso é apenas para desenvolvimento e teste.**

## Como fazer deploy das regras

### Opção 1: Firebase Console (Recomendado para teste rápido)

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Firestore Database** > **Rules**
4. Cole o conteúdo do arquivo `firestore.rules`
5. Clique em **Publicar**

### Opção 2: Firebase CLI

```bash
# Instalar Firebase CLI (se ainda não tiver)
npm install -g firebase-tools

# Login
firebase login

# Fazer deploy das regras
firebase deploy --only firestore:rules
```

### Opção 3: Deploy completo (rules + indexes)

```bash
firebase deploy --only firestore
```
