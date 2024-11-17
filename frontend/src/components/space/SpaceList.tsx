import React from "react";
import { Box } from "@mui/material";
import SpaceCard from "./SpaceCard";

type Space = {
  id: string;
  name: string;
  address: string;
  tel: string;
  picture: string;
};

type SpaceListProps = {
  spaces: Space[];
};

export default function SpaceList({ spaces }: SpaceListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
        marginBottom: "32px",
      }}
    >
      {spaces.map((space) => (
        <SpaceCard
          key={space.id}
          imgUrl={space.picture}
          title={space.name}
          detail={`${space.address}`}
          tel={space.tel}
        />
      ))}
    </Box>
  );
}
