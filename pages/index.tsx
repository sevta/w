import Layout from "layouts";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Homepage() {
  const { data: session }: any = useSession();

  async function handleLogout(): Promise<any> {
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <Layout>
      <div>the weding {session?.user?.email}</div>
      <button onClick={handleLogout}>logout</button>
      {session?.user?.role === "ADMIN" && (
        <>
          <Link href="/admin" passHref>
            <a className="link">Admin</a>
          </Link>
        </>
      )}
      <Link href="/dashboard" passHref>
        <a className="link">Dashboard</a>
      </Link>
    </Layout>
  );
}
