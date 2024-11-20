import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Banner() {
  const t = useTranslations("homepage.banner");

  return (
    <div className="w-full h-96 relative rounded-xl overflow-hidden">
      <Image
        src="/img/banner.webp"
        alt="Banner"
        fill
        priority
        className="z-0 object-cover"
        sizes="100"
      />

      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 z-20 p-4 text-white text-center">
        <Typography variant="h2">{t("title")}</Typography>
        <Typography variant="h5">{t("description")}</Typography>
      </div>
    </div>
  );
}
