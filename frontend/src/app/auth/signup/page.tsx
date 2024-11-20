"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "@/libs/register";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the step (1: Email/Password, 2: Complete Registration)

  const router = useRouter();
  const t = useTranslations("sign-up");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError(null);
  };

  const handleNextStep = () => {
    if (!email) {
      setError("Please provide an email.");
      setOpenSnackbar(true);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setOpenSnackbar(true);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setOpenSnackbar(true);
      return;
    }

    setCurrentStep(2); // Move to the next step
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(name, email, tel, password);
      if (response.success) {
        router.push("/auth/signin");
      } else {
        setError(response.message || "Unable to register.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Equivalent to h-screen
      }}
    >
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
          "@media (min-width:600px)": {
            maxWidth: "472px",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography gutterBottom variant="h4">
                {t("sign-up")}
              </Typography>
              <Typography gutterBottom variant="h6">
                {t("create-your-account")}
              </Typography>

              <TextField
                required
                id="email"
                label={t("email")}
                type="email"
                variant="outlined"
                value={email} // Retain value when navigating back
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "100%", marginTop: "16px" }}
              />
              <TextField
                required
                id="password"
                label={t("password")}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password} // Retain value when navigating back
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: "100%", marginTop: "16px" }}
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
              <TextField
                required
                id="confirm-password"
                label={t("confirm-password")}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword} // Retain value when navigating back
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ width: "100%", marginTop: "16px" }}
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

              <Button
                type="button"
                variant="contained"
                sx={{ width: "100%", marginTop: "32px" }}
                onClick={handleNextStep}
              >
                {t("next")}
              </Button>
            </Box>
          )}

          {currentStep === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography gutterBottom variant="h4">
                {t("sign-up")}
              </Typography>
              <Typography gutterBottom variant="h6">
                {t("create-your-account")}
              </Typography>

              <TextField
                required
                id="name"
                label={t("name")}
                type="name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "100%", marginTop: "16px" }}
              />
              <TextField
                required
                id="tel"
                label={t("tel")}
                type="tel"
                variant="outlined"
                onChange={(e) => setTel(e.target.value)}
                sx={{ width: "100%", marginTop: "16px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "32px",
                }}
              >
                <Button
                  type="button"
                  sx={{ width: "50%", marginRight: "16px" }}
                  variant="outlined"
                  onClick={() => setCurrentStep(1)} // Navigate back
                >
                  {t("back")}
                </Button>

                <Button type="submit" variant="contained" sx={{ width: "50%" }}>
                  {t("sign-up")}
                </Button>
              </Box>
            </Box>
          )}

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
              {t("have-account")}
            </Typography>

            <Link href="/auth/signin" sx={{ marginLeft: "8px" }}>
              {t("sign-in")}
            </Link>
          </Box>
        </form>
      </Card>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
