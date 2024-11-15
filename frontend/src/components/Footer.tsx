import { Box } from "@mui/material";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  return (
    <Box
      className="w-full flex flex-row gap-4 p-4 justify-center"
      sx={{ bgcolor: "primary.main", color: "white" }}
    >
      <LanguageSwitcher />
    </Box>
  );
}
