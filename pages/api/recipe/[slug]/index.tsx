import mongooseConnect from "@/lib/mongooseConnect";
import Recepie from "@/models/Recepie";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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
        res.status(200).json({ data: recepies });
        const recepie = recepies[0];
        Recepie.findByIdAndUpdate(recepie.id, {
          $set: { views: (recepie?.views || 0) + 1 },
        }).exec();
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
