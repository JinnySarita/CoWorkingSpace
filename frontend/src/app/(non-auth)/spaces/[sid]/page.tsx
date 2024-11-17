"use client";

import { useEffect, useState } from "react";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import deleteSpace from "@/libs/deleteSpace";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  const t = useTranslations("spaces.get");

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
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h4">{spaceData.name}</Typography>
        {session.data?.user.role === "admin" && (
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
              variant="outlined"
              color="primary"
              //   onClick={() => router.push(`/spaces/edit/${params.sid}`)}
            >
              {t("edit")}
            </Button>
            <Button
              variant="contained"
              color="error"
              //   onClick={() => console.log("Delete logic here")}
            >
              {t("delete")}
            </Button>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "16px",
          gap: "64px",
          width: "100%",
          justifyContent: "space-between",
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
            width: "640px",
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
            href="/reservations/create"
          >
            {t("make-reservation")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
