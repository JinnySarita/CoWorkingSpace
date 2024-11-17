"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
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

  const session = useSession();

  // States for TimePicker values
  const [openTime, setOpenTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T00:00")
  );
  const [closeTime, setCloseTime] = useState<Dayjs | null>(
    dayjs("2022-04-17T23:59")
  );

  // States for error handling
  const [errors, setErrors] = useState({
    name: "",
    pictureUrl: "",
    address: "",
    province: "",
    postalCode: "",
    tel: "",
  });

  // Function to handle form validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      pictureUrl: "",
      address: "",
      province: "",
      postalCode: "",
      tel: "",
    };

    if (!name) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!pictureUrl) {
      newErrors.pictureUrl = "Picture URL is required.";
      valid = false;
    }
    if (!address) {
      newErrors.address = "Address is required.";
      valid = false;
    }
    if (!province) {
      newErrors.province = "Province is required.";
      valid = false;
    }
    if (!postalCode) {
      newErrors.postalCode = "Postal code is required.";
      valid = false;
    }
    if (!tel) {
      newErrors.tel = "Telephone is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

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
        session.data?.user.token!,
        name,
        address,
        time,
        province,
        postalCode,
        tel,
        pictureUrl
      );
      if (response.success) {
        console.log("Space created successfully!");
      } else {
        console.error("Failed to create space:", response);
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
              label={t("Name")}
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label={t("Picture-URL")}
              variant="outlined"
              fullWidth
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              error={!!errors.pictureUrl}
              helperText={errors.pictureUrl}
            />
            <TextField
              label={t("Address")}
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => {
                const newAddress = e.target.value.slice(0, 100);
                setAddress(newAddress);
              }}
              multiline
              minRows={4}
              error={!!errors.address}
              helperText={
                errors.address ? errors.address : `${address.length}/100`
              }
            />

            <TextField
              label={t("Province")}
              variant="outlined"
              fullWidth
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              error={!!errors.province}
              helperText={errors.province}
            />
            <TextField
              label={t("Postal-Code")}
              variant="outlined"
              fullWidth
              value={postalCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                setPostalCode(value);
              }}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
            <TextField
              label={t("Tel")}
              variant="outlined"
              fullWidth
              value={tel}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setTel(value);
              }}
              error={!!errors.tel}
              helperText={errors.tel}
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
