import { toast } from 'sonner';

import api from '@/lib/api';

type Params = Record<string, string>;

export type BlobDownloadProps = {
  endpoint: string;
  params: Params;
  fileName: string;
};

const buildQueryString = (params: Params) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

export const blobDownload = async ({ params, endpoint, fileName }: BlobDownloadProps) => {
  try {
    const queryString = buildQueryString(params);

    const response = await api.authorized().get(`${endpoint}/${queryString}`, {});

    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    toast.success('Sucesso!', {
      description: 'XLSX gerado com sucesso.',
    });
  } catch (error) {
    console.log(error);
    toast.error('Erro!', {
      description: 'Ocorreu um erro inesperado.',
    });
  }
};
