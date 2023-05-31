import type { NextApiRequest, NextApiResponse } from "next";

const getBimboSKU = () => {
  const randomNum = `${Math.floor(Math.random() * 15) + 1}`;
  if (randomNum.length === 2) return `BI00${randomNum}`;
  return `BI000${randomNum}`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const numOfItems = Math.floor(Math.random() * 5) + 4;
  const arrayOfItems = [];
  for (let i = 0; i < numOfItems; i++) {
    arrayOfItems.push(getBimboSKU());
  }

  res.status(200).json({ nboSKUs: [...new Set(arrayOfItems)] });
}
