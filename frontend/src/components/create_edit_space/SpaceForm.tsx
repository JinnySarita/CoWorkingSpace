"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";

interface SpaceFormProps {
  initialData?: {
    name: string;
    pictureUrl: string;
    address: string;
    province: string;
    postalCode: string;
    tel: string;
    openTime: string;
    closeTime: string;
  };
  onSubmit: (data: {
    name: string;
    pictureUrl: string;
    address: string;
    province: string;
    postalCode: string;
    tel: string;
    time: string;
  }) => void;
  submitLabel: string;
}

export default function SpaceForm({
  initialData,
  onSubmit,
  submitLabel,
}: SpaceFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [pictureUrl, setPictureUrl] = useState(initialData?.pictureUrl || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [province, setProvince] = useState(initialData?.province || "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");
  const [tel, setTel] = useState(initialData?.tel || "");

  const t = useTranslations("spaces.create");

  const [openTime, setOpenTime] = useState<Dayjs | null>(
    initialData?.openTime
      ? dayjs(initialData.openTime)
      : dayjs("2022-04-17T00:00")
  );
  const [closeTime, setCloseTime] = useState<Dayjs | null>(
    initialData?.closeTime
      ? dayjs(initialData.closeTime)
      : dayjs("2022-04-17T23:59")
  );

  const [errors, setErrors] = useState({
    name: "",
    pictureUrl: "",
    address: "",
    province: "",
    postalCode: "",
    tel: "",
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

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

    onSubmit({ name, pictureUrl, address, province, postalCode, tel, time });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ marginBottom: "32px" }}>
        {t("information")}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
          onChange={(e) => setAddress(e.target.value.slice(0, 100))}
          multiline
          minRows={4}
          error={!!errors.address}
          helperText={errors.address ? errors.address : `${address.length}/100`}
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
          onChange={(e) =>
            setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))
          }
          error={!!errors.postalCode}
          helperText={errors.postalCode}
        />
        <TextField
          label={t("Tel")}
          variant="outlined"
          fullWidth
          value={tel}
          onChange={(e) =>
            setTel(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          error={!!errors.tel}
          helperText={errors.tel}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", gap: "16px" }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
          >
            {t("Create")}{" "}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
