"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function NavBar() {
  const session = useSession();
  const t = useTranslations("navbar");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Typography variant="h6" color="primary">
          Co Working Space
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button variant="text" href="spaces">
            {t("co-working-space")}
          </Button>
          {session.data?.user ? (
            <>
              <Button variant="text" href="/reservations">
                {t("reservation")}
              </Button>
              <Button
                variant="contained"
                onClick={handleClick}
                endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {session.data.user.name}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOut();
                  }}
                >
                  {t("sign-out")}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="contained" href="/auth/signin">
              {t("sign-in")}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
