"use client";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalVagas: number;
  vagasOcupadas: number;
  vagasLivres: number;
  taxaOcupacao: number;
  ocupacoesHoje: number;
  setorMaisOcupado: string;
  estatisticasPorSetor: {
    setor: string;
    total: number;
    ocupadas: number;
    livres: number;
  }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="text-center">Carregando estatísticas...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="text-center text-red-600">Erro ao carregar estatísticas</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Dashboard</h1>
      
      {/* Cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Total de Vagas</span>
          <span className="text-2xl font-bold text-blue-700">{stats.totalVagas}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Vagas Ocupadas</span>
          <span className="text-2xl font-bold text-red-600">{stats.vagasOcupadas}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Vagas Livres</span>
          <span className="text-2xl font-bold text-green-600">{stats.vagasLivres}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Taxa de Ocupação</span>
          <span className="text-2xl font-bold text-orange-600">{stats.taxaOcupacao}%</span>
        </div>
      </div>

      {/* Estatísticas por setor */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Ocupação por Setor</h2>
        <div className="mb-4 text-center">
          <span className="text-lg text-gray-600">Setor mais ocupado: </span>
          <span className="text-2xl font-bold text-red-600">{stats.setorMaisOcupado}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.estatisticasPorSetor.map((setor) => (
            <div key={setor.setor} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 mb-1">Setor {setor.setor}</div>
              <div className="text-sm text-gray-600">
                <div>Total: {setor.total}</div>
                <div className="text-red-600">Ocupadas: {setor.ocupadas}</div>
                <div className="text-green-600">Livres: {setor.livres}</div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${setor.total > 0 ? (setor.ocupadas / setor.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 