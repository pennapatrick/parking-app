export default function RelatoriosPage() {
  // Mock de dados
  const entradasHoje = 12;
  const saidasHoje = 8;
  const vagasOcupadas = 12;
  const vagasLivres = 24;
  const veiculosPresentes = 10;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Relatórios</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Entradas hoje</span>
          <span className="font-bold">{entradasHoje}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Saídas hoje</span>
          <span className="font-bold">{saidasHoje}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Vagas Ocupadas</span>
          <span className="font-bold text-red-600">{vagasOcupadas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Vagas Livres</span>
          <span className="font-bold text-green-600">{vagasLivres}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Veículos Presentes</span>
          <span className="font-bold text-blue-700">{veiculosPresentes}</span>
        </div>
      </div>
    </div>
  );
} 