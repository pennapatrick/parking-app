export default function Dashboard() {
  // Mock de dados
  const totalVagas = 36;
  const vagasOcupadas = 12;
  const vagasLivres = totalVagas - vagasOcupadas;
  const totalVeiculos = 18;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Total de Vagas</span>
          <span className="text-2xl font-bold text-blue-700">{totalVagas}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Vagas Ocupadas</span>
          <span className="text-2xl font-bold text-red-600">{vagasOcupadas}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Vagas Livres</span>
          <span className="text-2xl font-bold text-green-600">{vagasLivres}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Total de Veículos</span>
          <span className="text-2xl font-bold text-blue-700">{totalVeiculos}</span>
        </div>
      </div>
    </div>
  );
} 