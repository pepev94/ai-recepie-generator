import { BodyGetOpenAiResult } from "@/pages/api/open-ai";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/User";
import getStripe from "@/utils/get-stripe";
import CreateRecipieHeader from "./header";
import LoginCta from "./loginCta";
import {
  TypeOfFoodButtonsEs,
  TypeOfFoodButtonsEn,
  LanguagesEnum,
} from "@/utils/createRecepie";
import LoadingScreen from "./loadingScreen";
import { updateUser } from "@/lib/api/user";
import { getDalle2Image } from "@/lib/api/open-ai/dalle-2";
import FoodType from "./foodType";
import CountMacros from "./countMacros";
import ExtraActions from "./extraActions";
import RecipieDetails from "./recipieDetails";

export const redirectToStripe = async () => {
  const response = await fetch("/api/stripe/checkout_sessions");
  if (response.status !== 200) {
    console.error(response.status);
    return;
  }
  const data = await response.json();

  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: data.data.id,
  });
};

const fetchUser = (): Promise<{ data: User[] }> =>
  fetch("api/user").then((res) => res.json());

const CreateRecipie = () => {
  const { data: userData, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    initialData: { data: [] },
  });

  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

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

  const fetchData = async (body: BodyGetOpenAiResult) => {
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
        {isAuthenticated && <CreateRecipieHeader />}
        {!isAuthenticated && <LoginCta />}
        <Box
          sx={isAuthenticated ? {} : { opacity: 0.4, pointerEvents: "none" }}
        >
          <FoodType
            foodType={foodType}
            setFoodType={setFoodType}
            foodTypeButtons={foodTypeButtons}
          />

          <CountMacros
            countMacros={countMacros}
            setCountMacros={setCountMacros}
            targetProtein={targetProtein}
            setTargetProtein={setTargetProtein}
            targetCarbs={targetCarbs}
            setTargetCarbs={setTargetCarbs}
          />
          <RecipieDetails
            setPrimaryIngredient={setPrimaryIngredient}
            primaryIngredient={primaryIngredient}
            alergies={alergies}
            setAlergies={setAlergies}
            personCount={personCount}
            setPersonCount={setPersonCount}
          />
          <LoadingButton
            sx={{ mt: 5 }}
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

          <ExtraActions result={result} setResult={setResult} />

          <TextField
            sx={{ width: "100%", mt: 2 }}
            id="standard-multiline-static"
            label="Recipie"
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
          <Button
            color="secondary"
            sx={{ my: 2 }}
            variant="contained"
            fullWidth
            onClick={() => redirectToStripe()}
          >
            <FormattedMessage id="buyTokensCTA" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRecipie;
