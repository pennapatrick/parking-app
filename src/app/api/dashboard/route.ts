import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Buscar estatísticas básicas
    const totalVagas = await prisma.vaga.count()
    const vagasOcupadas = await prisma.vaga.count({
      where: { status: 'Ocupada' }
    })
    const vagasLivres = totalVagas - vagasOcupadas
    const taxaOcupacao = totalVagas > 0 ? (vagasOcupadas / totalVagas) * 100 : 0

    // Buscar todas as vagas para análises mais detalhadas
    const todasVagas = await prisma.vaga.findMany()
    
    const ocupacoesHoje = vagasOcupadas // Por enquanto
    
    // Estatísticas por setor (A, B, C, D, E, F)
    const estatisticasPorSetor = ['A', 'B', 'C', 'D', 'E', 'F'].map(letra => {
      const vagasSetor = todasVagas.filter(v => v.numero.startsWith(letra))
      const ocupadasSetor = vagasSetor.filter(v => v.status === 'Ocupada').length
      return {
        setor: letra,
        total: vagasSetor.length,
        ocupadas: ocupadasSetor,
        livres: vagasSetor.length - ocupadasSetor
      }
    })

    // Encontrar o setor mais ocupado
    const setorMaisOcupado = estatisticasPorSetor.reduce((prev, current) => 
      current.ocupadas > prev.ocupadas ? current : prev
    ).setor

    return NextResponse.json({
      totalVagas,
      vagasOcupadas,
      vagasLivres,
      taxaOcupacao: Math.round(taxaOcupacao),
      ocupacoesHoje,
      estatisticasPorSetor,
      setorMaisOcupado
    })
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json({ error: 'Erro ao buscar estatísticas' }, { status: 500 })
  }
}
