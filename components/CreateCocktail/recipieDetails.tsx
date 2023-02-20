import { Typography, Box, TextField } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  setPrimaryIngredient: any;
  primaryIngredient: string;
  alergies: string;
  setAlergies: any;
  personCount: string;
  setPersonCount: any;
};

const RecipieDetails = ({
  setPrimaryIngredient,
  primaryIngredient,
  alergies,
  setAlergies,
  personCount,
  setPersonCount,
}: Props) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h3">
        <FormattedMessage id="recipieDetails" />
      </Typography>
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="recipieDetailsIngredients" />}
        onChange={(e) => setPrimaryIngredient(e.target.value)}
        value={primaryIngredient}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="recipieDetailsAlergies" />}
        variant="outlined"
        value={alergies}
        onChange={(e) => setAlergies(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="personCount" />}
        type="number"
        variant="outlined"
        value={personCount}
        onChange={(e) => setPersonCount(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};
export default RecipieDetails;
