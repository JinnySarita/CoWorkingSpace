"use client";
import { useEffect, useState } from "react";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import SpaceCard from "../../../components/space/SpaceCard";
import { CircularProgress, Box } from "@mui/material";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {spaces.map((space) => {
        console.log("space.picture", space.picture); // Log the image URL
        return (
          <SpaceCard
            key={space.id}
            imgUrl={space.picture}
            title={space.name}
            detail={`${space.address}`}
            tel={space.tel}
          />
        );
      })}
    </Box>
  );
}
