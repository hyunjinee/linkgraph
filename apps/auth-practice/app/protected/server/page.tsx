import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';

export default async function ServerProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?callbackUrl=/protected/server');
  }

  return (
    <section>
      <div className="container">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">server-side</span> protected page
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session.user?.name}</p>
      </div>
    </section>
  );
}
