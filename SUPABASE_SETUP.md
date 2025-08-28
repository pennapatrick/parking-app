# Script de Setup do Supabase 🗄️

## Passo a Passo Rápido

### 1. Acesse o Supabase
```
https://supabase.com
```

### 2. Crie um novo projeto
- **Nome**: parking-app
- **Senha**: [ANOTE SUA SENHA!]
- **Região**: South America (São Paulo)

### 3. Copie sua URL de conexão
Vá em: **Settings** → **Database** → **Connection string**

Sua URL será algo como:
```
postgresql://postgres:SUA_SENHA@db.abc123def456.supabase.co:5432/postgres
```

### 4. Configure no Vercel
No painel do Vercel, adicione estas variáveis:

**DATABASE_URL**
```
postgresql://postgres:SUA_SENHA@db.abc123def456.supabase.co:5432/postgres
```

**NEXT_PUBLIC_APP_URL**
```
https://seu-projeto.vercel.app
```

### 5. Deploy!
Faça push do código e o Vercel irá:
1. Executar `prisma generate`
2. Executar `prisma db push` (criará as tabelas automaticamente)
3. Fazer build da aplicação
4. Deploy automático! 🎉

---

## ⚠️ Importante
- O Supabase Free tem limite de 2 projetos
- Bandwidth: 10GB/mês (mais que suficiente)
- Database: 500MB (suficiente para milhares de registros)

## 🔐 Primeiro Login
- **Usuário**: admin
- **Senha**: admin
- **URL**: https://seu-projeto.vercel.app/login
