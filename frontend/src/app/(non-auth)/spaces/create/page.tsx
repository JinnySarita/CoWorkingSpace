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
import postSpace from "@/libs/postSpace";

export default function Create() {
  const t = useTranslations("spaces.create");

  // States for form inputs
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [tel, setTel] = useState("");

  // States for TimePicker values
  const [openTime, setOpenTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T00:00")
  );
  const [closeTime, setCloseTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T23:59")
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Logic for determining time format
    let time;
    if (
      openTime?.isSame(dayjs("2022-04-17T00:00")) &&
      closeTime?.isSame(dayjs("2022-04-17T23:59"))
    ) {
      time = "24Hours";
    } else {
      const formattedOpenTime = openTime?.format("HH:mm");
      const formattedCloseTime = closeTime?.format("HH:mm");
      time = `${formattedOpenTime} - ${formattedCloseTime}`;
    }

    try {
      // POST request to the API
      const response = await postSpace(
        name,
        pictureUrl,
        address,
        province,
        postalCode,
        tel,
        time
      ); // Assuming postSpace is defined elsewhere
      if (response.ok) {
        // Handle success
        console.log("Space created successfully!");
      } else {
        // Handle error
        console.error("Failed to create space:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <TextField
              required
              label={t("Name")}
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              label={t("Picture-URL")}
              variant="outlined"
              fullWidth
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
            <TextField
              required
              label={t("Address")}
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              required
              label={t("Province")}
              variant="outlined"
              fullWidth
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
            <TextField
              required
              label={t("Postal-Code")}
              variant="outlined"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <TextField
              required
              label={t("Tel")}
              variant="outlined"
              fullWidth
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
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
            <Button type="submit" variant="contained" color="primary">
              {t("Create")}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
