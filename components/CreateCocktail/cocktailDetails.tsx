import { Typography, Grid, Box, Button, TextField } from "@mui/material";
import { FormattedMessage } from "react-intl";

type Props = {
  cocktailType: string;
  setCocktailType: any;
  cocktailStyle: string;
  setCocktailStyle: any;
  cocktailMainIngredients: string;
  setCocktailMainIngredients: any;
  cocktailSecondaryIngredients: string;
  setCocktailSecondaryIngredients: any;
  cocktailTypeButtons: { label: string; value: string }[];
};

const CocktailDetails = ({
  cocktailType,
  setCocktailType,
  cocktailTypeButtons,
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
      <Typography variant="h6" component="h3">
        <FormattedMessage id="cocktailType" />: {cocktailType}
      </Typography>
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
              {cocktailType === button.value ? (
                <Button
                  variant="contained"
                  onClick={() => setCocktailType(button.value)}
                >
                  {button.label}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setCocktailType(button.value)}
                >
                  {button.label}
                </Button>
              )}{" "}
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" component="h3">
        <FormattedMessage id="cocktailStyleHeader" />
      </Typography>
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="cocktailStyleHeader" />}
        onChange={(e) => setCocktailStyle(e.target.value)}
        placeholder="Fresh"
        value={cocktailStyle}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Typography variant="h5" component="h3">
        <FormattedMessage id="cocktailMainIngredientsHeader" />
      </Typography>
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="cocktailMainIngredientsHeader" />}
        onChange={(e) => setCocktailMainIngredients(e.target.value)}
        placeholder="Tequila"
        value={cocktailMainIngredients}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Typography variant="h5" component="h3">
        <FormattedMessage id="cocktailSecondaryIngredientsHeader" />
      </Typography>
      <TextField
        id="outlined-basic"
        label={<FormattedMessage id="cocktailSecondaryIngredients" />}
        placeholder="Mango"
        onChange={(e) => setCocktailSecondaryIngredients(e.target.value)}
        value={cocktailSecondaryIngredients}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default CocktailDetails;
