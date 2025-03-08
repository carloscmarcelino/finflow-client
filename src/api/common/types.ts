export type Broker = {
  cnpj: string;
  type: string;
  nome_social: string;
  nome_comercial: string;
  status: string;
  email: string;
  telefone: string;
  cep: string;
  pais: string;
  uf: string;
  municipio: string;
  bairro: string;
  complemento?: string;
  logradouro: string;
  data_patrimonio_liquido: string;
  valor_patrimonio_liquido: number;
  codigo_cvm: string;
  data_inicio_situacao: string;
  data_registro: string;
};

export type TypesOfInvestment = {
  id: string;
  name: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
};
