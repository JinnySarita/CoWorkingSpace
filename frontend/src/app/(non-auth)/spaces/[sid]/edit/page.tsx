"use client";
import React, { useEffect, useState } from "react";
import SpaceForm from "@/components/create_edit_space/SpaceForm";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import putSpace from "@/libs/putCoWorkingSpace";
import { useRouter } from "next/navigation";
import { CircularProgress, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function EditSpacePage({ params }: { params: { sid: string } }) {
  const t = useTranslations("spaces.edit");
  const [initialData, setInitialData] = useState<null | {
    name: string;
    pictureUrl: string;
    address: string;
    province: string;
    postalCode: string;
    tel: string;
    openTime: string;
    closeTime: string;
  }>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCoWorkingSpace(params.sid);
        const data = response.data;

        let openTime, closeTime;

        // Check for the special "24 Hours" case
        if (data.operatingHours === "24 Hours") {
          openTime = dayjs("2022-04-17T00:00"); // 00:00
          closeTime = dayjs("2022-04-17T23:59"); // 23:59
        } else {
          // Handle regular 24-hour time format without AM/PM
          [openTime, closeTime] = data.operatingHours
            .split(" - ")
            .map((time: string) => dayjs(`2022-04-17T${time}`));
        }

        // Ensure both openTime and closeTime are valid dayjs objects
        if (!openTime.isValid() || !closeTime.isValid()) {
          throw new Error("Invalid time format received.");
        }

        setInitialData({
          name: data.name,
          pictureUrl: data.picture,
          address: data.address,
          province: data.province,
          postalCode: data.postalcode,
          tel: data.tel,
          openTime: openTime.toISOString(),
          closeTime: closeTime.toISOString(),
        });
      } catch (error) {
        console.error("Failed to fetch space details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.sid]);

  const handleUpdate = async (data: {
    name: string;
    pictureUrl: string;
    address: string;
    province: string;
    postalCode: string;
    tel: string;
    time: string;
  }) => {
    try {
      await putSpace(
        session.data?.user.token!,
        params.sid,
        data.name,
        data.address,
        data.time,
        data.province,
        data.postalCode,
        data.tel,
        data.pictureUrl
      );
      router.push("/spaces");
    } catch (error) {
      console.error("Failed to update space:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!initialData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Space not found</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "32px" }}>
        {t("Edit-Co-Working-Space")}
      </Typography>
      <SpaceForm
        initialData={initialData}
        onSubmit={handleUpdate}
        submitLabel="Update"
      />
    </div>
  );
}
