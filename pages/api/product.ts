import type { NextApiRequest, NextApiResponse } from "next";

const getSKU = (prefix: string) => {
  const randomNum = `${Math.floor(Math.random() * 15) + 1}`;
  if (randomNum.length === 2) return `${prefix}00${randomNum}`;
  return `${prefix}000${randomNum}`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prefix, maxNum } = req.query;

  // Ensure maxNum is an integer and is greater than or equal to 3
  const parsedMaxNum = Number(maxNum);
  const validMaxNum =
    !isNaN(parsedMaxNum) && parsedMaxNum >= 3 ? parsedMaxNum : 4;

  // Generate a random number between 3 (inclusive) and validMaxNum (inclusive)
  let numOfItems = Math.floor(Math.random() * (validMaxNum - 3 + 1)) + 3;
  if (numOfItems < 3) numOfItems = 3;
  const arrayOfItems = [];
  for (let i = 0; i < numOfItems; i++) {
    arrayOfItems.push(getSKU(prefix ? String(prefix) : "PRO"));
  }

  res.status(200).json({ nboSKUs: [...new Set(arrayOfItems)] });
}
