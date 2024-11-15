"use client";

import ReservationForm from "@/components/create_edit_reservation/ReservationForm";
import postReservation from "@/libs/postReservation";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function page() {
  const t = useTranslations("reservations.form");
  const session = useSession();
  const router = useRouter();

  async function handleSubmit({
    coWorkingSpaceID,
    numberOfRooms,
    reservationDate,
  }: {
    coWorkingSpaceID: string;
    numberOfRooms: number;
    reservationDate: Dayjs | null;
  }) {
    try {
      const response = await postReservation(
        session.data?.user.token!,
        coWorkingSpaceID,
        reservationDate!.format("YYYY-MM-DD"),
        numberOfRooms
      );
      router.push(`/reservations`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h4">{t("create-title")}</Typography>
      <Typography variant="h5">{t("create-description")}</Typography>
      <ReservationForm onSubmit={handleSubmit} />
    </div>
  );
}
