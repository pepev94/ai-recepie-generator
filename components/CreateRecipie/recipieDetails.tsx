import { Typography, Box, Slider } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { MuiChipsInput } from "mui-chips-input";

type Props = {
  setPrimaryIngredient: any;
  primaryIngredient: string[];
  setPersonCount: any;
  personCount: string;
};

const RecipieDetails = ({
  setPrimaryIngredient,
  primaryIngredient,
  setPersonCount,
  personCount,
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
      <Typography sx={{ fontWeight: 700 }} variant="h5" component="h3">
        <FormattedMessage id="recipieDetails" />
      </Typography>

      <Typography>
        <FormattedMessage id="recipieDetailsIngredients" />
      </Typography>

      <MuiChipsInput
        addOnWhichKey={["Tab", "Enter"]}
        clearInputOnBlur
        value={primaryIngredient}
        onChange={(e) => setPrimaryIngredient(e)}
      />

      <Typography>
        <FormattedMessage id="personCount" />
      </Typography>
      <Slider
        value={parseFloat(personCount)}
        //@ts-ignore
        onChange={(e) => setPersonCount(e.target.value)}
        defaultValue={1}
        valueLabelDisplay="on"
        step={1}
        marks
        min={1}
        max={10}
      />
    </Box>
  );
};
export default RecipieDetails;
