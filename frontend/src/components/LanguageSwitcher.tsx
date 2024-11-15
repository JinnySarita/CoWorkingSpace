"use client";
import { Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";

const LanguageSwitcher = ({ className }: { className: string }) => {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/;`;
    router.refresh();
  };

  return (
    <ButtonGroup variant="text" color="inherit" className={className}>
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
