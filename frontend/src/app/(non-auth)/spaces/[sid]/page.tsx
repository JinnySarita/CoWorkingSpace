"use client";

import { useEffect, useState } from "react";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";

export default function SpaceDetailPage({
  params,
}: {
  params: { sid: string };
}) {
  const [spaceData, setSpaceData] = useState<{
    name: string;
    image: string;
    operatingHours: string;
    address: string;
    tel: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations("spaces.get");

  const router = useRouter();

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await getCoWorkingSpace(params.sid);
        setSpaceData(response.data);
      } catch (error) {
        console.error("Failed to fetch space details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceData();
  }, [params.sid]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!spaceData) {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          //   alignItems: "center",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4">{spaceData.name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "0 auto",
          padding: "16px",
          gap: "64px",
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={spaceData.image}
          alt="Space Image"
          sx={{
            maxWidth: "960px",
            height: "auto",
            aspectRatio: "2 / 1",
            objectFit: "cover",
            borderRadius: "0px",
          }}
        />

        {/* Information Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Operating Hours */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <IconButton color="default">
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="body2">{spaceData.operatingHours}</Typography>
          </Box>

          {/* Address */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <IconButton color="default">
              <PlaceIcon />
            </IconButton>
            <Typography variant="body2">{spaceData.address}</Typography>
          </Box>

          {/* Telephone */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton color="default">
              <PhoneIcon />
            </IconButton>
            <Typography variant="body2">{spaceData.tel}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/spaces/create")}
          >
            {t("make-reservation")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
