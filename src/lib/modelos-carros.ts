export const modelosCarros = [
  // FIAT
  { marca: "FIAT", modelo: "UNO" },
  { marca: "FIAT", modelo: "PALIO" },
  { marca: "FIAT", modelo: "STRADA" },

  // HYUNDAI
  { marca: "HYUNDAI", modelo: "HB20" },
  { marca: "HYUNDAI", modelo: "CRETA" },
  { marca: "HYUNDAI", modelo: "TUCSON" },

  // TOYOTA
  { marca: "TOYOTA", modelo: "COROLLA" },
  { marca: "TOYOTA", modelo: "ETIOS" },
  { marca: "TOYOTA", modelo: "HILUX" },

  // VOLKSWAGEN
  { marca: "VOLKSWAGEN", modelo: "GOL" },
  { marca: "VOLKSWAGEN", modelo: "POLO" },
  { marca: "VOLKSWAGEN", modelo: "T-CROSS" },

  // NISSAN
  { marca: "NISSAN", modelo: "MARCH" },
  { marca: "NISSAN", modelo: "VERSA" },
  { marca: "NISSAN", modelo: "KICKS" },

  // KIA
  { marca: "KIA", modelo: "PICANTO" },
  { marca: "KIA", modelo: "CERATO" },
  { marca: "KIA", modelo: "SPORTAGE" },

  // MITSUBISHI
  { marca: "MITSUBISHI", modelo: "LANCER" },
  { marca: "MITSUBISHI", modelo: "ASX" },
  { marca: "MITSUBISHI", modelo: "L200" },

  // FORD
  { marca: "FORD", modelo: "KA" },
  { marca: "FORD", modelo: "FIESTA" },
  { marca: "FORD", modelo: "ECOSPORT" },

  // CHEVROLET
  { marca: "CHEVROLET", modelo: "ONIX" },
  { marca: "CHEVROLET", modelo: "PRISMA" },
  { marca: "CHEVROLET", modelo: "S10" },
];

export const getModelosFormatados = () => {
  return modelosCarros.map(item => `${item.marca} ${item.modelo}`);
};
