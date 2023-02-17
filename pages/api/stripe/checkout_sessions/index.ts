import mongooseConnect from "@/lib/mongooseConnect";
import User from "@/models/User";
import getStripe from "@/utils/get-stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "../../auth/[...nextauth]";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const session = await getServerSession(req, res, authOptions);

  if (session) {
    switch (method) {
      case "GET":
        try {
          const params: Stripe.Checkout.SessionCreateParams = {
            // submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
              {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
              },
            ],
            success_url: `${process.env.HOST_URL}/result?email=${session.user.email}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.HOST_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
          };
          const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(params);
          res.status(200).json({ data: checkoutSession });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false });
  }
}
