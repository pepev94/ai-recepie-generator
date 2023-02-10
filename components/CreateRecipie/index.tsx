import { BodyGetOpenAiResult } from "@/pages/api/open-ai";
import {
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

const TypeOfFoodButtonsEn = [
  { label: "🌮  Mexican", value: "Mexican" },
  { label: "🥗  Vegan", value: "Vegan" },
  { label: "🍝  Italian", value: "Italian" },
  { label: "🍣  Sushi", value: "Sushi" },
  { label: "🇬🇷  Greek", value: "Greek" },
  { label: "🇪🇸  Spanish", value: "Spanish" },
  { label: "🇩🇪  German", value: "German" },
  { label: "🏮 Chinese", value: "Chinese" },
  { label: "🥟 Korean", value: "Korean" },
];

const TypeOfFoodButtonsEs = [
  { label: "🌮  Mexicana", value: "Mexicana" },
  { label: "🥗  Vegan", value: "Vegana" },
  { label: "🍝  Italian", value: "Italiana" },
  { label: "🍣  Sushi", value: "Sushi" },
  { label: "🇬🇷  Griega", value: "Griega" },
  { label: "🇪🇸  Española", value: "Española" },
  { label: "🇩🇪  Alemana", value: "Alemana" },
  { label: "🏮 China", value: "China" },
  { label: "🥟  Coreana", value: "Coreana" },
];

export enum LanguagesEnum {
  es = "es",
  en = "en",
}

const CreateRecipie = () => {
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];
  const [foodTypeButtons, selectedLanguage] = useMemo(() => {
    switch (shortLocale) {
      case "es":
        return [TypeOfFoodButtonsEs, LanguagesEnum.es];
      case "en":
        return [TypeOfFoodButtonsEn, LanguagesEnum.en];
      default:
        return [TypeOfFoodButtonsEn, LanguagesEnum.en];
    }
  }, [shortLocale]);

  const [foodType, setFoodType] = useState(foodTypeButtons[0].value);
  const [targetProtein, setTargetProtein] = useState("30");
  const [countMacros, setCountMacros] = useState(false);
  const [targetCarbs, setTargetCarbs] = useState("400");
  const [primaryIngredient, setPrimaryIngredient] = useState("");
  const [personCount, setPersonCount] = useState("1");
  const [alergies, setAlergies] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const fetchData = async (body: BodyGetOpenAiResult) => {
    const response = await fetch("/api/open-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }

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
          <FormattedMessage id="title" defaultMessage="Recipies AI" />
        </Typography>
        <Typography variant="h5" component="h2">
          <FormattedMessage
            id="subtitle"
            defaultMessage="Create you own recipies powered by AI"
          />
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
            <FormattedMessage id="foodType" />
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
            <FormattedMessage id="recipieDetails" />
          </Typography>
          <TextField
            id="outlined-basic"
            label={<FormattedMessage id="recipieDetailsIngredients" />}
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
            label={<FormattedMessage id="recipieDetailsAlergies" />}
            variant="outlined"
            value={alergies}
            onChange={(e) => setAlergies(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            label={<FormattedMessage id="personCount" />}
            type="number"
            variant="outlined"
            value={personCount}
            onChange={(e) => setPersonCount(e.target.value)}
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
              selectedLanguage,
              countMacros,
              personCount,
            })
          }
          disabled={loading}
          loading={loading}
          size="large"
          fullWidth
          variant="contained"
        >
          <FormattedMessage id="generateReciepie" />
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
        <Button onClick={() => setResult("")}>
          <FormattedMessage id="erase" />
        </Button>
      </Card>
    </Box>
  );
};

export default CreateRecipie;
