"use client";
import React, { useEffect, useState } from "react";
import SpaceForm from "@/components/create_edit_space/SpaceForm";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import putSpace from "@/libs/putCoWorkingSpace";
import { useRouter } from "next/navigation";
import { CircularProgress, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

export default function EditSpacePage({ params }: { params: { sid: string } }) {
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

        if (data.operatingHours === "24 Hours") {
          openTime = dayjs("2022-04-17T00:00"); // 12:00 AM
          closeTime = dayjs("2022-04-17T23:59"); // 11:59 PM
        } else {
          [openTime, closeTime] = data.operatingHours
            .split(" - ")
            .map((time: string) =>
              dayjs(`2022-04-17T${convertTo24HourFormat(time)}`)
            );
        }

        console.log("Open time:", openTime.toISOString());

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

  const convertTo24HourFormat = (time: string): string => {
    time = time.replace(".", ":");

    console.log("Converting time", time);
    const match = time.match(/(\d{1,2}):(\d{2})\s(AM|PM)/i);

    console.log("match", match);
    if (!match) {
      throw new Error(`Invalid time format: ${time}`);
    }

    const hour = match[1];
    const minute = match[2];
    const period = match[3];
    let formattedHour = parseInt(hour!, 10);
    if (period.toUpperCase() === "PM" && formattedHour !== 12)
      formattedHour += 12;
    if (period.toUpperCase() === "AM" && formattedHour === 12)
      formattedHour = 0;

    return `${formattedHour.toString().padStart(2, "0")}:${minute}`;
  };

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
    <SpaceForm
      initialData={initialData}
      onSubmit={handleUpdate}
      submitLabel="Update"
    />
  );
}
