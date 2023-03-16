import { Button, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import InfoModalCard from "../shared/InfoModalCard";
import { redirectToStripe } from "./BuyTokensCta";

const BuyMoreTokensModal = () => {
  return (
    <InfoModalCard>
      <Typography color="white" sx={{ mt: 2 }} variant="h4" component="h1">
        <FormattedMessage id="ranOutOfCredits" defaultMessage="Recipies AI" />
      </Typography>
      <Button
        fullWidth
        sx={{ mt: 2, color: "black", backgroundColor: "white" }}
        variant="contained"
        onClick={() => redirectToStripe()}
      >
        <FormattedMessage id="buyTokensCTA" />
      </Button>
    </InfoModalCard>
  );
};

export default BuyMoreTokensModal;
