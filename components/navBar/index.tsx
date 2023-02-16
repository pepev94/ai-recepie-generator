import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import { FormattedMessage } from "react-intl";
import { styled } from "@mui/material/styles";

const AppBarWithTheme = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export default function NavBar() {
  const session = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarWithTheme position="static">
        <Toolbar>
          {session.status === "authenticated" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button variant="contained" color="secondary">
                <FormattedMessage id="buyTokensCTA" />
              </Button>
              <Button onClick={() => signOut()} color="inherit">
                <FormattedMessage id="signOut" />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBarWithTheme>
    </Box>
  );
}
