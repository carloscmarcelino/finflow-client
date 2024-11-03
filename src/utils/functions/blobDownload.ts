import { toast } from 'sonner';

import { getAccess } from '@/api/actions/getAccess';
import { API_URL } from '@/config';

type Params = Record<string, string>;

type BlobDownloadProps = {
  endpoint: string;
  params: Params;
};

const buildQueryString = (params: Params) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

export const blobDownload = async ({ endpoint, params }: BlobDownloadProps) => {
  try {
    const token = await getAccess();

    const queryString = buildQueryString(params);

    const response = await fetch(`${API_URL}/${endpoint}/${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const fileName = 'entries.xlsx';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    toast.success('Sucesso!', {
      description: 'XLSX gerado com sucesso.',
    });
  } catch (error) {
    toast.error('Erro!', {
      description: 'Ocorreu um erro inesperado.',
    });
  }
};
