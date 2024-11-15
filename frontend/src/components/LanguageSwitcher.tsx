"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    document.cookie = `locale=${locale}`;
    router.refresh();
  };

  return (
    <div>
      <Button
        variant="text"
        color="inherit"
        onClick={() => changeLanguage("en")}
      >
        English
      </Button>
      <Button
        variant="text"
        color="inherit"
        onClick={() => changeLanguage("th")}
      >
        ไทย
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
