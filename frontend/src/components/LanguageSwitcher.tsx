"use client";
import { Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    document.cookie = `locale=${locale}`;
    router.refresh();
  };

  return (
    <ButtonGroup variant="text" color="inherit">
      <Button color="inherit" onClick={() => changeLanguage("en")}>
        EN
      </Button>

      <Button color="inherit" onClick={() => changeLanguage("th")}>
        ไทย
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
