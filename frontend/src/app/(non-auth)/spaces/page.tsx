"use client";
import { useEffect, useState } from "react";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import SpaceCard from "../../../components/space/SpaceCard";
import {
  CircularProgress,
  Box,
  Pagination,
  Typography,
  Button,
} from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionInterface } from "../../../../interface";

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
  const [userRole, setUserRole] = useState<string | null>(null); // State to hold user role
  const { data, status }: { data: SessionInterface | null; status: string } =
    useSession();

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

    // Fetch user profile and role only if session is available
    const fetchUserProfile = async (token: string) => {
      try {
        const userProfile = await getUserProfile(token); // Fetch user profile using the token
        setUserRole(userProfile.data.role); // Set the role to the state
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    // Fetch user data if session is authenticated
    if (status === "authenticated" && data) {
      const { user } = data;
      fetchUserProfile(user.token); // Pass token to fetch user profile
    }

    fetchSpaces(); // Fetch spaces on load
  }, [data, status]); // Dependency array ensures effect runs when session status/data changes

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
        padding: "16px",
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

        {/* Conditionally render the button for 'admin' role */}
        {userRole === "admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/spaces/create")}
          >
            + {t("Create Co-working Space")}
          </Button>
        )}
      </Box>

      {/* Space Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        {displayedSpaces.map((space) => (
          <SpaceCard
            key={space.id}
            imgUrl={space.picture}
            title={space.name}
            detail={`${space.address}`}
            tel={space.tel}
          />
        ))}
      </Box>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
}
