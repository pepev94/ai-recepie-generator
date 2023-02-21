import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/User";
import LoginCta from "./loginCta";
import { LanguagesEnum } from "@/utils/createRecepie";
import LoadingScreen from "./loadingScreen";
import { updateUser } from "@/lib/api/user";
import { getDalle2Image } from "@/lib/api/open-ai/dalle-2";
import ExtraActions from "./extraActions";
import BuyTokensCta from "../shared/BuyTokensCta";
import PageHeader from "../shared/header";
import CocktailDetails from "./cocktailDetails";
import {
  StyleOfCocktailButtonsEn,
  StyleOfCocktailButtonsEs,
  TypeOfCocktailButtonsEn,
  TypeOfCocktailButtonsEs,
} from "@/utils/createCocktail";
import { BodyGetOpenAiCocktailResult } from "@/pages/api/open-ai/cocktail";

const getButtonsLanguage = (shortLocale: string) => {
  switch (shortLocale) {
    case "es":
      return TypeOfCocktailButtonsEs;
    case "en":
      return TypeOfCocktailButtonsEn;
    default:
      return TypeOfCocktailButtonsEs;
  }
};

const getButtonsStyleLanguage = (shortLocale: string) => {
  switch (shortLocale) {
    case "es":
      return StyleOfCocktailButtonsEs;
    case "en":
      return StyleOfCocktailButtonsEn;
    default:
      return StyleOfCocktailButtonsEs;
  }
};

export const getLanguage = (shortLocale: string) => {
  switch (shortLocale) {
    case "es":
      return LanguagesEnum.es;
    case "en":
      return LanguagesEnum.en;
    default:
      return LanguagesEnum.es;
  }
};
const fetchUser = (): Promise<{ data: User[] }> =>
  fetch("api/user").then((res) => res.json());

const CreateCocktail = () => {
  const { data: userData, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    initialData: { data: [] },
  });

  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  const intl = useIntl();

  const shortLocale = intl.locale;
  const cocktailTypeButtons = getButtonsLanguage(shortLocale);
  const cocktailStyleButtons = getButtonsStyleLanguage(shortLocale);

  const [cocktailType, setCocktailType] = useState(
    TypeOfCocktailButtonsEn[0]?.value
  );
  const [cocktailStyle, setCocktailStyle] = useState(
    StyleOfCocktailButtonsEn[0]?.value
  );
  const [cocktailMainIngredients, setCocktailMainIngredients] = useState("");
  const [cocktailSecondaryIngredients, setCocktailSecondaryIngredients] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const fetchImage = async (prompt: string) => {
    setImage("");
    if (userData?.data[0].availableTokens === 0) {
      alert("Favor de comprar");
      return;
    }
    if (userData?.data.length) {
      const response = await getDalle2Image(prompt);
      setImage(response);
    }
    setLoading(false);
  };

  const fetchData = async (body: BodyGetOpenAiCocktailResult) => {
    setResult("");
    setImage("");
    if (userData?.data[0].availableTokens === 0) {
      alert("Favro de comprar");
      return;
    }
    if (userData?.data.length) {
      await updateUser({
        availableTokens: (userData.data[0].availableTokens || 10) - 2,
      });
      refetch();
      // TODO: Refactor this
      const response = await fetch("/api/open-ai/cocktail", {
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

      let prompt = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
        prompt = prompt + chunkValue;
      }
      fetchImage(prompt);
    }
    // fetchImage();
    setLoading(false);
  };

  if (session.status === "loading") return <LoadingScreen />;

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          borderRadius: 4,
          p: 2,
          mx: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          my: 4,
          maxWidth: "900px",
        }}
      >
        {isAuthenticated && (
          <PageHeader
            title={
              <FormattedMessage
                id="cocktailTitle"
                defaultMessage="Recipies AI"
              />
            }
            subTitle={
              <FormattedMessage
                id="cocktailSubtitle"
                defaultMessage="Recipies AI"
              />
            }
          />
        )}
        {!isAuthenticated && <LoginCta />}
        <Box
          sx={isAuthenticated ? {} : { opacity: 0.4, pointerEvents: "none" }}
        >
          <CocktailDetails
            cocktailType={cocktailType}
            setCocktailType={setCocktailType}
            cocktailStyle={cocktailStyle}
            setCocktailStyle={setCocktailStyle}
            cocktailMainIngredients={cocktailMainIngredients}
            setCocktailMainIngredients={setCocktailMainIngredients}
            cocktailSecondaryIngredients={cocktailSecondaryIngredients}
            setCocktailSecondaryIngredients={setCocktailSecondaryIngredients}
            cocktailTypeButtons={cocktailTypeButtons}
            cocktailStyleButtons={cocktailStyleButtons}
          />

          <LoadingButton
            sx={{ mt: 5 }}
            onClick={() =>
              fetchData({
                cocktailType,
                cocktailStyle,
                cocktailMainIngredients,
                cocktailSecondaryIngredients,
                selectedLanguage: getLanguage(shortLocale),
              })
            }
            disabled={loading}
            loading={loading}
            size="large"
            fullWidth
            variant="contained"
          >
            <FormattedMessage id="generateCocktail" />
          </LoadingButton>

          <ExtraActions result={result} setResult={setResult} />

          <TextField
            sx={{ width: "100%", mt: 2 }}
            id="standard-multiline-static"
            label="Cocktail"
            value={result}
            multiline
            rows={10}
            defaultValue="Default Value"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {image !== "" && (
            <Box
              component="img"
              sx={{
                mt: 2,
                height: 300,
              }}
              alt="The house from the offer."
              src={image}
            />
          )}
          {userData?.data?.length && (
            <Typography sx={{ mt: 2 }}>
              {<FormattedMessage id="availableTokens" />}{" "}
              {userData.data[0].availableTokens}
            </Typography>
          )}
          <BuyTokensCta />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCocktail;
