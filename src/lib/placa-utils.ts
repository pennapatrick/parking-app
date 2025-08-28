// Função para validar placas brasileiras
export function validarPlaca(placa: string): boolean {
  const placaLimpa = placa.replace(/[^A-Z0-9]/g, '');
  
  // Padrão antigo: XXX0000 (3 letras + 4 números)
  const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;
  
  // Padrão Mercosul: XXX0X00 (3 letras + 1 número + 1 letra + 2 números)
  const padraoMercosul = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
  
  return padraoAntigo.test(placaLimpa) || padraoMercosul.test(placaLimpa);
}

// Função para formatar placa para exibição
export function formatarPlaca(placa: string): string {
  const placaLimpa = placa.replace(/[^A-Z0-9]/g, '').toUpperCase();
  
  if (placaLimpa.length === 7) {
    // Verificar se é Mercosul (XXX0X00)
    if (/^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/.test(placaLimpa)) {
      return `${placaLimpa.slice(0, 3)}-${placaLimpa.slice(3)}`;
    }
    // Padrão antigo (XXX0000)
    else if (/^[A-Z]{3}[0-9]{4}$/.test(placaLimpa)) {
      return `${placaLimpa.slice(0, 3)}-${placaLimpa.slice(3)}`;
    }
  }
  
  return placaLimpa;
}

// Função para limpar placa (remover formatação)
export function limparPlaca(placa: string): string {
  return placa.replace(/[^A-Z0-9]/g, '').toUpperCase();
}
