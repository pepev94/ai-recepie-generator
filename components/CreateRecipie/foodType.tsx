import { Typography, Grid, Box, Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  foodType: string;
  setFoodType: any;
  foodTypeButtons: { label: string; value: string }[];
};

const FoodType = ({ foodType, setFoodType, foodTypeButtons }: Props) => {
  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "600px",
        px: 1,
      }}
    >
      <Typography variant="h6" component="h3">
        <FormattedMessage id="foodType" />: {foodType}
      </Typography>
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        container
      >
        {foodTypeButtons.map((button) => {
          return (
            <Grid key={button.value} item>
              {foodType === button.value ? (
                <Button
                  variant="contained"
                  onClick={() => setFoodType(button.value)}
                >
                  {button.label}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setFoodType(button.value)}
                >
                  {button.label}
                </Button>
              )}{" "}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FoodType;
