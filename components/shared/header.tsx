import { Typography } from "@mui/material";
import Image from "next/image";
import logo from "assets/logoRojo.png";
type Props = {
  title: any;
  subTitle: any;
};
const PageHeader = ({ title, subTitle }: Props) => {
  return (
    <>
      <Image src={logo} alt="Logo" width={200} />
      <Typography sx={{ mt: 2 }} variant="h4" component="h1">
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {subTitle}
      </Typography>
    </>
  );
};

export default PageHeader;
