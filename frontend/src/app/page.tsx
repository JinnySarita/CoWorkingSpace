import Image from "next/image";
// import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex font-sans">Hello</div>
      {session ? (
        <Link href="api/auth/signout">
          <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
            Sign-Out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="api/auth/signin">
          <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
            Sign-In
          </div>
        </Link>
      )}
    </main>
  );
}
