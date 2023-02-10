// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LanguagesEnum } from "@/components/CreateRecipie";
import { OpenAIStream } from "@/utils/OpenAIStream";
import type { NextApiRequest, NextApiResponse } from "next";

export type BodyGetOpenAiResult = {
  foodType: string;
  targetProtein: string;
  targetCarbs: string;
  primaryIngredient: string;
  alergies: string;
  selectedLanguage: LanguagesEnum;
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
  } = body;
  switch (selectedLanguage) {
    case LanguagesEnum.en:
      return `Quiero un receta de cocina. Dame el titulo, la lista de ingredientes, el paso a paso para preparar. Se especifico en los detalles de la preparación, agrega la información nutrional al final de lo siguiente: Una comida casera tipo ${foodType} ,f´cil de hacer, que tarde menos de 30 min en hacer. Que tenga menos de ${targetCarbs} carbohidratos , y  ${targetProtein} gramos de proteina. ${
        alergies !== "" ? `Soy alergico a ${alergies}` : ""
      } Quiero que los ingredientes principales sean ${primaryIngredient}`;
    case LanguagesEnum.es:
      return `Give me the title, list of ingredients and step by step process to prepare it, Be specific on the details of the process, add the nutritional information at the en of the the following: A ${foodType} homemade cuisine, easy to do, takes less than 30 minutes to prepare, and and less than ${targetCarbs} calories per serve, with a target protein of ${targetProtein} gms. ${
        alergies !== "" ? `I am allergic to ${alergies}` : ""
      } And I want the main ingredient to be ${primaryIngredient}`;
  }
};
//

const handler = async (req: Request): Promise<Response> => {
  const body = (await req.json()) as BodyGetOpenAiResult;

  const prompt = getPromt(body);

  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
