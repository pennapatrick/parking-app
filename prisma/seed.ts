import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Inserindo dados iniciais...')

  // Criar usuário admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin'
    }
  })

  // Criar vagas
  const colunasLetras = ["A", "B", "C", "D", "E", "F"]
  const linhasNumeros = [1, 2, 3, 4, 5, 6]
  
  for (const linha of linhasNumeros) {
    for (const col of colunasLetras) {
      const numero = `${col}${linha}`
      await prisma.vaga.upsert({
        where: { numero },
        update: {},
        create: {
          numero,
          status: 'Livre'
        }
      })
    }
  }

  console.log('Dados inseridos com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
