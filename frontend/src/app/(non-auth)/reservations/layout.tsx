import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin?callbackUrl=/reservations/create");
  }

  return children;
}
