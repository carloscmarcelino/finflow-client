import { auth } from '@/auth';

const PublicPage = async () => {
  const session = await auth();

  return <>{session?.user?.username}</>;
};

export default PublicPage;
