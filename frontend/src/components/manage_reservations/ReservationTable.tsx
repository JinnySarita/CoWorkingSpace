"use client";
import {
  CircularProgress,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ReservationTableRows, { ReservationItem } from "./ReservationTableRows";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getReservations from "@/libs/getReservations";
import { useTranslations } from "next-intl";

export default function ReservationTable() {
  const t = useTranslations("reservations.manage");

  const session = useSession();

  const [data, setData] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const reservations = await getReservations(session.data!.user.token!);
        setLoading(false);
        setData(reservations);
      } catch (error) {
        setLoading(false);
        setError(t("error_fetch"));
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (data.length === 0) {
    return <p>{t("no-reservations")}</p>;
  }

  return (
    <Table>
      <TableHead className="bg-slate-100">
        <TableRow>
          <TableCell>{t("table.co-working-space-name")}</TableCell>
          {session.data?.user.role == "admin" && (
            <TableCell>{t("table.user-name")}</TableCell>
          )}
          <TableCell>{t("table.no-of-rooms")}</TableCell>
          <TableCell>{t("table.reserved-date")}</TableCell>
          <TableCell>{t("table.reserved-at")}</TableCell>
        </TableRow>
      </TableHead>
      <ReservationTableRows reservations={data} />
    </Table>
  );
}
