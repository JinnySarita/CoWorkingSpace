"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/material";
import SpaceForm from "@/components/create_edit_space/SpaceForm";
import postSpace from "@/libs/postCoWokingSpace";
import { useRouter } from "next/navigation";

export default function Create() {
  const t = useTranslations("spaces.create");
  const session = useSession();
  const router = useRouter();

  // Submit handler for the SpaceForm
  const handleCreate = async (formData: {
    name: string;
    pictureUrl: string;
    address: string;
    province: string;
    postalCode: string;
    tel: string;
    time: string;
  }) => {
    try {
      const response = await postSpace(
        session.data?.user.token!,
        formData.name,
        formData.address,
        formData.time,
        formData.province,
        formData.postalCode,
        formData.tel,
        formData.pictureUrl
      );
      if (response.success) {
        router.push("/spaces");
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
      }}
    >
      <Box>
        <Typography variant="h4">{t("Create-New-Co-working-Space")}</Typography>
      </Box>
      <Box sx={{ marginBottom: "32px" }}>
        <SpaceForm onSubmit={handleCreate} submitLabel="Create" />
      </Box>
    </Box>
  );
}
