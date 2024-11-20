"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (!session || session.data?.user.role !== "admin") {
    redirect("/spaces");
  }

  return children;
}
