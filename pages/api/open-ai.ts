// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export type BodyGetOpenAiResult = {
  foodType: string;
  targetProtein: string;
  targetCarbs: string;
  primaryIngredient: string;
  alergies: string;
};

type Data = {
  result: string;
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MyCustomRequest = Override<
  NextApiRequest,
  { body: BodyGetOpenAiResult }
>;

export default async function handler(
  req: MyCustomRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    const {
      foodType,
      targetProtein,
      targetCarbs,
      primaryIngredient,
      alergies,
    } = req.body;
    const prompt = `Give me the title, list of ingredients and step by step process to prepare it, Be specific on the details of the process, add the nutritional information at the en of the the following: A ${foodType} homemade cuisine, easy to do, takes less than 30 minutes to prepare, and and less than ${targetCarbs} calories per serve, with a target protein of ${targetProtein} gms. ${
      alergies !== "" ? `I am allergic to ${alergies}` : ""
    } And I want the main ingredient to be ${primaryIngredient}`;
    console.log(prompt);
    const response = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();
    console.log(data);
    res.status(200).json({ result: data as any });
  } catch (err) {
    res.status(500).json({ error: (err as any).message });
  }
}
