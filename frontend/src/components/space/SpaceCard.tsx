import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/navigation";

interface SpaceCardProps {
  imgUrl: string;
  title: string;
  detail: string;
  tel: string;
  id: string; // Add an id property to navigate to the details page
}

export default function SpaceCard({
  imgUrl,
  title,
  detail,
  tel,
  id,
}: SpaceCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/spaces/${id}`); // Navigate to the space details page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        variant="elevation"
        sx={{
          width: "379px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          cursor: "pointer", // Add pointer cursor to indicate clickability
        }}
        onClick={handleCardClick} // Handle click event
      >
        <CardMedia component="img" height="200" image={imgUrl} alt={title} />

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {detail}
          </Typography>
          <Chip label={`Tel: ${tel}`} color="default" />
        </CardContent>
      </Card>
    </Box>
  );
}
