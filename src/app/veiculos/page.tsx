"use client";
import { useState } from "react";

interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  status: "Estacionado" | "Fora";
}

const veiculosMock: Veiculo[] = [
  { id: 1, placa: "ABC-1234", modelo: "Fiat Uno", status: "Estacionado" },
  { id: 2, placa: "XYZ-5678", modelo: "Honda Civic", status: "Fora" },
  { id: 3, placa: "DEF-4321", modelo: "VW Gol", status: "Estacionado" },
];

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(veiculosMock);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Gerenciar Veículos</h1>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left">Placa</th>
            <th className="py-3 px-4 text-left">Modelo</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id} className="border-t last:border-b-0">
              <td className="py-2 px-4">{veiculo.placa}</td>
              <td className="py-2 px-4">{veiculo.modelo}</td>
              <td className="py-2 px-4">
                <span className={veiculo.status === "Estacionado" ? "text-green-600" : "text-gray-500"}>{veiculo.status}</span>
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