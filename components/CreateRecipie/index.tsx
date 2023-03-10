import { BodyGetOpenAiResult } from "@/pages/api/open-ai/food";
import {
  Alert,
  Dialog,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/User";
import LoginCta from "./loginCta";
import {
  TypeOfFoodButtonsEs,
  TypeOfFoodButtonsEn,
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
import { AlertColor } from "@mui/material/Alert";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const { data: userData, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    initialData: { data: [] },
  });

  const session = useSession();

  const {
    foodType: foodTypeQuery,
    targetProtein: targetProteinQuery,
    targetCarbs: targetCarbsQuery,
    primaryIngredient: primaryIngredientQuery,
    targetFats: targetFatsQuery,
    personCount: personCountQuery,
    countMacros: countMacrosQuery,
  } = router.query;

  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    if (
      foodTypeQuery &&
      targetProteinQuery &&
      targetCarbsQuery &&
      primaryIngredientQuery &&
      targetFatsQuery &&
      countMacrosQuery
    ) {
      setCountMacros(countMacrosQuery === "true" ? true : false);
      setTargetProtein(targetProteinQuery as string);
      setTargetCarbs(targetCarbsQuery as string);
      setTargetFats(targetFatsQuery as string);
      setPrimaryIngredient(primaryIngredientQuery as string);
      setPersonCount(personCountQuery as string);
      setFoodType(foodTypeQuery as string);
    }
  }, [router.query]);

  const intl = useIntl();
  const shortLocale = intl.locale;
  const foodTypeButtons = getButtonsLanguage(shortLocale);

  const myRef = useRef(null);

  const [foodType, setFoodType] = useState<string>(foodTypeButtons[0].value);
  const [countMacros, setCountMacros] = useState(false);
  const [targetProtein, setTargetProtein] = useState<string>("30");
  const [targetCarbs, setTargetCarbs] = useState<string>("300");
  const [targetFats, setTargetFats] = useState<string>("5");
  const [primaryIngredient, setPrimaryIngredient] = useState<string>("");
  const [personCount, setPersonCount] = useState<string>("1");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(
    "error" as AlertColor
  );

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const showError = (message: string) => {
    setSnackbarSeverity("error" as AlertColor);
    setSnackbarMessage(message);
    setOpenSnackBar(true);
  };

  const validateInputs = (body: BodyGetOpenAiResult): boolean => {
    if (body.primaryIngredient.length === 0) {
      showError("Select 1 ingredient");
      return false;
    }
    return true;
  };

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

    if (!validateInputs(body)) return;

    setResult("");
    setImage("");
    if (userData?.data[0].availableTokens === 0) {
      alert("Favro de comprar");
      return;
    }
    if (userData?.data.length) {
      await updateUser({
        availableTokens: (userData.data[0].availableTokens || 10) - 1,
      });
      refetch();
      // TODO: Refactor this
      //@ts-ignore
      myRef.current.scrollIntoView();
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
      // fetchImage(prompt);
    }
    // fetchImage();
    setLoading(false);
  };

  if (session.status === "loading") return <LoadingScreen />;

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          borderRadius: 4,
          p: 2,
          mx: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
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
          <LoginCta
            callbackUrl={`/?foodType=${foodType}&countMacros=${countMacros}&targetProtein=${targetProtein}&targetCarbs=${targetCarbs}&primaryIngredient=${primaryIngredient}&targetFats=${targetFats}&personCount=${personCount}`}
          />
        </Dialog>
        <Box>
          <FoodType
            foodType={foodType}
            setFoodType={setFoodType}
            foodTypeButtons={foodTypeButtons}
          />

          <FormGroup sx={{ my: 7 }}>
            <FormControlLabel
              sx={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
              control={
                <Switch
                  checked={countMacros}
                  onChange={(e) => setCountMacros(e.target.checked)}
                  defaultChecked
                />
              }
              label={
                <Typography variant="h5" sx={{ mt: 4, fontWeight: 700 }}>
                  <FormattedMessage id="trackMacros" />
                </Typography>
              }
            />
          </FormGroup>
          {countMacros && (
            <CountMacros
              targetFats={targetFats}
              targetProteins={targetProtein}
              targetCarbs={targetCarbs}
              setTargetFats={setTargetFats}
              setTargetProtein={setTargetProtein}
              setTargetCarbs={setTargetCarbs}
            />
          )}

          <RecipieDetails
            setPrimaryIngredient={setPrimaryIngredient}
            primaryIngredient={primaryIngredient}
            setPersonCount={setPersonCount}
            personCount={personCount}
          />
          <LoadingButton
            sx={{ mt: 5 }}
            onClick={() =>
              fetchData({
                foodType,
                targetProtein,
                targetCarbs,
                primaryIngredient,
                targetFats,
                selectedLanguage: getLanguage(shortLocale),
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
          <Typography
            ref={myRef}
            sx={{
              whiteSpace: "pre-line",
              textAlign: "left",
              mt: 2,
              maxWidth: "600px",
            }}
          >
            {result}
          </Typography>

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
