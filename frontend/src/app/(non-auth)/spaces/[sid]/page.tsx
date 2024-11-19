"use client";

import { useEffect, useState } from "react";
import getCoWorkingSpace from "@/libs/getCoWorkingSpace";
import deleteSpace from "@/libs/deleteCoWokingSpace";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/space/ConfirmationDialog";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SpaceDetailPage({
  params,
}: {
  params: { sid: string };
}) {
  const [spaceData, setSpaceData] = useState<{
    name: string;
    picture: string;
    operatingHours: string;
    address: string;
    tel: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const session = useSession();
  const t = useTranslations("spaces.get");
  const router = useRouter();

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await getCoWorkingSpace(params.sid);
        setSpaceData(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Failed to fetch space details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceData();
  }, [params.sid]);

  const handleDelete = async () => {
    try {
      await deleteSpace(session.data?.user.token!, params.sid);
      router.push("/spaces");
    } catch (error) {
      console.error("Failed to delete space:", error);
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
              startIcon={<EditIcon />}
              onClick={() => router.push(`/spaces/${params.sid}/edit`)}
            >
              {t("edit")}
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setIsDialogOpen(true)}
            >
              {t("delete")}
            </Button>
            <ConfirmationDialog
              open={isDialogOpen}
              title={t("confirm-delete-title")}
              onClose={() => setIsDialogOpen(false)}
              onConfirm={handleDelete}
              confirmLabel={t("delete")}
              cancelLabel={t("cancel")}
            />
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
          sx={{
            position: "relative",
            width: "960px", // Fixed width
            height: "480px", // Fixed height (maintains 2:1 ratio)
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Image
            src={spaceData.picture}
            alt="Space Image"
            fill
            className="object-cover"
            sizes="(max-width: 960px) 100vw, 960px"
            priority
          />
        </Box>

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
