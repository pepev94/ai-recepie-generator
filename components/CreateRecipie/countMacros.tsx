import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";

type Props = {
  setTargetProtein: any;
  setTargetCarbs: any;
  setTargetFats: any;
};

const CountMacros = ({
  setTargetFats,
  setTargetProtein,
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
          <FormattedMessage id="targetMacrosFats" />
        </Typography>
        <Slider
          onChange={(e) => setTargetFats(e)}
          defaultValue={10}
          valueLabelDisplay="on"
          step={1}
          marks
          min={5}
          max={50}
        />
      </>
    </Box>
  );
};

export default CountMacros;
