"use client";

import ReservationForm from "@/components/create_edit_reservation/ReservationForm";
import deleteReservation from "@/libs/deleteReservation";
import getReservation from "@/libs/getReservation";
import putReservation from "@/libs/putReservation";
import { Delete } from "@mui/icons-material";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the type of reservation
interface Reservation {
  coworkingspace: any;
  numOfRooms: number;
  bookingDate: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = useTranslations("reservations.form");
  const session = useSession();
  const router = useRouter();

  const [reservation, setReservation] = useState<Reservation | null>(null);

  async function fetchReservation() {
    const id = (await params).slug;
    try {
      const response = await getReservation(session.data?.user.token!, id);
      if (!response.success) {
        router.push("/reservations");
      }
      setReservation(response.data);
    } catch (error) {
      router.push("/reservations");
    }
  }

  useEffect(() => {
    fetchReservation();
  }, []);

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
      const id = (await params).slug;
      const response = await putReservation(
        session.data?.user.token!,
        id,
        coWorkingSpaceID,
        reservationDate!.format("YYYY-MM-DD"),
        numberOfRooms
      );
      if (!response.success) {
        setError(t("error-updating-reservation"));
        return;
      }
      router.push(`/reservations`);
    } catch (error) {
      setError(t("error-updating-reservation"));
    }
  }

  async function handleDelete() {
    try {
      const id = (await params).slug;
      await deleteReservation(session.data?.user.token!, id);
      router.push(`/reservations`);
    } catch (error) {
      setError(t("error-deleting-reservation"));
    }
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const setError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    reservation && (
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <Typography variant="h4">{t("edit-title")}</Typography>
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete />}
            onClick={handleDelete}
          >
            {t("delete")}
          </Button>
        </div>
        <Typography variant="h5">{t("edit-description")}</Typography>
        <ReservationForm
          onSubmit={handleSubmit}
          coWorkingSpaceID={reservation.coworkingspace.id}
          numberOfRooms={reservation.numOfRooms}
          reservationDate={reservation.bookingDate}
          submitText={t("update")}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  );
}
