"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
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
    coWorkingSpaceID: z
      .string()
      .min(1, { message: t("co-working-space-required-error") }),
    numberOfRooms: z
      .number({ invalid_type_error: t("no-of-rooms-required-error") })
      .min(1, { message: t("no-of-rooms-range-error") })
      .max(3, { message: t("no-of-rooms-range-error") }),
    reservationDate: z
      .custom<Dayjs>((val) => dayjs.isDayjs(val) && val.isValid(), {
        message: t("reserved-date-required-error"),
      })
      .refine((val) => val.isAfter(dayjs()), {
        message: t("reserved-date-range-error"),
      }),
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
        <InputLabel
          id="co-working-space"
          htmlFor="co-working-space"
          sx={{
            color: form.formState.errors.coWorkingSpaceID && "error.main",
          }}
        >
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
        <FormHelperText
          sx={{
            color: "error.main",
          }}
        >
          {form.formState.errors.coWorkingSpaceID?.message}
        </FormHelperText>
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
          helperText={form.formState.errors.numberOfRooms?.message}
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
              helperText: form.formState.errors.reservationDate?.message,
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
