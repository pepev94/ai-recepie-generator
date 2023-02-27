import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import { FormattedMessage } from "react-intl";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import logo from "assets/logo2Blanco.png";

const AppBarWithTheme = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export default function NavBar({}) {
  const session = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarWithTheme position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Link style={{ textDecoration: "none" }} href="/">
                <Button sx={{ color: "white" }} color="inherit">
                  <FormattedMessage id="Home" />
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} href="/cocktails">
                <Button sx={{ color: "white" }} color="inherit">
                  <FormattedMessage id="Cocktails" />
                </Button>
              </Link>
              {session.status === "authenticated" && (
                <Button onClick={() => signOut()} color="inherit">
                  <FormattedMessage id="signOut" />
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Image src={logo} alt="Logo" width={30} />
            </Box>
          </Box>
        </Toolbar>
      </AppBarWithTheme>
    </Box>
  );
}
