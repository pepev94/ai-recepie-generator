import mongooseConnect from "@/lib/mongooseConnect";
import Recepie from "@/models/Recepie";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();

  switch (method) {
    case "GET":
      try {
        const { slug } = req.query;
        const recepies = await Recepie.find({ slug });
        const recepie = recepies[0];
        await Recepie.findByIdAndUpdate(recepie.id, {
          $set: { views: (recepie?.views || 0) + 1 },
        }).exec();
        res.status(200).json({ data: recepies });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
