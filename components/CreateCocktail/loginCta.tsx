import { Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { signIn } from "next-auth/react";

const CardWithGradient = styled(Card)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

const LoginCta = () => {
  return (
    <CardWithGradient elevation={12} sx={{ p: 5, width: "100%" }}>
      <Typography color="white" sx={{ mt: 2 }} variant="h4" component="h1">
        <FormattedMessage id="title" defaultMessage="Recipies AI" />
      </Typography>
      <Typography sx={{ mt: 2 }} color="white" variant="h5" component="h2">
        <FormattedMessage
          id="subtitle"
          defaultMessage="Create you own recipies powered by AI"
        />
      </Typography>
      <Typography sx={{ mt: 3 }} color="white" variant="h5" component="h2">
        <FormattedMessage id="signInCTA" />
      </Typography>
      <Button
        fullWidth
        sx={{ mt: 2, color: "black", backgroundColor: "white" }}
        variant="contained"
        onClick={() => signIn()}
      >
        <FormattedMessage id="signIn" />
      </Button>
    </CardWithGradient>
  );
};

export default LoginCta;
