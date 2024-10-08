import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { FetchOptions } from '@/lib/FetchClient/types';

export type DefaultProperties = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type GetManyResponse<T> = {
  data: T[];
  total_items: number;
  total_items_listed: number;
};

export type ReadFn<TResponse> = (options?: { config?: FetchOptions }) => Promise<TResponse>;

export type ReadIdFn<TResponse> = (options?: {
  id?: string;
  config?: FetchOptions;
}) => Promise<TResponse>;

export type DetailFn<TResponse> = (
  options: Partial<{
    id?: string;
    config?: FetchOptions;
  }>,
) => Promise<TResponse>;

export type CreateFn<TBody, TResponse = TBody> = (options: {
  body: TBody;
  config?: FetchOptions;
  id?: string;
}) => Promise<TResponse>;

export type UpdateFn<TBody, TResponse = TBody> = (options: {
  id?: string;
  body: TBody;
  config?: FetchOptions;
}) => Promise<TResponse>;

export type DeleteFn = (options: {
  id: string;
  config?: FetchOptions;
  userId?: string;
}) => Promise<void>;

export type ReadManyFn<TResponse> = (options: {
  params: Params;
  config?: FetchOptions;
}) => Promise<GetManyResponse<TResponse>>;

export type ApiResponse<T> = {
  data: T[];
  totalItems: number;
};

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
