import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const setupLemon = () => lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! });
