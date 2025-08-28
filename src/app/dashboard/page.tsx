"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";

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
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold mb-8 heading-gradient">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total de Vagas" value={stats.totalVagas} tone="accent" />
        <StatCard label="Ocupadas" value={stats.vagasOcupadas} tone="negative" />
        <StatCard label="Livres" value={stats.vagasLivres} tone="positive" />
        <StatCard label="Taxa Ocupação" value={`${stats.taxaOcupacao}%`} tone="warning" />
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Ocupação por Setor</h2>
          <div className="text-sm text-soft">Setor mais ocupado: <span className="text-negative font-semibold">{stats.setorMaisOcupado}</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.estatisticasPorSetor.map((setor) => {
            const ratio = setor.total > 0 ? setor.ocupadas / setor.total : 0;
            return (
              <div key={setor.setor} className="bg-surface-alt rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Setor {setor.setor}</span>
                  <span className="badge">{setor.ocupadas}/{setor.total}</span>
                </div>
                <ProgressBar value={ratio} tone={ratio > .75 ? 'negative' : ratio > .5 ? 'warning' : 'positive'} height={8} />
                <div className="text-[11px] text-soft flex justify-between">
                  <span className="text-negative">Ocup: {setor.ocupadas}</span>
                  <span className="text-positive">Livres: {setor.livres}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 