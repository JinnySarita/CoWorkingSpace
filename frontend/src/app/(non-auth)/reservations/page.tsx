import ReservationTable from "@/components/manage_reservations/ReservationTable";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("reservations.manage");

  return (
    <div className="flex flex-col gap-8 w-full">
      <Typography variant="h4">{t("title")}</Typography>
      <div className="w-full flex justify-center items-center">
        <ReservationTable />
      </div>
    </div>
  );
}
