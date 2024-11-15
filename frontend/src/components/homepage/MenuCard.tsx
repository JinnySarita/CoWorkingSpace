import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface MenuCardProps {
  title: string;
  description: string;
  imgURL: string;
  to: string;
}

export default function MenuCard({
  title,
  description,
  imgURL,
  to,
}: MenuCardProps) {
  return (
    <Link
      href={to}
      className="w-full h-96 relative rounded-xl overflow-hidden hover:shadow-2xl"
    >
      <Image
        src={imgURL}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div className="absolute inset-0 bg-slate-700/70 z-10"></div>

      <div className="absolute inset-0 flex flex-col justify-start items-start gap-4 z-20 p-8 text-white text-start">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h5">{description}</Typography>
      </div>
    </Link>
  );
}
