import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";

interface SpaceCardProps {
  imgUrl: string;
  title: string;
  detail: string;
  tel: string;
}

export default function SpaceCard({
  imgUrl,
  title,
  detail,
  tel,
}: SpaceCardProps) {
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
          width: "280px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
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
