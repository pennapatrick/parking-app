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
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Relatórios</h1>
      
      {/* Resumo geral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Resumo Geral</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Total de vagas ocupadas</span>
              <span className="font-bold text-red-600">{relatorio.totalVagasOcupadas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Setor mais ocupado</span>
              <span className="font-bold">{relatorio.resumo.setorMaisOcupado}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Horário de pico</span>
              <span className="font-bold">{relatorio.resumo.horaPico}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tempo médio</span>
              <span className="font-bold">{relatorio.resumo.tempoMedioOcupacao}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Ocupações nos Últimos 7 Dias</h2>
          <div className="space-y-2">
            {relatorio.ocupacoesPorDia.map((dia, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{dia.data}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(dia.ocupacoes / 36) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-sm">{dia.ocupacoes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de veículos atualmente no estacionamento */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-800">Veículos no Estacionamento</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Vaga</th>
                <th className="py-3 px-4 text-left">Placa</th>
                <th className="py-3 px-4 text-left">Modelo</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.vagasOcupadas.map((vaga, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 font-medium">{vaga.numero}</td>
                  <td className="py-2 px-4">{formatarPlaca(vaga.veiculo)}</td>
                  <td className="py-2 px-4">{vaga.modelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {relatorio.vagasOcupadas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum veículo no estacionamento
            </div>
          )}
        </div>
      </div>

      {/* Relatório por modelo mais populares */}
      {relatorio.relatorioModelos.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-800">Modelos Mais Frequentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {relatorio.relatorioModelos.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.modelo}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(item.quantidade / Math.max(...relatorio.relatorioModelos.map(m => m.quantidade))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-sm">{item.quantidade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 