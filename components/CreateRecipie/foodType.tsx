import { Typography, Grid, Box, Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  foodType: string;
  setFoodType: any;
  foodTypeButtons: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
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
              <Box onClick={() => setFoodType(button.value)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: button.color,
                      borderRadius: 4,
                      width: "100px",
                      height: "100px",
                      border:
                        foodType === button.value
                          ? "5px solid #EB1245"
                          : "none",
                      p: 2,
                      fontSize: 40,
                    }}
                  >
                    {button.icon}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    mt: 1,
                    color: foodType === button.value ? "primary.main" : "none",
                  }}
                >
                  {button.label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FoodType;
