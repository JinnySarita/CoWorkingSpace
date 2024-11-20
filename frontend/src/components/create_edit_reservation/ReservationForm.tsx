"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface ReservationFormProps {
  coWorkingSpaceID?: string;
  numberOfRooms?: number;
  reservationDate?: string;
  onSubmit: (data: {
    coWorkingSpaceID: string;
    numberOfRooms: number;
    reservationDate: Dayjs | null;
  }) => void;
}

export default function ReservationForm({
  coWorkingSpaceID,
  numberOfRooms,
  reservationDate,
  onSubmit,
}: ReservationFormProps) {
  const t = useTranslations("reservations.form");

  const Schema = z.object({
    coWorkingSpaceID: z.string().min(1),
    numberOfRooms: z.number().min(1).max(3),
    reservationDate: z
      .custom<Dayjs>((val) => dayjs.isDayjs(val) && val.isValid())
      .refine((val) => val.isAfter(dayjs())),
  });

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      coWorkingSpaceID: coWorkingSpaceID || "",
      numberOfRooms: numberOfRooms,
      reservationDate: reservationDate ? dayjs(reservationDate) : null,
    },
  });

  const [spaces, setSpaces] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spaces = await getCoWorkingSpaces();
        setSpaces(
          spaces.map((space: any) => ({ id: space.id, name: space.name }))
        );
        setLoading(false);
      } catch (error) {
        router.back();
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress data-testid="loading" />;
  }

  const submitHandler = (data: any) => {
    onSubmit(data);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={form.handleSubmit(submitHandler)}
    >
      <FormControl className="w-full">
        <InputLabel id="co-working-space" htmlFor="co-working-space">
          {t("co-working-space-label")}
        </InputLabel>
        <Select
          id="co-working-space"
          label={t("co-working-space-label")}
          {...form.register("coWorkingSpaceID")}
          error={!!form.formState.errors.coWorkingSpaceID}
          defaultValue={coWorkingSpaceID || ""}
        >
          {spaces.map((space) => (
            <MenuItem key={space.id} value={space.id}>
              {space.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-full">
        <TextField
          {...form.register("numberOfRooms", { valueAsNumber: true })}
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/\D/g, "");
            form.setValue(
              "numberOfRooms",
              sanitizedValue ? parseInt(sanitizedValue) : 0
            );
          }}
          error={!!form.formState.errors.numberOfRooms}
          variant="outlined"
          label={t("no-of-rooms-label")}
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={form.watch("reservationDate")}
          onChange={(date) => form.setValue("reservationDate", date)}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              fullWidth: true,
              label: t("reserved-date-label"),
              error: !!form.formState.errors.reservationDate,
            },
          }}
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained">
        {t("submit")}
      </Button>
    </form>
  );
}
