import { Button, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import InfoModalCard from "./InfoModalCard";
import getStripe from "@/utils/get-stripe";
import { useSession } from "next-auth/react";
import LoginCta from "../CreateRecipie/loginCta";

export const redirectToStripe = async () => {
  const response = await fetch("/api/stripe/checkout_sessions");
  if (response.status !== 200) {
    console.error(response.status);
    return;
  }
  const data = await response.json();

  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: data.data.id,
  });
};

const BuySubscriptionCard = () => {
  const session = useSession();

  if (session.status === "loading") return null;

  if (session.status === "unauthenticated") return <LoginCta />;

  return (
    <InfoModalCard>
      <Typography
        color="white"
        sx={{ mt: 2, whiteSpace: "pre-line", textAlign: "left" }}
        variant="h4"
        component="h1"
      >
        <FormattedMessage id="ranOutOfCredits" defaultMessage="Recipies AI" />
      </Typography>
      <Button
        fullWidth
        sx={{ mt: 6, color: "black", backgroundColor: "white" }}
        variant="contained"
        onClick={() => redirectToStripe()}
      >
        <FormattedMessage id="buyTokensCTA" />
      </Button>
    </InfoModalCard>
  );
};

export default BuySubscriptionCard;
