import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Buscar todas as vagas para análise
    const todasVagas = await prisma.vaga.findMany({
      orderBy: { numero: 'asc' }
    })
    
    // Buscar vagas ocupadas
    const vagasOcupadas = todasVagas.filter(v => v.status === 'Ocupada')
    
    // Calcular setor mais ocupado
    const estatisticasPorSetor = ['A', 'B', 'C', 'D', 'E', 'F'].map(letra => {
      const vagasSetor = todasVagas.filter(v => v.numero.startsWith(letra))
      const ocupadasSetor = vagasSetor.filter(v => v.status === 'Ocupada').length
      return {
        setor: letra,
        ocupadas: ocupadasSetor
      }
    })
    
    const setorMaisOcupado = estatisticasPorSetor.reduce((prev, current) => 
      current.ocupadas > prev.ocupadas ? current : prev
    ).setor

    // Criar relatório por modelo usando os dados reais
    const modeloMap = new Map()
    vagasOcupadas.forEach(vaga => {
      const modelo = vaga.modelo || 'Modelo não informado'
      if (modelo !== 'Modelo não informado') {
        modeloMap.set(modelo, (modeloMap.get(modelo) || 0) + 1)
      }
    })

    const relatorioModelos = Array.from(modeloMap.entries()).map(([modelo, quantidade]) => ({
      modelo,
      quantidade
    })).sort((a, b) => b.quantidade - a.quantidade)

    // Buscar estatísticas reais da nova API
    const estatisticasResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/estatisticas`)
    let estatisticasReais = {
      ocupacoesPorDia: [],
      horaPico: '14:00-16:00',
      tempoMedioOcupacao: '2h 30min'
    }
    
    if (estatisticasResponse.ok) {
      estatisticasReais = await estatisticasResponse.json()
    }

    return NextResponse.json({
      vagasOcupadas: vagasOcupadas.map(vaga => ({
        numero: vaga.numero,
        veiculo: vaga.veiculo || '',
        modelo: vaga.modelo || 'Modelo não informado'
      })),
      relatorioModelos,
      ocupacoesPorDia: estatisticasReais.ocupacoesPorDia,
      totalVagasOcupadas: vagasOcupadas.length,
      resumo: {
        setorMaisOcupado,
        horaPico: estatisticasReais.horaPico,
        tempoMedioOcupacao: estatisticasReais.tempoMedioOcupacao
      }
    })
  } catch (error) {
    console.error('Erro ao gerar relatório:', error)
    return NextResponse.json({ error: 'Erro ao gerar relatório' }, { status: 500 })
  }
}
