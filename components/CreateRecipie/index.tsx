import { BodyGetOpenAiResult } from "@/pages/api/open-ai/food";
import { Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/User";
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
import ExtraActions from "./extraActions";
import BuyTokensCta from "../shared/BuyTokensCta";
import PageHeader from "../shared/header";
import { getLanguage } from "../CreateCocktail";
import CountMacros from "./countMacros";
import RecipieDetails from "./recipieDetails";

const getButtonsLanguage = (shortLocale: string) => {
  switch (shortLocale) {
    case "es":
      return TypeOfFoodButtonsEs;
    case "en":
      return TypeOfFoodButtonsEn;
    default:
      return TypeOfFoodButtonsEs;
  }
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

  const intl = useIntl();
  const shortLocale = intl.locale;
  const foodTypeButtons = getButtonsLanguage(shortLocale);

  const [foodType, setFoodType] = useState(foodTypeButtons[0].value);
  const [targetProtein, setTargetProtein] = useState("30");
  const [countMacros, setCountMacros] = useState(false);
  const [targetCarbs, setTargetCarbs] = useState("400");
  const [primaryIngredient, setPrimaryIngredient] = useState([]);
  const [personCount, setPersonCount] = useState("1");
  const [alergies, setAlergies] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const [openAuthModal, setOpenAuthModal] = useState(false);

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
    if (!isAuthenticated) {
      setOpenAuthModal(true);
      return;
    }
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
      const response = await fetch("/api/open-ai/food", {
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
        <PageHeader
          title={<FormattedMessage id="title" defaultMessage="Recipies AI" />}
          subTitle={<FormattedMessage id="subtitle" defaultMessage=" AI" />}
        />

        <Dialog
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
          aria-labelledby="modal-sign-in"
          aria-describedby="modal-sign-in"
        >
          <LoginCta />
        </Dialog>
        <Box>
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
                selectedLanguage: getLanguage(shortLocale),
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
          {isAuthenticated && (
            <>
              {userData?.data?.length && (
                <Typography sx={{ mt: 2 }}>
                  {<FormattedMessage id="availableTokens" />}{" "}
                  {userData.data[0].availableTokens}
                </Typography>
              )}
              <BuyTokensCta />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRecipie;
