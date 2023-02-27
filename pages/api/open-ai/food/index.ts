// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OpenAIStream } from "@/utils/OpenAIStream";
import type { NextApiRequest } from "next";

export enum LanguagesEnum {
  es = "es",
  en = "en",
}

export type BodyGetOpenAiResult = {
  foodType: string;
  targetProtein: string;
  targetCarbs: string;
  primaryIngredient: string[];
  alergies: string;
  selectedLanguage: LanguagesEnum;
  countMacros: boolean;
  personCount: string;
};

export const config = {
  runtime: "edge",
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MyCustomRequest = Override<
  NextApiRequest,
  { body: BodyGetOpenAiResult }
>;

const getPromt = (body: BodyGetOpenAiResult) => {
  const {
    foodType,
    targetProtein,
    targetCarbs,
    primaryIngredient,
    alergies,
    selectedLanguage,
    countMacros,
    personCount,
  } = body;
  switch (selectedLanguage) {
    case LanguagesEnum.es:
      return `Responde en español los siguiente: Quiero un receta de cocina. Agrega los gramos o cantidades exactas de cada ingrediente. Dame el titulo, la lista de ingredientes, el paso a paso para preparar. Se especifico en los detalles de la preparación, agrega la información nutrional al final de lo siguiente: Una comida casera tipo ${foodType} ,f´cil de hacer, que tarde menos de 30 min en hacer.${
        countMacros
          ? `Que tenga menos de ${targetCarbs} carbohidratos por porción, y  ${targetProtein} gramos de proteina  por porción`
          : ""
      }. ${
        alergies !== "" ? `Soy alergico a ${alergies}` : ""
      } Quiero que los ingredientes principales sean ${primaryIngredient.join(
        ", "
      )}. Debe de ser para ${personCount} personas.`;
    case LanguagesEnum.en:
      return `Give me the title, list of ingredients and step by step process to prepare it, add the exact quantities of ingredients. Be specific on the details of the process, add the nutritional information at the en of the the following: A ${foodType} homemade cuisine, easy to do, takes less than 30 minutes to prepare. ${
        countMacros
          ? `It must have less ${targetCarbs} calories per serve, with a target protein of ${targetProtein} gms per serve`
          : ""
      }. ${
        alergies !== "" ? `I am allergic to ${alergies}` : ""
      } And I want the main ingredient to be ${primaryIngredient.join(
        ", "
      )}. It must be for ${personCount} persons`;
  }
};
//

const handler = async (req: Request): Promise<Response> => {
  const body = (await req.json()) as BodyGetOpenAiResult;

  const prompt = getPromt(body);

  console.log(body, prompt);

  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: body.selectedLanguage === LanguagesEnum.es ? 0.85 : 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 800,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(
    payload,
    "https://api.openai.com/v1/completions"
  );
  return new Response(stream);
};

export default handler;
