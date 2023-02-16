import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import { FormattedMessage } from "react-intl";

export default function NavBar() {
  const session = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {session.status === "authenticated" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button color="inherit">
                <FormattedMessage id="buyTokensCTA" />
              </Button>
              <Button onClick={() => signOut()} color="inherit">
                <FormattedMessage id="signOut" />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
