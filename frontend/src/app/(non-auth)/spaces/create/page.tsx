"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function Create() {
  const t = useTranslations("spaces.create");

  // States for TimePicker values
  const [openTime, setOpenTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T09:00")
  );
  const [closeTime, setCloseTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T18:00")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        justifyContent: "center",
        maxWidth: "960px",
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
            marginTop: "32px",
          }}
        >
          <TextField label={t("Name")} variant="outlined" fullWidth />
          <TextField label={t("Picture-URL")} variant="outlined" fullWidth />
          <TextField label={t("Address")} variant="outlined" fullWidth />
          <TextField label={t("Province")} variant="outlined" fullWidth />
          <TextField label={t("Postal-Code")} variant="outlined" fullWidth />
          <TextField label={t("Tel")} variant="outlined" fullWidth />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
              justifyContent: "space-between",
            }}
          >
            <TimePicker
              label={t("OpenTime")}
              value={openTime}
              onChange={(newValue) => setOpenTime(newValue)}
              sx={{ width: "50%" }}
            />

            <TimePicker
              label={t("CloseTime")}
              value={closeTime}
              onChange={(newValue) => setCloseTime(newValue)}
              sx={{ width: "50%" }}
            />
          </Box>
        </LocalizationProvider>

        <Box sx={{ marginTop: "16px" }}>
          <Button variant="contained" color="primary">
            {t("Create")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
