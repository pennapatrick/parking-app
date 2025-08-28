import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar todas as vagas
export async function GET() {
  try {
    const vagas = await prisma.vaga.findMany({
      orderBy: { numero: 'asc' }
    })
    return NextResponse.json(vagas)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar vagas' }, { status: 500 })
  }
}

// PUT - Atualizar vaga
export async function PUT(request: NextRequest) {
  try {
    // Verificar se é admin
    const cookie = request.cookies.get('admin-session')
    if (!cookie) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id, status, veiculo, modelo } = await request.json()

    const vaga = await prisma.vaga.update({
      where: { id },
      data: {
        status,
        veiculo: status === 'Ocupada' ? veiculo : null,
        modelo: status === 'Ocupada' ? modelo : null,
        dataEntrada: status === 'Ocupada' ? new Date() : null
      }
    })

    return NextResponse.json(vaga)
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    return NextResponse.json({ error: 'Erro ao atualizar vaga' }, { status: 500 })
  }
}
