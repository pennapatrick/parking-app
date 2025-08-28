# Teste local com Supabase (Opcional)

## Se você quiser testar localmente com Supabase:

1. **Crie um arquivo `.env.local`** com sua URL do Supabase:
```bash
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

2. **Atualize o schema para PostgreSQL temporariamente**:
```bash
# No arquivo prisma/schema.prisma, certifique-se que está:
provider = "postgresql"
```

3. **Execute os comandos**:
```bash
npx prisma generate
npx prisma db push
npm run dev
```

4. **Depois volte para SQLite local**:
```bash
# Volte o prisma/schema.prisma para:
provider = "sqlite"

# E use o .env.local com:
DATABASE_URL="file:./dev.db"
```

**Isso é opcional!** Você pode fazer deploy direto no Vercel sem testar localmente com PostgreSQL.
