import { Typography } from "@mui/material";
import Image from "next/image";
import logo from "assets/logoRojo.png";
import { styled } from "@mui/material/styles";

type Props = {
  title: any;
  subTitle: any;
};

const TypographyWith = styled(Typography)(({ theme }) => ({
  backgroundImage: `-webkit-linear-gradient(45deg,${theme.palette.primary.main}  30%,  ${theme.palette.secondary.main} 90%) `,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
}));

const PageHeader = ({ title, subTitle }: Props) => {
  return (
    <>
      <Image src={logo} alt="Logo" width={200} />
      <TypographyWith
        sx={{
          mt: 2,

          backgroundImage:
            "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        variant="h3"
      >
        {title}
      </TypographyWith>
      <Typography variant="h5" sx={{ mt: 4, fontWeight: 700 }}>
        {subTitle}
      </Typography>
    </>
  );
};

export default PageHeader;
