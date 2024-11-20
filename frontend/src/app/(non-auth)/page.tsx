import Banner from "@/components/homepage/Banner";
import MenuCard from "@/components/homepage/MenuCard";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homepage.menu-card");
  return (
    <div className="flex flex-col gap-8 w-full">
      <Banner />
      <div className="flex flex-col md:flex-row gap-8">
        <MenuCard
          title={t("explore.title")}
          description={t("explore.description")}
          imgURL={"/menu.png"}
          to={"/spaces"}
        />
        <MenuCard
          title={t("reserve.title")}
          description={t("reserve.description")}
          imgURL={"/menu.png"}
          to={"/reservations/create"}
        />
      </div>
    </div>
  );
}
