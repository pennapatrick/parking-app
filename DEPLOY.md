# Guia de Deploy para Vercel 🚀

## Configuração do Supabase (Banco de Dados)

### 1. Criando projeto no Supabase
1. Acesse [supabase.com](https://supabase.com) e faça login/cadastro
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `parking-app`
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: `South America (São Paulo)`
   - **Plan**: Free
4. Aguarde a criação do projeto (2-3 minutos)

### 2. Obtendo a URL de conexão
1. No painel do Supabase: **Settings** → **Database**
2. Copie a **Connection string**:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
3. Substitua `[YOUR-PASSWORD]` pela sua senha

### 3. Variáveis de Ambiente no Vercel
Adicione no painel do Vercel:

```
DATABASE_URL=postgresql://postgres:SUA_SENHA@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
```

### 4. Banco de Dados
- **Desenvolvimento Local**: SQLite (`file:./dev.db`)
- **Produção**: PostgreSQL (Supabase)

### 3. Comandos de Build
O projeto está configurado para executar automaticamente:
1. `prisma generate` - Gera o cliente Prisma
2. `prisma db push` - Sincroniza o schema com o banco
3. `next build` - Constrói a aplicação

### 4. Estrutura de Arquivos
```
.env.local          # Para desenvolvimento (não committar)
.env.example        # Template das variáveis
prisma/schema.prisma # Schema do banco (configurado para PostgreSQL)
```

### 5. Usuário Admin Padrão
- **Usuário**: admin
- **Senha**: admin
- **Acesso**: Através da página `/login`

### 6. Recursos Implementados
- ✅ Sistema de autenticação
- ✅ Gerenciamento de vagas (grid visual)
- ✅ Validação de placas brasileiras (XXX0000 e XXX0X00)
- ✅ Seleção de modelos de carros brasileiros
- ✅ Dashboard com estatísticas reais
- ✅ Relatórios dinâmicos
- ✅ Responsivo para mobile

### 7. Próximos Passos para Deploy
1. Faça push do código para o repositório
2. Configure o banco PostgreSQL (recomendo Supabase ou Neon)
3. Adicione as variáveis de ambiente no Vercel
4. O deploy será automático! 🎉

---
**Nota**: O build local foi testado e está funcionando perfeitamente!
