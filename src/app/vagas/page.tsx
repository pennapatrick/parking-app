"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getModelosFormatados } from "@/lib/modelos-carros";
import { validarPlaca, formatarPlaca, limparPlaca } from "@/lib/placa-utils";

interface Vaga {
  id: number;
  numero: string;
  status: "Livre" | "Ocupada";
  veiculo?: string | null;
  modelo?: string | null;
}

// Colunas: A-F, Linhas: 1-6
const colunasLetras = ["A", "B", "C", "D", "E", "F"];
const linhasNumeros = [1, 2, 3, 4, 5, 6];

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVaga, setEditingVaga] = useState<Vaga | null>(null);
  const [placaInput, setPlacaInput] = useState("");
  const [modeloInput, setModeloInput] = useState("");
  const modelosDisponiveis = getModelosFormatados();

  // Carregar vagas do banco
  useEffect(() => {
    fetchVagas();
  }, []);

  async function fetchVagas() {
    try {
      const response = await fetch('/api/vagas');
      if (response.ok) {
        const data = await response.json();
        setVagas(data);
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateVaga(vaga: Vaga, newStatus: "Livre" | "Ocupada", placa?: string, modelo?: string) {
    try {
      const response = await fetch('/api/vagas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: vaga.id,
          status: newStatus,
          veiculo: placa || null,
          modelo: modelo || null
        }),
      });

      if (response.ok) {
        await fetchVagas(); // Recarregar vagas
        setEditingVaga(null);
        setPlacaInput("");
        setModeloInput("");
      } else {
        alert('Erro ao atualizar vaga');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar vaga');
    }
  }

  function handleEditVaga(vaga: Vaga) {
    setEditingVaga(vaga);
    setPlacaInput(vaga.veiculo || "");
    setModeloInput(vaga.modelo || "");
  }

  function handleSaveEdit() {
    if (!editingVaga) return;
    
    if (editingVaga.status === "Livre") {
      if (!placaInput.trim()) {
        alert('Por favor, digite a placa do veículo');
        return;
      }
      
      // Validar formato da placa
      const placaLimpa = limparPlaca(placaInput);
      if (!validarPlaca(placaLimpa)) {
        alert('Formato de placa inválido. Use XXX0000 (padrão antigo) ou XXX0X00 (Mercosul)');
        return;
      }
      
      if (!modeloInput.trim()) {
        alert('Por favor, selecione o modelo do veículo');
        return;
      }
      updateVaga(editingVaga, "Ocupada", placaLimpa, modeloInput);
    } else {
      updateVaga(editingVaga, "Livre");
    }
  }

  // Cria um mapa para lookup rápido
  const vagasMap = new Map(vagas.map(v => [v.numero, v]));

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="text-center">Carregando vagas...</div>
      </div>
    );
  }

  return (
    <div className="container-narrow py-10">
      <h1 className="text-3xl font-bold mb-8 heading-gradient">Gerenciar Vagas</h1>
      
      {/* Mapa gráfico 11x6 */}
      <div className="mb-10 flex flex-col gap-2 items-center card p-6">
        {linhasNumeros.map((linha) => (
          <div key={linha} className="flex gap-2">
            {[...Array(11)].map((_, idx) => {
              // As vagas ocupam as colunas ímpares (0,2,4,6,8,10)
              if (idx % 2 === 0 && idx / 2 < 6) {
                const colLetra = colunasLetras[idx / 2];
                const vaga = vagasMap.get(`${colLetra}${linha}`);
                return (
                  <div key={idx} className="relative group">
                    {vaga?.status === "Livre" ? (
                      <div
                        className="w-16 h-16 rounded-md flex items-center justify-center font-semibold text-positive text-sm cursor-pointer bg-surface-alt border border-base hover:bg-surface transition-colors"
                        onClick={() => vaga && handleEditVaga(vaga)}
                      >
                        {vaga.numero}
                      </div>
                    ) : (
                      <div 
                        className="w-16 h-16 flex items-center justify-center relative cursor-pointer bg-surface-alt rounded-md border border-base hover:bg-surface transition-colors"
                        onClick={() => vaga && handleEditVaga(vaga)}
                      >
                        <Image src="/car.png" alt="Carro" width={48} height={48} className="object-contain opacity-90" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-negative">
                          {vaga?.numero}
                        </span>
                      </div>
                    )}
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-10 hidden group-hover:block min-w-max text-xs rounded p-3 shadow-lg whitespace-nowrap card">
                      <div className="text-[10px] uppercase tracking-wide text-soft mb-1">Vaga {vaga?.numero}</div>
                      {vaga?.status === "Ocupada" ? (
                        <div className="space-y-0.5">
                          {vaga?.modelo && <div><span className="text-soft">Modelo:</span> {vaga.modelo}</div>}
                          <div><span className="text-soft">Placa:</span> {vaga?.veiculo ? formatarPlaca(vaga.veiculo) : "---"}</div>
                        </div>
                      ) : (
                        <div className="text-positive font-medium">Disponível</div>
                      )}
                    </div>
                  </div>
                );
              } else {
                // Espaço vazio para afastamento
                return <div key={idx} className="w-16 h-16" />;
              }
            })}
          </div>
        ))}
      </div>

      {/* Modal de edição */}
      {editingVaga && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6 bg-surface relative">
            <h2 className="text-xl font-semibold mb-4">Editar Vaga {editingVaga.numero}</h2>
            <div className="mb-5 text-sm">
              <p className="mb-2">Status atual: <span className={editingVaga.status === "Livre" ? "text-positive" : "text-negative"}>{editingVaga.status}</span></p>
              {editingVaga.status === "Livre" ? (
                <div className="space-y-5">
                  <div className="field">
                    <label className="text-xs font-medium uppercase tracking-wide text-soft">Placa do veículo</label>
                    <input
                      type="text"
                      className="input"
                      value={placaInput}
                      onChange={(e) => {
                        const valor = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                        if (valor.length <= 7) {
                          setPlacaInput(valor);
                        }
                      }}
                      placeholder="ABC1234 ou ABC1D23"
                      maxLength={7}
                    />
                  </div>
                  <div className="field">
                    <label className="text-xs font-medium uppercase tracking-wide text-soft">Modelo do veículo</label>
                    <select
                      className="select"
                      value={modeloInput}
                      onChange={(e) => setModeloInput(e.target.value)}
                    >
                      <option value="">Selecione o modelo</option>
                      {modelosDisponiveis.map((modelo, index) => (
                        <option key={index} value={modelo}>
                          {modelo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  {editingVaga.modelo && <p><span className="text-soft">Modelo:</span> {editingVaga.modelo}</p>}
                  <p><span className="text-soft">Placa:</span> {editingVaga.veiculo ? formatarPlaca(editingVaga.veiculo) : "Não informada"}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  setEditingVaga(null);
                  setPlacaInput("");
                  setModeloInput("");
                }}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn btn-accent"
              >
                {editingVaga.status === "Livre" ? "Ocupar Vaga" : "Liberar Vaga"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 