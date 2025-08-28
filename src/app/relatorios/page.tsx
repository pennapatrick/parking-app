"use client";
import { useState, useEffect } from "react";
import { formatarPlaca } from "@/lib/placa-utils";

interface RelatorioData {
  vagasOcupadas: {
    numero: string;
    veiculo: string;
    modelo: string;
  }[];
  relatorioModelos: {
    modelo: string;
    quantidade: number;
  }[];
  ocupacoesPorDia: {
    data: string;
    ocupacoes: number;
  }[];
  totalVagasOcupadas: number;
  resumo: {
    setorMaisOcupado: string;
    horaPico: string;
    tempoMedioOcupacao: string;
  };
}

export default function RelatoriosPage() {
  const [relatorio, setRelatorio] = useState<RelatorioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatorio();
  }, []);

  async function fetchRelatorio() {
    try {
      const response = await fetch('/api/relatorios');
      if (response.ok) {
        const data = await response.json();
        setRelatorio(data);
      }
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">Carregando relatório...</div>
      </div>
    );
  }

  if (!relatorio) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center text-red-600">Erro ao carregar relatório</div>
      </div>
    );
  }

  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold mb-8 heading-gradient">Relatórios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="card p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Resumo Geral</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-soft">Total de vagas ocupadas</span><span className="text-negative font-semibold">{relatorio.totalVagasOcupadas}</span></div>
            <div className="flex justify-between"><span className="text-soft">Setor mais ocupado</span><span className="font-semibold">{relatorio.resumo.setorMaisOcupado}</span></div>
            <div className="flex justify-between"><span className="text-soft">Horário de pico</span><span className="font-semibold">{relatorio.resumo.horaPico}</span></div>
            <div className="flex justify-between"><span className="text-soft">Tempo médio</span><span className="font-semibold">{relatorio.resumo.tempoMedioOcupacao}</span></div>
          </div>
        </div>
        <div className="card p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Ocupações (7 dias)</h2>
          <div className="space-y-3 text-sm">
            {relatorio.ocupacoesPorDia.map((dia, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-20 text-soft">{dia.data}</span>
                <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${(dia.ocupacoes / 36) * 100}%` }} />
                </div>
                <span className="w-8 text-right font-medium text-soft">{dia.ocupacoes}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-10 overflow-hidden">
        <div className="p-6 border-b border-base"><h2 className="text-lg font-semibold">Veículos no Estacionamento</h2></div>
        <div className="overflow-x-auto">
          <table className="simple">
            <thead>
              <tr>
                <th>Vaga</th>
                <th>Placa</th>
                <th>Modelo</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.vagasOcupadas.map((vaga, index) => (
                <tr key={index}>
                  <td className="font-medium">{vaga.numero}</td>
                  <td>{formatarPlaca(vaga.veiculo)}</td>
                  <td>{vaga.modelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {relatorio.vagasOcupadas.length === 0 && (
            <div className="text-center py-8 text-soft text-sm">Nenhum veículo no estacionamento</div>
          )}
        </div>
      </div>

      {relatorio.relatorioModelos.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Modelos Mais Frequentes</h2>
          <div className="space-y-3 text-sm">
            {relatorio.relatorioModelos.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="flex-1 truncate">{item.modelo}</span>
                <div className="w-28 h-2 bg-surface-alt rounded-full overflow-hidden">
                  <div className="h-full bg-positive" style={{ width: `${(item.quantidade / Math.max(...relatorio.relatorioModelos.map(m => m.quantidade))) * 100}%` }} />
                </div>
                <span className="w-8 text-right text-soft">{item.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 