"use client";
import { Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const t = useTranslations();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex font-sans">Hello</div>
      <p>{t("test")}</p>
      {session.data ? (
        <Link href="api/auth/signout">
          <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
            Sign-Out of {session.data?.user?.name}
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
