import { Button } from "@mui/material";
import { Box } from "@mui/system";
type Props = {
  setSelectedLanguage: any;
};
const LanguageMenu = ({ setSelectedLanguage }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 4,
        gap: 2,
      }}
    >
      <Button onClick={() => setSelectedLanguage("en")} variant="outlined">
        🇺🇸 English
      </Button>
      <Button onClick={() => setSelectedLanguage("es")} variant="outlined">
        🇪🇸 Español
      </Button>
    </Box>
  );
};

export default LanguageMenu;
