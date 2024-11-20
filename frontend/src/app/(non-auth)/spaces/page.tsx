"use client";
import { useEffect, useState } from "react";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpaceList from "@/components/space/SpaceList";
import PaginationControl from "@/components/space/PaginationControl";

type Space = {
  id: string;
  name: string;
  address: string;
  tel: string;
  picture: string;
};

export default function Spaces() {
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();

  const t = useTranslations("spaces.explore");

  const router = useRouter();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await getCoWorkingSpaces();
        setSpaces(
          response.map((space: any) => ({
            id: space.id,
            name: space.name,
            address: space.address,
            tel: space.tel,
            picture: space.picture,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch spaces:", error);
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

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

  const spacesPerPage = 8;

  // Calculate the total number of pages
  const totalPages = Math.ceil(spaces.length / spacesPerPage);

  // Get the spaces to display for the current page
  const displayedSpaces = spaces.slice(
    (currentPage - 1) * spacesPerPage,
    currentPage * spacesPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h4">{t("Explore-Co-Working-Spaces")}</Typography>
        {session.data?.user.role === "admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/spaces/create")}
          >
            + {t("Create-Co-working Space")}
          </Button>
        )}
      </Box>
      <SpaceList spaces={displayedSpaces} />
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />{" "}
    </Box>
  );
}
