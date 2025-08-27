"use client";
import { useState } from "react";

interface Vaga {
  id: number;
  numero: string;
  status: "Livre" | "Ocupada";
  veiculo?: string; // placa do veículo
}

// Colunas: A-F, Linhas: 1-6
const colunasLetras = ["A", "B", "C", "D", "E", "F"];
const linhasNumeros = [1, 2, 3, 4, 5, 6];
let id = 1;
const vagasMock: Vaga[] = linhasNumeros.flatMap(linha =>
  colunasLetras.map(col => ({
    id: id++,
    numero: `${col}${linha}`,
    status: Math.random() > 0.7 ? "Ocupada" : "Livre",
    veiculo: Math.random() > 0.5 ? `PLT-${Math.floor(Math.random()*9000+1000)}` : undefined,
  }))
);

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>(vagasMock);

  // Cria um mapa para lookup rápido
  const vagasMap = new Map(vagas.map(v => [v.numero, v]));

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Gerenciar Vagas</h1>
      {/* Mapa gráfico 11x6 */}
      <div className="mb-8 flex flex-col gap-2 items-center">
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
                        className="w-16 h-16 rounded flex items-center justify-center font-bold text-white shadow cursor-pointer transition-colors bg-green-500 hover:bg-green-600"
                      >
                        {vaga.numero}
                      </div>
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center relative cursor-pointer">
                        <img src="/car.png" alt="Carro" className="w-16 h-16 object-contain" />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white drop-shadow">
                          {vaga?.numero}
                        </span>
                      </div>
                    )}
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10 hidden group-hover:block min-w-max bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-lg whitespace-nowrap">
                      <div><b>Vaga:</b> {vaga?.numero}</div>
                      {vaga?.status === "Ocupada" && <div><b>Placa:</b> {vaga?.veiculo || "---"}</div>}
                      {vaga?.status === "Livre" && <div>Disponível</div>}
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
      {/* Tabela de vagas */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left">Número</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map((vaga) => (
            <tr key={vaga.id} className="border-t last:border-b-0">
              <td className="py-2 px-4">{vaga.numero}</td>
              <td className="py-2 px-4">
                <span className={vaga.status === "Livre" ? "text-green-600" : "text-red-600"}>{vaga.status}</span>
              </td>
              <td className="py-2 px-4 flex gap-2 justify-center">
                <button className="text-blue-700 hover:underline">Editar</button>
                <button className="text-red-600 hover:underline">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 