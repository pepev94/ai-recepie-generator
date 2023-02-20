import { Typography } from "@mui/material";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import logo from "assets/logoRojo.png";

const CreateRecipieHeader = () => {
  return (
    <>
      <Image src={logo} alt="Logo" width={200} />
      <Typography sx={{ mt: 2 }} variant="h4" component="h1">
        <FormattedMessage id="title" defaultMessage="Recipies AI" />
      </Typography>
      <Typography variant="h5" component="h2">
        <FormattedMessage
          id="subtitle"
          defaultMessage="Create you own recipies powered by AI"
        />
      </Typography>
    </>
  );
};

export default CreateRecipieHeader;
