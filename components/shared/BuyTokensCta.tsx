import getStripe from "@/utils/get-stripe";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

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

const BuyTokensCta = () => {
  return (
    <Button
      color="secondary"
      sx={{ my: 2 }}
      variant="contained"
      fullWidth
      onClick={() => redirectToStripe()}
    >
      <FormattedMessage id="buyTokensCTA" />
    </Button>
  );
};

export default BuyTokensCta;
