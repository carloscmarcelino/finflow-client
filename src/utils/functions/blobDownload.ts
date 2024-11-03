import { getAccess } from '@/api/actions/getAccess';
import { API_URL } from '@/config';

export const blobDownload = async (endpoint: string) => {
  const token = await getAccess();

  const response = await fetch(`${API_URL}/${endpoint}`, {
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
};
