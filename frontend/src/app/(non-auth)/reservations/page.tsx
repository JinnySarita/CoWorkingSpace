import ReservationTable from "@/components/manage_reservations/ReservationTable";
import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("reservations.manage");

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between w-full">
        <Typography variant="h4">{t("title")}</Typography>
        <Button variant="contained" startIcon={<Add />} href="/reservations/create">{t("create-btn")}</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <ReservationTable />
      </div>
    </div>
  );
}
