// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LanguagesEnum } from "@/utils/createRecepie";
import { OpenAIStream } from "@/utils/OpenAIStream";
import type { NextApiRequest } from "next";

export type BodyGetOpenAiCocktailResult = {
  cocktailType: string;
  cocktailStyle: string;
  cocktailMainIngredients: string;
  cocktailSecondaryIngredients: string;
  selectedLanguage: LanguagesEnum;
};

export const config = {
  runtime: "edge",
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MyCustomRequest = Override<
  NextApiRequest,
  { body: BodyGetOpenAiCocktailResult }
>;

const getPromt = (body: BodyGetOpenAiCocktailResult) => {
  const {
    cocktailType,
    cocktailStyle,
    cocktailMainIngredients,
    cocktailSecondaryIngredients,
    selectedLanguage,
  } = body;
  switch (selectedLanguage) {
    case LanguagesEnum.es:
      return `Responde en español los siguiente: Quiero un receta de cocteleria. Agrega los gramos o cantidades exactas de cada ingrediente. Dame el titulo, la lista de ingredientes, el paso a paso para preparar. Se especifico en los detalles de la preparación, agrega la información nutrional al final de lo siguiente: Un coctel de tipo ${cocktailType} , que tenga un aroma y sabor ${cocktailStyle}, facil de hacer, que tarde menos de 10 min en hacer. Quiero que los licores principales sean ${cocktailMainIngredients}, y que también tenga ${cocktailSecondaryIngredients}`;
    case LanguagesEnum.en:
      return `I want a cocktail recipe Give me the title, list of ingredients and step by step process to prepare it, add the exact quantities of ingredients. Be specific on the details of the process, add the nutritional information at the en of the the following: A  ${cocktailType} cocktail, that has easy to do, that has ${cocktailStyle} scent, takes less than 10 minutes to prepare. And I want the main ingredient to be ${cocktailMainIngredients}, and also using ${cocktailSecondaryIngredients}`;
  }
};
//

const handler = async (req: Request): Promise<Response> => {
  const body = (await req.json()) as BodyGetOpenAiCocktailResult;

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
