import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";

type Props = {
  countMacros: boolean;
  setCountMacros: any;
  targetProtein: string;
  setTargetProtein: any;
  targetCarbs: string;
  setTargetCarbs: any;
};

const CountMacros = ({
  countMacros,
  setCountMacros,
  targetProtein,
  setTargetProtein,
  targetCarbs,
  setTargetCarbs,
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
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={countMacros}
              onChange={(e) => setCountMacros(e.target.checked)}
            />
          }
          label={<FormattedMessage id="targetMacros" />}
        />
      </FormGroup>
      {countMacros && (
        <>
          <TextField
            id="protein-textfield"
            label={<FormattedMessage id="targetMacrosProtein" />}
            variant="outlined"
            fullWidth
            type="number"
            value={targetProtein}
            onChange={(e) => setTargetProtein(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="carbs-textfield"
            label={<FormattedMessage id="targetMacrosCarbs" />}
            variant="outlined"
            value={targetCarbs}
            onChange={(e) => setTargetCarbs(e.target.value)}
            fullWidth
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default CountMacros;
