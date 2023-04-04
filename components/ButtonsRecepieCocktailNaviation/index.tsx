import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { TypographyWithGradient } from "../shared/header";

const ButtonsRecepieCocktailNavigation = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 2,
        mt: 4,
        color: "white",
      }}
    >
      <TypographyWithGradient variant="h5">
        {" "}
        <FormattedMessage id="create" />
      </TypographyWithGradient>

      <Button onClick={() => router.push("/")} variant="outlined">
        <FormattedMessage id="food" />
      </Button>
      <Button onClick={() => router.push("/cocktails")} variant="outlined">
        <FormattedMessage id="cocktails" />
      </Button>
    </Box>
  );
};

export default ButtonsRecepieCocktailNavigation;
