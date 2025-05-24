import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../constants/Env.js";

if (!STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;
