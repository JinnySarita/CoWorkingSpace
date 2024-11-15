"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import * as React from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Card,
  Button,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("sign-in");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "left",
          width: "100%",
          margin: "auto",
          padding: "64px",
          borderRadius: "16px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          // Responsive styles for 'sm' and larger screens
          "@media (min-width:600px)": {
            maxWidth: "472px",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h4">
              {t("sign-in")}
            </Typography>
            <Typography gutterBottom variant="h6">
              {t("to-make-reservations")}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "32px" }}>
            <TextField
              required
              id="email"
              label={t("email")}
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
            <TextField
              required
              id="password"
              label={t("password")}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "100%",
                marginTop: "16px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ marginTop: "32px" }}>
            <Button type="submit" variant="contained" sx={{ width: "100%" }}>
              {t("sign-in")}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ textAlign: "center", color: "primary.main" }}
              >
                {t("don't-have-account")}
              </Typography>

              <Link href="/" sx={{ marginLeft: "8px" }}>
                {t("sign-up")}
              </Link>
            </Box>
          </Box>
        </form>
      </Card>
    </div>
  );
}
