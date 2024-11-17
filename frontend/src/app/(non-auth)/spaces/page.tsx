"use client";
import { useEffect, useState } from "react";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import SpaceCard from "../../../components/space/SpaceCard";
import { CircularProgress, Box, Pagination } from "@mui/material";

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
  const spacesPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
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
        // flexWrap: "wrap",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "center",
        padding: "16px",
        alignItems: "center",
      }}
    >
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
