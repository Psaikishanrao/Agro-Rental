import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo-removebg-preview.png";
import Language from "./Language";
import { Link } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "skyblue", height: isSmallScreen ? "60px" :"80px" }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{
              marginRight: isSmallScreen ? "5px" : "10px",
              width: isSmallScreen ? "35px" : isMediumScreen ? "45px" : isLargeScreen ? "60px" : "75px",
              height: isSmallScreen ? "30px" : isMediumScreen ? "45px" : isLargeScreen ? "60px" : "75px",
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: isSmallScreen ? "14px" : isMediumScreen ? "18px" : isLargeScreen ? "24px" : "30px",
            }}
          >
            AGRORENTEL
          </Typography>
          <Stack
            direction="row"
            spacing={isSmallScreen ? 0 : 2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Link to="/">
              <Button
                color="inherit"
                sx={{
                  fontSize: isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "16px" : "18px",
                  padding: isSmallScreen ? "0.5px 0.5px" : "6px 10px",
                }}
              >
                Home
              </Button>
            </Link>
            <Link to="/aboutus">
              <Button
                color="inherit"
                sx={{
                  fontSize: isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "16px" : "18px",
                  padding: isSmallScreen ? "0.5px 0.5px" : "6px 10px",
                }}
              >
                About Us
              </Button>
            </Link>
            <Link to="/contactus">
              <Button
                color="inherit"
                sx={{
                  fontSize: isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "16px" : "18px",
                  padding: isSmallScreen ? "0.5px 0.5px" : "6px 10px", marginLeft: isSmallScreen ? "5px" :"2px",
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
