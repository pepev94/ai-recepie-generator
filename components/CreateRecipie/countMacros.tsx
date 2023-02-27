import {
  FormControlLabel,
  FormGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
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
      <Typography variant="h5" sx={{ mt: 4, fontWeight: 700 }}>
        <FormattedMessage id="targetMacros" />
      </Typography>

      <>
        <Typography>
          <FormattedMessage id="targetMacrosProtein" />
        </Typography>
        <Slider
          onChange={(e) => setTargetProtein(e)}
          defaultValue={30}
          valueLabelDisplay="on"
          step={10}
          marks
          min={10}
          max={110}
        />

        <Typography>
          <FormattedMessage id="targetMacrosCarbs" />
        </Typography>
        <Slider
          onChange={(e) => setTargetCarbs(e)}
          defaultValue={300}
          valueLabelDisplay="on"
          step={100}
          marks
          min={100}
          max={1500}
        />

        <Typography>
          <FormattedMessage id="targetMacrosCarbs" />
        </Typography>
        <Slider
          onChange={(e) => setTargetCarbs(e)}
          defaultValue={30}
          valueLabelDisplay="on"
          step={10}
          marks
          min={10}
          max={110}
        />

        <Typography>
          <FormattedMessage id="targetMacrosCarbs" />
        </Typography>
        <Slider
          onChange={(e) => setTargetCarbs(e)}
          defaultValue={30}
          valueLabelDisplay="on"
          step={10}
          marks
          min={10}
          max={110}
        />
      </>
    </Box>
  );
};

export default CountMacros;
