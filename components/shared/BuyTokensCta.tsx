import { Button, Box, Dialog } from "@mui/material";
import { useState } from "react";
import BuyMoreTokensModal from "../shared/BuyTokensModal";
import { FormattedMessage } from "react-intl";

const BuyTokensCta = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-buy-credits"
        aria-describedby="modal-bur-credits"
      >
        <BuyMoreTokensModal />
      </Dialog>
      <Button
        color="secondary"
        sx={{ my: 2 }}
        variant="contained"
        fullWidth
        onClick={() => setOpenModal(true)}
      >
        <FormattedMessage id="buyTokensCTA" />
      </Button>
    </Box>
  );
};

export default BuyTokensCta;
