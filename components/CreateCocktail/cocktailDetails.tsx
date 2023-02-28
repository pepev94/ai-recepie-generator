import { Typography, Grid, Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { MuiChipsInput } from "mui-chips-input";

type Props = {
  cocktailType: string;
  setCocktailType: any;
  cocktailStyle: string;
  setCocktailStyle: any;
  cocktailMainIngredients: string[];
  setCocktailMainIngredients: any;
  cocktailSecondaryIngredients: string[];
  setCocktailSecondaryIngredients: any;
  cocktailTypeButtons: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
  cocktailStyleButtons: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
};

const CocktailDetails = ({
  cocktailType,
  setCocktailType,
  cocktailTypeButtons,
  cocktailStyleButtons,
  cocktailStyle,
  setCocktailStyle,
  cocktailMainIngredients,
  setCocktailMainIngredients,
  cocktailSecondaryIngredients,
  setCocktailSecondaryIngredients,
}: Props) => {
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
        {cocktailTypeButtons.map((button) => {
          return (
            <Grid key={button.value} item>
              <Box onClick={() => setCocktailType(button.value)}>
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
                        cocktailType === button.value
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
                    color:
                      cocktailType === button.value ? "primary.main" : "none",
                  }}
                >
                  {button.label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Typography sx={{ fontWeight: 700, mt: 4 }} variant="h5" component="h3">
        <FormattedMessage id="cocktailStyleHeader" />
      </Typography>
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        container
      >
        {cocktailStyleButtons.map((button) => {
          return (
            <Grid key={button.value} item>
              <Box onClick={() => setCocktailStyle(button.value)}>
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
                        cocktailStyle === button.value
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
                    color:
                      cocktailStyle === button.value ? "primary.main" : "none",
                  }}
                >
                  {button.label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" component="h3">
        <FormattedMessage id="cocktailMainIngredientsHeader" />
      </Typography>
      <MuiChipsInput
        value={cocktailMainIngredients}
        onChange={(e) => setCocktailMainIngredients(e)}
      />

      <Typography variant="h5" component="h3">
        <FormattedMessage id="cocktailSecondaryIngredientsHeader" />
      </Typography>
      <MuiChipsInput
        value={cocktailSecondaryIngredients}
        onChange={(e) => setCocktailSecondaryIngredients(e)}
      />
    </Box>
  );
};

export default CocktailDetails;
