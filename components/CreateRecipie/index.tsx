import { BodyGetOpenAiResult } from "@/pages/api/open-ai";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const TypeOfFoodButtons = [
  { label: "🌮  Mexican", value: "Mexican" },
  { label: "🍣  Sushi", value: "Sushi" },
  { label: "🇬🇷  Greek", value: "Greek" },
  { label: "🇪🇸  Spanish", value: "Spanish" },
  { label: "🇩🇪  German", value: "German" },
];

const CreateRecipie = () => {
  const [foodType, setFoodType] = useState("");
  const [targetProtein, setTargetProtein] = useState("30");
  const [targetCarbs, setTargetCarbs] = useState("400");
  const [primaryIngredient, setPrimaryIngredient] = useState("");
  const [alergies, setAlergies] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  console.log("loading", loading);

  const fetchData = async (body: BodyGetOpenAiResult) => {
    setLoading(true);
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const fetchResponse = await fetch("/api/open-ai", settings);
    const data = await fetchResponse.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          my: 4,
          maxWidth: "900px",
        }}
      >
        <Typography variant="h4" component="h1">
          Recipies AI
        </Typography>
        <Typography variant="h5" component="h2">
          Create you own recipies powered by AI
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "500px",
            p: 5,
          }}
        >
          <Typography variant="h6" component="h3">
            Food Type:
          </Typography>
          <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            container
          >
            {TypeOfFoodButtons.map((button) => {
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
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            p: 5,
          }}
        >
          <Typography variant="h6" component="h3">
            Target Marcos:
          </Typography>
          <TextField
            id="protein-textfield"
            label="Protein grs"
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
            label="Carbs grs"
            variant="outlined"
            value={targetCarbs}
            onChange={(e) => setTargetCarbs(e.target.value)}
            fullWidth
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            p: 5,
          }}
        >
          <Typography variant="h6" component="h3">
            Recipie Details:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Principal Ingredients"
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
            label="Are you allergic to something?"
            variant="outlined"
            value={alergies}
            onChange={(e) => setAlergies(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <LoadingButton
          onClick={() =>
            fetchData({
              foodType,
              targetProtein,
              targetCarbs,
              primaryIngredient,
              alergies,
            })
          }
          disabled={loading}
          loading={loading}
          size="large"
          fullWidth
          variant="contained"
        >
          Generate Recipie
        </LoadingButton>
        <TextField
          sx={{ width: "100%", mt: 3 }}
          id="standard-multiline-static"
          label="Recipie"
          value={result}
          multiline
          rows={10}
          defaultValue="Default Value"
          variant="outlined"
        />
      </Card>
    </Box>
  );
};

export default CreateRecipie;
