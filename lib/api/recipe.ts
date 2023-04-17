import { createRecepieDto } from "@/pages/api/recipe/dto/createRecepie.dto";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Set your base URL in .env file

export const createRecepie = (dto: createRecepieDto) => {
  return fetch("/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...dto,
    }),
  });
};

export const getAllSlugs = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/recipe/extra/all-slugs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const json = await response.json();
    //@ts-ignore
    return json?.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getRecepieBySlug = async (slug: string) => {
  const recepies = await fetch(`${baseUrl}/api/recipe/${slug}`).then((res) =>
    res.json()
  );
  return recepies.data[0];
};
