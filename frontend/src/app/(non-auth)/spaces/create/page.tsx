import React from "react";
import { useTranslations } from "next-intl";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Create() {
  const t = useTranslations("spaces.create");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h4">{t("Create-New-Co-working-Space")}</Typography>
      </Box>

      <Box sx={{ marginBottom: "32px" }}>
        <Typography variant="h5">{t("information")}</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <TextField label={t("Name")} variant="outlined" fullWidth />
          <TextField label={t("Picture-URL")} variant="outlined" fullWidth />
          <TextField label={t("Province")} variant="outlined" fullWidth />
          <TextField label={t("Postal-Code")} variant="outlined" fullWidth />
          <TextField label={t("Tel")} variant="outlined" fullWidth />
        </Box>

        <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <TextField label={t("OpenTime")} variant="outlined" fullWidth />
          <TextField label={t("CloseTime")} variant="outlined" fullWidth />
        </Box>

        <Box sx={{ marginTop: "16px" }}>
          <Button variant="contained" color="primary">
            {t("Submit")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
