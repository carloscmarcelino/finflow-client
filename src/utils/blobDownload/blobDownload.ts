import { toast } from 'sonner';

import { API_URL } from '@/config';
import { auth } from '@/lib/auth';

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
    const session = await auth();
    const token = session?.user?.access_token;

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
