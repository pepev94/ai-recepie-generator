import {
  Typography,
  Box,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  setSpecialRecipe: any;
};

export const SpecialRecepieObj = {
  none: "none",
  keto: "keto",
  lowCarb: "low carb",
  glutenFree: "gluten free",
  dairyFree: "dairy free",
  paleo: "paleo",
  sugarFree: "sugar free",
};

const SpecialRecipe = ({ setSpecialRecipe }: Props) => {
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
        <FormattedMessage id="recipieFinalStep" />
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Special Diet? (keto, paleo, etc...)
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          defaultValue={SpecialRecepieObj.none}
          label="Special Diet"
          onChange={(e) => setSpecialRecipe(e.target.value)}
        >
          {Object.keys(SpecialRecepieObj).map((key) => (
            //@ts-ignore
            <MenuItem value={key}>{SpecialRecepieObj[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SpecialRecipe;
